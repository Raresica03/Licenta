using Microsoft.AspNetCore.Identity;

namespace IdentityAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }
    }

    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
