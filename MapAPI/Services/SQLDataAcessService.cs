using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Logging;

namespace MapAPI.Services
{
    public class SQLDataAcessService
    {
        private readonly ILogger<SQLDataAcessService> _logger;
        public SQLDataAcessService(ILogger<SQLDataAcessService> logger)
        {
            _logger = logger;
        }
        public string GetConnectionString(string connectionName = "")
        {

            string dbstring = SecrectManagerService.GetSecret(secretId: "dbConnectionStr", secretVersionId: "3");
            return dbstring;

        }

        // Get data from database and put it into a given model  " T "
        public List<T> LoadData<T>(string sql)
        {
            var data = new List<T>();
            try
            {
                using (IDbConnection dbconnection = new MySqlConnection(GetConnectionString()))
                {
                    data = dbconnection.Query<T>(sql).ToList();

                }
            }
            catch (MySqlException ex)
            {
                _logger.LogError($"{ex.Message} \n Error Code: {ex.Code} \n  \n {ex.TargetSite}");

            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message} \n \n {ex.InnerException} \n  \n {ex.TargetSite}");
            }


            return data;
        }

        public bool SaveData<T>(string sql, T data)
         {
            using (IDbConnection dbconnection = new MySqlConnection(GetConnectionString()))
            {
                try
                {
                    dbconnection.Execute(sql, data);
                    
                }
                catch (Exception ex) 
                {
                    _logger.LogError($"{ex.Message} \n \n {ex.InnerException} \n  \n {ex.TargetSite}");
                    return false;
                }

            }
            return true;
        }

        public bool Query(string sql) 
        {
            bool isSucessful = false;
            try
            {
                using (IDbConnection dbconnection = new MySqlConnection(GetConnectionString()))
                {
                    
                   int rowsAffected =  dbconnection.Execute(sql);
                    if (rowsAffected != 0) 
                    {
                        isSucessful = true;
                    }
                }
            }
            catch (MySqlException ex)
            {
                _logger.LogError($"{ex.Message} \n Error Code: {ex.Code} \n  \n {ex.TargetSite}");

            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message} \n \n {ex.InnerException} \n  \n {ex.TargetSite}");
            }
            return isSucessful;
        }

    }

}
