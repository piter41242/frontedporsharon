import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUsuario(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación desde el localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Incluir el token en los encabezados de la solicitud
    });

    return this.http.get<any>(`${this.apiUrl}/user`, { headers });
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  logout(): void {
  localStorage.removeItem('token');
  sessionStorage.clear(); // Limpia cualquier dato de sesión
  this.http.post(`${this.apiUrl}/logout`, {}).subscribe(); // Notifica al backend si es necesario
}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // si no hay token, devuelve false
  }
}
