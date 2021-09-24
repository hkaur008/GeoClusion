using MapAPI.Models;
using MapAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<SQLDataAcessService> _sqlLogger;
        private readonly ILogger<UsersController> _logger;
        SQLDataAcessService _acessService;
        public UsersController(ILogger<UsersController> logger, SQLDataAcessService dataAcessService)
        {
           
            _logger = logger;
            _acessService = dataAcessService;
        }

        [HttpGet]
        public string Get(string invCode)
        {
          string json = FetchAllUsers(invCode);
            return json;
        }

        [HttpGet("{id}")]
       
        public string Get(int id)
        {
            return  FetchUserByID(id);
        }


        [HttpPost]
        public IActionResult Post([FromBody] UserModel model)
        {
            try
            {
                CreateUser(model);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest("Unable to create user");
            }
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            try
            {
                UpdateInterests(value, id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest("Unable to update information");
            }
            return Ok();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string sql = String.Format(@"DELETE * FROM map_db.users 
                                        WHERE `ID` = {0};", id);
            bool isSucessful = _acessService.Query(sql);
            if (isSucessful == false) { 
                return BadRequest("Failed to delete user"); }
            return Ok();

        }

        private void CreateUser(UserModel model) 
        {
            string sql = String.Format(@"INSERT INTO `map_db`.`users`
                                        (`Email`,
                                        `LastName`,
                                        `FirstName`,
                                        `Username`,
                                        `Country`,
                                        `Region`,
                                        `City`,
                                        `FavoriteFood`,
                                        `Languages`,
                                        `Interests`,
                                        `ProfilePicture`,
                                        `OrganizationName`,
                                        `Team`,
                                        `TechStack`,
                                        `Code`)
                                        VALUES 
                                         ( '{0}',
                                           '{1}',
                                           '{2}',
                                           '{3}',
                                           '{4}',
                                           '{5}',
                                           '{6}',
                                           '{7}',
                                           '{8}',
                                           '{9}',
                                           '{10}',
                                           '{11}',
                                           '{12}',
                                           '{13}',
                                           '{14}');
" ,model.Email, model.LastName, model.FirstName, model.Username, model.Country,
                                            model.Region, model.City, model.FavoriteFood, model.Languages, model.Interests, 
                                            model.ProfilePicture, model.OrganizationName, model.Team ,model.TechStack, model.Code);
           
           bool isSucessful = _acessService.SaveData(sql, model);
            if (isSucessful == false) { throw new Exception("Failed to save data"); }
        }

        

        /// <summary>
        /// Fetches all users associated with a organization
        /// </summary>
        /// <returns></returns>
        private string FetchAllUsers(string invCode)
        {
            string organization = GetOrganizationByCode(invCode);
            if ( organization == null)
            {
                throw new Exception("Organization Not Found");
            }
            

            string sql = String.Format(@"SELECT * FROM map_db.users
                            WHERE map_db.users.OrganizationName = '{0}';", organization);

            List<UserModel> modelData = _acessService.LoadData<UserModel>(sql);
            string json = JsonSerializerService.Serialize<UserModel>(modelData);

            return json;
        }

        private string GetOrganizationByCode(string inviteCode) 
        {
            OrganizationModel modelData = null;
            string sql = String.Format(@"
                                        SELECT map_db.organizations.Name FROM map_db.organizations
                                         WHERE map_db.organizations.InviteCode = '{0}';", inviteCode);
            try
            {
               modelData = _acessService.LoadData<OrganizationModel>(sql)[0];
            }
            catch (Exception ex) 
            
              {
                _logger.LogError($"{ex.Message} \n   \n {ex.TargetSite}");
            }

            return modelData?.Name;
        }

        private string FetchUserByID(int id) 
        {
            string sql = String.Format(@"SELECT * from map_db.users
                         WHERE map_db.users.ID = {0}", id);
            List<UserModel> modelData = _acessService.LoadData<UserModel>(sql);
            string json = JsonSerializerService.Serialize<UserModel>(modelData);

            return json;
        }

        private bool UpdateInterests(string interests, int userId)
        {
            string sql = String.Format(@"UPDATE `map_db`.`users`
                                        SET
                                        `Interests` = '{0}'
                                        WHERE `ID` = {1};",interests, userId);
            bool isSucessful = _acessService.Query(sql);
            if (isSucessful == false) { throw new Exception("Failed to save data"); }
            return isSucessful;
        }
    }
}
