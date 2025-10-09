import { Component, inject, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskDto } from '@task-app/data';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-task',
  templateUrl: './create-task.component.html',
  styles: [],
})
export class Task {
  http = inject(HttpClient);

  task: CreateTaskDto = {
    title: '',
    todo: '',
    dueDate: null,
  };

  tasks: CreateTaskDto[] = [];

  async addTask(): Promise<void> {
    if (!this.task.title.trim()) {
      alert('Title is required.');
      return;
    }

    const testAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NGMwOTBhMi1lYTY3LTQ2MDYtODdhMy03YTYyYzRlOWExMmYiLCJ1c2VybmFtZSI6ImVtYWlsc0BlLmFzIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTk5Nzk3MzksImV4cCI6MTc2MDA2NjEzOX0.m2L9hDcfjXKtNMgbaCv1a7mGvcqn3ln2MbxyhBuILmk';

    this.http
      .post('http://localhost:3000/tasks', this.task, {
        headers: { Authorization: `Bearer ${testAccessToken}` },
      })
      .subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        },
      });

    // Add task and reset form
    this.tasks.push({ ...this.task });
    console.log(this.tasks);
    this.task = { title: '', todo: '', dueDate: null };
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
