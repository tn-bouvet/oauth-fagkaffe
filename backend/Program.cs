using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((c) =>
{
    var tenantId = "30efef2c-0c18-422d-b256-ccbbc4dce7a6";
    var clientId = "91e24aa6-8506-4e2c-a4b6-d5d936041383";
    var baseUri = new Uri($"https://login.microsoftonline.com/{tenantId}/");
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri(baseUri, "oauth2/v2.0/authorize"),
                TokenUrl = new Uri(baseUri, "oauth2/v2.0/token"),
                Scopes = new Dictionary<string, string>
                            {
                                { $"api://{clientId}/access", "All access" }
                            }
            }
        }
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2"}
                        },
                        new[] { "access" }
                    }
                });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.OAuthClientId("91e24aa6-8506-4e2c-a4b6-d5d936041383");
        c.OAuthUsePkce();
    });
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors((c) => {
    c.AllowAnyOrigin();
    c.AllowAnyMethod();
    c.AllowAnyHeader();
});

app.MapControllers();


app.Run();
