import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize with user from localStorage if exists
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  register(name: string, email: string, password: string, userType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, userType }).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  loginWithGoogle() {
    // Implement Google OAuth
    window.location.href = `${this.apiUrl}/google`;
  }

  loginWithFacebook() {
    // Implement Facebook OAuth
    window.location.href = `${this.apiUrl}/facebook`;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isAuthenticated() {
    return !!this.currentUserValue;
  }
}