import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Task } from '@task-app/data';
import { ApiService } from '../providers/ApiService';
import { parseErrorRes } from '../parseErrorRes';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-dashboard',
  templateUrl: './view-task.component.html',
})
export class TaskViewComponent implements OnInit {
  api = inject(ApiService);

  tasks: Task[] = [];
  loading = true;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.error = null;
    this.api
      .getTasks()
      .then((tasks) => {
        this.tasks = tasks;
      })
      .catch((err) => {
        console.error('Error loading tasks:', err);
        this.error = 'Failed to load tasks.\n' + parseErrorRes(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  async onDelete(t: Task, event: MouseEvent) {
    if (!t?.id) return;
    const ok = confirm(`Delete "${t.title}"?`);
    if (!ok) return;
    event.stopPropagation();
    event.preventDefault();

    this.api
      .deleteTask(t.id)
      .then((result) => {
        this.tasks = this.tasks.filter((x) => x.id !== t.id);
        alert('Task deleted');
        console.log('Task deleted', result);
      })
      .catch((err) => {
        console.error('Failed to delete task:', err);
        alert('Failed to delete task.\n' + parseErrorRes(err));
      });
  }
}
