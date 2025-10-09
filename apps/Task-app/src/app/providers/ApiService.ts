import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  async addData(data: any): Promise<void> {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NGMwOTBhMi1lYTY3LTQ2MDYtODdhMy03YTYyYzRlOWExMmYiLCJ1c2VybmFtZSI6ImVtYWlsc0BlLmFzIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTk5Nzk3MzksImV4cCI6MTc2MDA2NjEzOX0.m2L9hDcfjXKtNMgbaCv1a7mGvcqn3ln2MbxyhBuILmk';

    await this.http
      .post('http://localhost:3000/tasks', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        },
      });
  }
}
