import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskDto } from '@task-app/data';
import { Router } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { parseErrorRes } from '../parseErrorRes';

@Component({
  imports: [FormsModule, DatePipe, CommonModule],
  selector: 'app-task',
  templateUrl: './create-task.component.html',
  styles: [],
})
export class Task {
  api = inject(ApiService);
  router = inject(Router);

  task: CreateTaskDto = {
    title: '',
    todo: '',
    dueDate: undefined,
  };
  tasks: CreateTaskDto[] = [];

  loading = false;

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

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
