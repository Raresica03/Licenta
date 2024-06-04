using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IdentityAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "User", NormalizedName = "USER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
