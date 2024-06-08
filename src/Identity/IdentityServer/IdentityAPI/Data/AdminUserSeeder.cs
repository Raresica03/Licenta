using IdentityAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class AdminUserSeeder
{
    public static async Task Seed(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        var email = "admin@test.com";
        var password = "Zarzavat12@";
        var role = "Admin";

        if (await userManager.FindByEmailAsync(email) == null)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = "Admin", // Default value for FirstName
                LastName = "User",   // Default value for LastName
                DateOfBirth = DateTime.Now // Default value for DateOfBirth or use null if nullable
            };

            var result = await userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }

                await userManager.AddToRoleAsync(user, role);
            }
        }
    }
}
