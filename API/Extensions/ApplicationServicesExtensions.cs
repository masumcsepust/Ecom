using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            // Token Services 
            services.AddScoped<ITokenService, TokenService>();

            // Order Services
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();


            // Product Services
            services.AddScoped<IProductRepository, ProductRepository>();

            // Basket Services
            services.AddScoped<IBasketRepository, BasketRepository>();

            // Unit of Work services
            
            services.AddScoped(typeof(IGenericRepository<>),(typeof(GenericRepository<>)));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                         .Where( e => e.Value.Errors.Count > 0)
                         .SelectMany( x => x.Value.Errors)
                         .Select( x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
            });
            return services;
        }
    }
}