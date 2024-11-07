import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para redirigir después de restablecer la contraseña
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-olvide-password',
  standalone: true,
  imports: [FormsModule, CommonModule, OlvidePasswordComponent],
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.scss']
})
export class OlvidePasswordComponent {
  olvideData = {
    NombreUsuario: ''
  };
  nuevaContrasena = '';
  confirmarContrasena = '';
  registroError: string | null = null;
  mostrarCampos: boolean = false;

  constructor(private authService: AuthService, private router: Router) {} // Agrega Router al constructor si necesitas redirigir

  onSubmit() {
    this.authService.verificarUsuario(this.olvideData.NombreUsuario).subscribe(
      response => {
        // Si el usuario existe, mostramos los campos para la nueva contraseña
        this.mostrarCampos = true;
        this.registroError = null; // Limpiar cualquier mensaje de error
      },
      error => {
        // Manejo de errores si el usuario no existe
        this.registroError = error.error.message || 'Usuario no encontrado';
        this.mostrarCampos = false;
      }
    );
  }

  restablecerContrasena() {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.registroError = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.restablecerContrasena(this.olvideData.NombreUsuario, this.nuevaContrasena).subscribe(
      response => {
        // Aquí puedes mostrar un mensaje de éxito o redirigir al usuario
        alert('Contraseña restablecida exitosamente');
        this.olvidarCampos(); // Limpia los campos
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
      },
      error => {
        // Manejo de errores en el restablecimiento
        this.registroError = error.error.message || 'Error al restablecer la contraseña';
      }
    );
  }

  olvidarCampos() {
    this.olvideData.NombreUsuario = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.mostrarCampos = false;
  }
}
