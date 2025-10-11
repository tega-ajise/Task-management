import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, CreateTaskDto } from '@task-app/data';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { parseErrorRes } from '../parseErrorRes';
import { HttpErrorResponse } from '@angular/common/http';
import { formatYMD } from '../utils/utils';

@Component({
  imports: [FormsModule, DatePipe, CommonModule],
  selector: 'app-task',
  templateUrl: './create-task.component.html',
  styles: [],
})
export class CreateTask implements OnInit {
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  editingId: string | number | null = null;

  task: CreateTaskDto | Task = {
    title: '',
    todo: '',
    dueDate: undefined,
  };
  tasks: CreateTaskDto[] = [];

  loading = false;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading = true;
    this.editingId = id;
    try {
      const existing: Task = await this.api.getTask(id);

      this.task = {
        title: existing.title ?? '',
        todo: existing.todo ?? '',
        dueDate: existing.dueDate
          ? (formatYMD(existing.dueDate) as unknown as Date)
          : undefined,
      };
    } catch (err) {
      console.error('Failed to load task for edit:', err);
      alert('Failed to load task.\n' + parseErrorRes(err as HttpErrorResponse));
    } finally {
      this.loading = false;
    }
  }

  async addTask(): Promise<void> {
    if (!this.task.title.trim()) {
      alert('Title is required.');
      return;
    }
    this.loading = true;

    this.api
      .addTask(this.task)
      .then((newTask) => {
        console.log('Task added:', newTask);
        this.tasks.push({ ...this.task });
        console.log(this.tasks);
      })
      .catch((err) => {
        console.error('Error adding task:', err);
        alert('Failed to create task.\n' + parseErrorRes(err));
        this.loading = false;
      })
      .finally(() => {
        this.loading = false;
        this.task = { title: '', todo: '', dueDate: undefined };
        this.router.navigate(['/tasks']);
      });
  }

  async updateTask(): Promise<void> {
    if (!this.editingId) return; // not in edit mode
    if (!this.task.title.trim()) {
      alert('Title is required.');
      return;
    }
    this.loading = true;

    this.api
      .updateTask(this.editingId, this.task)
      .then((updated) => {
        console.log('Task updated:', updated);
      })
      .catch((err) => {
        console.error('Error updating task:', err);
        alert('Failed to update task.\n' + parseErrorRes(err));
      })
      .finally(() => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      });
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
