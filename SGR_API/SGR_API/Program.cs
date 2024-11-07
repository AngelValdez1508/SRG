using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SGR_API.Data;

var builder = WebApplication.CreateBuilder(args);

//definir la politica de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()
        );

});



// Add services to the container.
builder.Services.AddControllersWithViews();

// Agregar la conexion a la base de datos
builder.Services.AddDbContext<SGRContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("SGRConnection"))
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//aplica COrs
app.UseCors("AllowAngularApp");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

