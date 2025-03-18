using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebshopApi.Data;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<WebshopApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebshopApiContext") ?? throw new InvalidOperationException("Connection string 'WebshopApiContext' not found.")));

var connectionString = builder.Configuration.GetConnectionString("WebshopApiContext");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
