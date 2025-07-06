import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserSettings {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string | null;
  bio: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string | null;
  status: string;
  userType: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = 'https://localhost:7137/api/User'; // Your actual API

  constructor(readonly http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    console.log(userId)
    return this.http.put(`${this.apiUrl}/${userId}`, userData,
     {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/${userId}`);
  }

  updateUserStatus(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`,user ,
     {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  getUserSettings(): Observable<UserSettings> {
    const userId = localStorage.getItem('userId');
    return this.http.get<UserSettings>(`${this.apiUrl}/${userId}`);
  }


}
