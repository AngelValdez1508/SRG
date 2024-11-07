namespace SGR_API.Data
   
{
    using Microsoft.EntityFrameworkCore;
    using SGR_API.Models;

    public class SGRContext : DbContext
    {

        public SGRContext(DbContextOptions<SGRContext> options) :base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
