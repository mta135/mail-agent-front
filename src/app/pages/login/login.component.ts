import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  onSubmit(): void {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Completează email și parolă.');
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    this.authService.login({ email: this.email(), password: this.password() }).subscribe({
      next: () => {
        this.router.navigate(['/inbox']);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Email sau parolă incorectă.');
      }
    });
  }
}
