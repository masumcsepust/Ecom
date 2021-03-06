using API.Extensions;
using API.Helpers;
using API.MiddleWare;
using AutoMapper;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // SQLite Configuration 
            services.AddDbContext<ApplicationDbContext>(x => 
            x.UseSqlite(_config.GetConnectionString("DefaultConnection")));

            // AppIdentityDbContext Configuration
            services.AddDbContext<AppIdentityDbContext>( x => {
                x.UseSqlite(_config.GetConnectionString("IdentityConnection"));
            });

            //Redis Configuration
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse( _config.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddAutoMapper(typeof(MappingProfile));
            services.AddApplicationServices();
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumentation();
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleWare>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            app.UseStaticFiles();
            app.UseSwaggerDocumentation();
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
