import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { parseErrorRes } from '../parseErrorRes';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = {
    displayName: '',
    email: '',
    password: '',
    organization: '',
    role: undefined,
  };
  loading = false;

  router = inject(Router);
  api = inject(ApiService);

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    // call register service here
    this.api
      .register(this.user)
      .then((res) => {
        console.log('Registered:', res);
        this.router.navigate(['/tasks']);
      })
      .catch((err) => {
        console.error('Registration error:', err);
        alert('Failed to register\n' + parseErrorRes(err));
        this.loading = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
