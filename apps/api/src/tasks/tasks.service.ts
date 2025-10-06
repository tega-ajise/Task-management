import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTaskDto,
  JwtVerificationResponse,
  Task,
  User,
} from '@task-app/data';
import { UpdateTaskDto } from '@task-app/data';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  // create, find, findOne, update, remove
  // then save if want to persist to db
  async create(
    createTaskDto: CreateTaskDto,
    reqObj: { user: JwtVerificationResponse }
  ) {
    const { userId } = reqObj.user;
    console.log('reqObj', reqObj);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const task = this.tasksRepository.create({ ...createTaskDto, owner: user });
    return await this.tasksRepository.save(task);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    reqObj: { user: JwtVerificationResponse }
  ) {
    const { userId } = reqObj.user;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return this.tasksRepository.update(id, { ...updateTaskDto, owner: user });
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
