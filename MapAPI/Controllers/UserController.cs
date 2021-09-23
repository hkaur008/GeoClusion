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
    public class UserController : ControllerBase
    {
        private readonly ILogger<SQLDataAcessService> _sqlLogger;
        public UserController(ILogger<SQLDataAcessService> sqlLogger)
        {
            _sqlLogger = sqlLogger;
        }
        
        [HttpGet]
        public string Get()
        {
          string json = FetchAllUsers();
            return json;
        }

        

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return  FetchUserByID(id);
        }

       
        [HttpPost]
        public void Post([FromBody] string value)
        {
            //TODO
        }

        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            //TODO
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //TODO
        }

        private string FetchAllUsers()
        {
            var acessService = new SQLDataAcessService(_sqlLogger);
            string sql = @"SELECT * FROM map_db.users LIMIT 0, 1000";
            List<UserModel> modelData = acessService.LoadData<UserModel>(sql);
            string json = JsonSerializerService.Serialize<UserModel>(modelData);

            return json;
        }

        private string FetchUserByID(int id) 
        {
            string sql = String.Format(@"SELECT * from map_db.users
                         WHERE map_db.users.ID = {0}", id);

            var acessService = new SQLDataAcessService(_sqlLogger);
            List<UserModel> modelData = acessService.LoadData<UserModel>(sql);
            string json = JsonSerializerService.Serialize<UserModel>(modelData);

            return json;
        }
    }
}
