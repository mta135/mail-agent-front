import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('/api/auth/login', request).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.userId);
                this.isAuthenticated.set(true);
            })
        );
    }

    logout(): void {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
    }
}