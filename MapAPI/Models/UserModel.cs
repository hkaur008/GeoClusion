using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapAPI.Models
{
    public class UserModel
    { 
        public  string Email { get; set; }
        public int  ID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Username { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
#nullable enable // basically allows these properties to be null without an exception.
        public string? City { get; set; }
        public string? FavoriteFood { get; set; }
        public string? Languages { get; set; }
        public string? Interests { get; set; }

        public byte? ProfilePicture { get; set; }
        public string OrganizationName { get; set; }
        public string Team { get; set; }
        public string TechStack{ get; set; }
        public string Code { get; set; }

    }
}
