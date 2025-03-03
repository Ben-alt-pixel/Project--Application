import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'https://proj-mgt.vercel.app/api/user';

  constructor(private http: HttpClient) {}

  private getUserId(): string {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    return userObj.id || '';
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.getUserId()}`);
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${this.getUserId()}/projects/${id}`
    );
  }

  createProject(project: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${this.getUserId()}/project`,
      project
    );
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${this.getUserId()}/projects/${id}`,
      project
    );
  }
}
