using Microsoft.EntityFrameworkCore;
using BakelitAPI.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiContext>
    (opt => opt.UseInMemoryDatabase("BakelitDb"));

builder.Services.AddControllers();
builder.Services.AddSingleton<FirestoreService>();
builder.Services.AddSingleton<FirebaseAuthService>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("vizsgaremek-26549-firebase-adminsdk-fbsvc-d1d9f091fd.json")
});

Console.WriteLine("Firebase Initialized Successfully!");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();