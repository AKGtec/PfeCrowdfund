import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contribution } from '../models/contribution.model';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  readonly apiUrl = 'https://localhost:7137/api/contribution';

  constructor(readonly http: HttpClient) { }

  getAllContributions(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(this.apiUrl);
  }

  createContributions(formData: any): Observable<any> {
    console.log(formData)
  return this.http.post<any>(this.apiUrl, formData);
  // Let the browser set the correct headers
}

  getContributionById(id: number): Observable<Contribution> {
    return this.http.get<Contribution>(`${this.apiUrl}/${id}`);
  }

  updateContributionStatus(id: number, status: Contribution): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, status );
  }

  deleteContribution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}