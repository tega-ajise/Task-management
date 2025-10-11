import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTaskDto,
  JwtVerificationResponse,
  Organizations,
  Task,
  User,
} from '@task-app/data';
import { UpdateTaskDto } from '@task-app/data';
import { Repository, Not } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  // create, find, findOne, update, remove
  // then save if want to persist to db
  async create(createTaskDto: CreateTaskDto, userObj: JwtVerificationResponse) {
    const { userId } = userObj;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    // for now till db lookup is done in the jwt strategy
    const task = this.tasksRepository.create({ ...createTaskDto, owner: user });
    return await this.tasksRepository.save(task);
  }

  async findAll(user: { organization: Organizations }) {
    if (user.organization === Organizations.PARENT) {
      return this.tasksRepository.find();
    }
    return this.tasksRepository.find({
      where: { owner: { organization: Not(Organizations.PARENT) } },
      // relations: { owner: true }, // because owner is loaded eagerly, we don't need this
    });
  }

  async findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
    });
  }

  async reqFindOne(id: number, user: JwtVerificationResponse) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (user.role === 'ADMIN' || user.userId === task.owner.id) return task;
    throw new ForbiddenException('You are not authorized to edit this task');
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: JwtVerificationResponse
  ) {
    const owner = (await this.tasksRepository.findOne({ where: { id } })).owner;
    const isOwner = owner.id === user.userId;
    if (user.role !== 'ADMIN' && !isOwner) {
      throw new ForbiddenException(
        'You are not authorized to update this task'
      );
    }
    return this.tasksRepository.update(id, { ...updateTaskDto, owner });
  }

  async remove(id: number, user: JwtVerificationResponse) {
    const owner = await this.tasksRepository
      .findOne({ where: { id } })
      .then((t) => t.owner);
    const isOwner = owner.id === user.userId;
    if (user.role !== 'ADMIN' && !isOwner) {
      throw new ForbiddenException(
        'You are not authorized to delete this task'
      );
    }
    return this.tasksRepository.delete(id);
  }
}
