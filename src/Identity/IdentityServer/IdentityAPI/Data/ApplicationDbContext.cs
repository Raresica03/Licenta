using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IdentityAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<University> Universities { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Professor", NormalizedName = "PROFESSOR" },
                new IdentityRole { Name = "Student", NormalizedName = "STUDENT" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
