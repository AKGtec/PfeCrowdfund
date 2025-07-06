import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly apiUrl = 'https://localhost:7137/api/Project';

  constructor(readonly http: HttpClient) { }
 // Create a new project

createProject(formData: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl, formData);
  // Let the browser set the correct headers
}

  // Get all projects
getProjects(): Observable<Project[]> {
  // Don't set headers here!
  return this.http.get<Project[]>(this.apiUrl);
}

getProjectsByUserId(userId: number): Observable<Project[]> {
  return new Observable(observer => {
    this.getProjects().subscribe({
      next: (projects) => {
        const userProjects = projects.filter(project => project.userId === userId);
        observer.next(userProjects);
        observer.complete();
      },
      error: (error) => {
        observer.error(error);
      }
    });
  });
}

  // Get a single project by ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
  // Update a project
  updateProject(id: number, projectData: Partial<Project>): Observable<Project> {
    console.log(projectData)
  return this.http.put<Project>(`${this.apiUrl}/${id}`, projectData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
  // Delete a project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}