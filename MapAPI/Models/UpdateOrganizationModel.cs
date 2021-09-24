using MapAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapAPI.Models
{
    public class UpdateOrganizationModel : OrganizationModel
    {
        public string NewOrganizationName { get; set; }
    }
}
