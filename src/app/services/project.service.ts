import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5170/api/Project'; // Update with your actual API endpoint

  constructor(private http: HttpClient) { }
 // Create a new project

createProject(formData: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl, formData);
  // Let the browser set the correct headers
}

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Get a single project by ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
  // Update a project
  updateProject(id: number, projectData: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, projectData);
  }

  // Delete a project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  supportProject(supportData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/${supportData.projectId}/support`, supportData);
}
}