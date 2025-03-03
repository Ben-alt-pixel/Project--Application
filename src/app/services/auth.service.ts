import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://proj-mgt.vercel.app/api/auth/login';
  private signupUrl = 'https://proj-mgt.vercel.app/api/auth/register';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.signupUrl, data);
  }
}
