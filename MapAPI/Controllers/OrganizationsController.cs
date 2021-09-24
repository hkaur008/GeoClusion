using MapAPI.Models;
using MapAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationsController : ControllerBase
    {
        ILogger<OrganizationsController> _logger;
        SQLDataAcessService _dataAcessService;
        public OrganizationsController(ILogger<OrganizationsController> logger, SQLDataAcessService dataAcessService)
        {
            _logger = logger;
            _dataAcessService = dataAcessService;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{invCode}")]
        public string Get(string invCode)
        {
            string organization = GetOrganizationByCode(invCode);
            if (organization == null)
            {
                throw new Exception("Organization Not Found");
            }


            string sql = String.Format(@"SELECT * FROM map_db.users
                            WHERE map_db.users.OrganizationName = '{0}';", organization);

            List<UserModel> modelData = _dataAcessService.LoadData<UserModel>(sql);
            string json = JsonSerializerService.Serialize<UserModel>(modelData);

            return json;
        }

        [HttpPost]
        public IActionResult Post([FromBody]  OrganizationModel value)
        {
            bool isSuccess = CreateOrganization(value);
            if (isSuccess == false)
            {
                return BadRequest("Failed to create a new organization");
            }
            return Ok("Created new organization");
        }

        // PUT api/<ValuesController>/5
        [HttpPut]
        public IActionResult Put([FromBody] UpdateOrganizationModel value)
        {
            bool isSuccess = UpdateOrganization(value);
            if (isSuccess == false)
            {
                return BadRequest("Failed to create a new organization");
            }
            return Ok("Created new organization");
        }

       
        [HttpDelete("{name}")]
        public IActionResult  Delete(string name)
        {
            string sql = String.Format(@"DELETE * FROM map_db.users 
                                        WHERE `ID` = {0};", name);
            bool isSucessful = _dataAcessService.Query(sql);
            if (isSucessful == false)
            {
                return BadRequest("Failed to delete organization");
            }
            return Ok();
        }

        private string GetOrganizationByCode(string inviteCode)
        {
            OrganizationModel modelData = null;
            string sql = String.Format(@"
                                        SELECT map_db.organizations.Name FROM map_db.organizations
                                         WHERE map_db.organizations.InviteCode = '{0}';", inviteCode);
            try
            {
                modelData = _dataAcessService.LoadData<OrganizationModel>(sql)[0];
            }
            catch (Exception ex)

            {
                _logger.LogError($"{ex.Message} \n   \n {ex.TargetSite}");
            }

            return modelData?.Name;
        }
        private bool CreateOrganization(OrganizationModel organization) 
        {
            string sql = String.Format(@"INSERT INTO  map_db.organizations( `Name`,`InviteCode`)
                                        VALUES( '{0}','{1}');", organization.Name, organization.InviteCode);
            bool isSucessful = _dataAcessService.Query(sql);
           
            return isSucessful;

        }

        private bool UpdateOrganization(UpdateOrganizationModel organization)
        {
            string sql = String.Format(@"UPDATE `map_db`.`organizations`
                                        SET `Name` = '{0}',`InviteCode` = '{1}'
                                        WHERE `InviteCode` =  `{2}`;", organization.NewOrganizationName, organization.InviteCode,
                                        organization.Name );
            bool isSucessful = _dataAcessService.Query(sql);

            return isSucessful;

        }
    }
}
