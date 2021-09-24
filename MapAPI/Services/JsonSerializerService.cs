using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace MapAPI.Services
{
    public static class JsonSerializerService
    {
        public static string Serialize<T>( List<T> data) 
        {
            string json = JsonSerializer.Serialize<IEnumerable<T>>(data, 
                new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            });

            

            return json;
        }


        public static T DeSerialize<T>(string json) 
        {

          T data =  JsonSerializer.Deserialize<T>(json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

            return data;
        }
    }
}
