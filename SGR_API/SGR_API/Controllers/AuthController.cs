namespace SGR_API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using SGR_API.Data;
    using SGR_API.Models;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SGRContext _context;

        public AuthController(SGRContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario loginUser)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == loginUser.NombreUsuario && u.Password == loginUser.Password && u.Estado);

            if (usuario == null)
            {
                return Unauthorized(new { message = "Credenciales incorrectas" });
            }

            return Ok(new { message = "Login exitoso" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario newUser)
        {
            newUser.Estado = true;
            newUser.Rol = "User";

            if (newUser == null || string.IsNullOrEmpty(newUser.NombreUsuario) || string.IsNullOrEmpty(newUser.Password) || string.IsNullOrEmpty(newUser.Email))
            {
                return BadRequest(new { message = "El nombre de usuario, contraseña y email son requeridos" });
            }

            var existingUser = await _context.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == newUser.NombreUsuario || u.Email == newUser.Email);
            if (existingUser != null)
            {
                return Conflict(new { message = "El nombre de usuario o el email ya está en uso." });
            }

            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente" });
        }

        // Método para verificar si el usuario existe
        [HttpGet("verificar-usuario/{nombreUsuario}")]
        public IActionResult VerificarUsuario(string nombreUsuario)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == nombreUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            return Ok(new { message = "Usuario encontrado" });
        }

        // Método para restablecer la contraseña
        [HttpPost("restablecer-contrasena")]
        public async Task<IActionResult> RestablecerContrasena([FromBody] RestablecerContrasenaRequest request)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == request.NombreUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            // Aquí puedes cifrar la nueva contraseña antes de almacenarla
            // usuario.Password = BCrypt.Net.BCrypt.HashPassword(request.NuevaContraseña);
            usuario.Password = request.NuevaContraseña; // Asegúrate de cifrar la contraseña
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contraseña restablecida exitosamente" });
        }
    }

    // Clase para la solicitud de restablecimiento de contraseña
    public class RestablecerContrasenaRequest
    {
        public string NombreUsuario { get; set; }
        public string NuevaContraseña { get; set; }
    }
}
