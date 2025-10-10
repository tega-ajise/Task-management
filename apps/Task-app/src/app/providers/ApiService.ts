// api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Task } from '@task-app/data';

type AuthResponse = { access_token: string };
type LoginDto = { email: string; password: string };
type RegisterDto = { displayName: string; email: string; password: string };

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';
  private accessToken: string | null = null;

  // ===== AUTH =====
  async login(dto: LoginDto): Promise<AuthResponse> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, dto)
    );
    this.accessToken = res.access_token;
    return res;
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, dto)
    );
    this.accessToken = res.access_token;
    return res;
  }

  getAuthToken(): string | null {
    return this.accessToken;
  }

  // ===== TASKS (CRUD) =====
  async getTasks(): Promise<Task[]> {
    return await firstValueFrom(this.http.get<Task[]>(`${this.baseUrl}/tasks`));
  }

  async getTask(id: number | string): Promise<Task> {
    return await firstValueFrom(
      this.http.get<Task>(`${this.baseUrl}/tasks/${id}`)
    );
  }

  async addTask(data: Partial<Task>): Promise<Task> {
    return await firstValueFrom(
      this.http.post<Task>(`${this.baseUrl}/tasks`, data)
    );
  }

  async updateTask(id: number | string, data: Partial<Task>): Promise<Task> {
    return await firstValueFrom(
      this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, data)
    );
  }

  async deleteTask(id: number | string): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.baseUrl}/tasks/${id}`));
  }
}
