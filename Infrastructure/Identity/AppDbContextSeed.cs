using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Masum",
                    Email = "masum@gamil.com",
                    UserName = "Masumcse@gmail.com",
                    Address = new Address 
                    {
                        FirstName = "masum",
                        lastName = "Billah",
                        Street = "09",
                        City = "Dahka",
                        State = "DH",
                        ZipCode = "987"
                    }
                };

                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
