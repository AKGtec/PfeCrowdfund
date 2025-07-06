import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  role: string;
  userId: number;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = 'https://localhost:7137/api/auth';
  readonly currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    readonly http: HttpClient,
    readonly router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.getUserFromToken();
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  register(username: string, lastName: string, phoneNumber: string, 
          userType: string, email: string, password: string, 
          confirmPassword: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      username, lastName, phoneNumber, userType, email, password, confirmPassword
    }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userRole', response.role);
    localStorage.setItem('userId', response.userId.toString());
    localStorage.setItem('tokenExpiration', response.expiration);
    this.currentUserSubject.next(response);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const expiration = localStorage.getItem('tokenExpiration');
    if (!expiration) return false;

    return new Date(expiration) > new Date();
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  }

  private getUserFromToken(): any {
    // Basic user object from stored data
    return {
      userId: this.getUserId(),
      role: this.getUserRole()
    };
  }
}