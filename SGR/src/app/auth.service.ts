import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// se define la estructura de los datos del login 
interface LoginData {
  NombreUsuario: string; // Cambié String a string (minúscula)
  Password: string; // Cambié String a string (minúscula)
}

// se define la estructura de los datos de registro 
export interface RegisterData {
  NombreUsuario: string; // Cambié String a string (minúscula)
  Password: string; // Cambié String a string (minúscula)
  Email: string; // Cambié String a string (minúscula)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44383/api/auth'; // URL de la API

  constructor(private http: HttpClient, private router: Router) { }

  // se envían los datos del login a la API y me debería de devolver la respuesta de la API como un observable
  login(data: LoginData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, data, { headers });
  }

  // se envían los datos del formulario de registro a la API y me debería devolver el observable 
  register(data: RegisterData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, data, { headers });
  }

  // Método para verificar si el usuario existe
  verificarUsuario(nombreUsuario: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/verificar-usuario/${nombreUsuario}`, { headers });
  }

  // Método para restablecer la contraseña
  restablecerContrasena(nombreUsuario: string, nuevaContrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/restablecer-contrasena`, {
      NombreUsuario: nombreUsuario,
      NuevaContraseña: nuevaContrasena
    }, { headers });
  }

  logout() {
    // en este método se debería limpiar cualquier dato de autenticación almacenado
    // para limpiar el token del usuario que se genera cuando se hace login exitoso 
    // localStorage.removeItem('userToken');

    // o debería de hacer un guard con authenticated para que sea simple 
    this.router.navigate(['/login']);
  }
}

