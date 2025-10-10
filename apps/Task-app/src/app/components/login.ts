import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { parseErrorRes } from '../parseErrorRes';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = { email: '', password: '' };
  loading = false;

  router = inject(Router);
  api = inject(ApiService);

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;

    this.api
      .login(this.user)
      .then((res) => {
        console.log('Logged in:', res);
        this.router.navigate(['/tasks']);
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert('Failed to Login\n' + parseErrorRes(err));
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
