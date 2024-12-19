import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.NEXT_PUBLIC_API_URL;
  constructor(private readonly http: HttpClient) { }

  getUsers(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}/auth/users?page=${page}&limit=${limit}`);
  }

}
