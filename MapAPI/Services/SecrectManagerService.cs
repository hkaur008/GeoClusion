using Google.Apis.Auth.OAuth2;
using Google.Cloud.SecretManager.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapAPI.Services
{
    public static class SecrectManagerService
    {
        public static string GetSecret(string projectId = "smartgarden-iot", string secretId = "my-secret", string secretVersionId = "1")
        {

            var credential = GoogleCredential.FromFile("smartgarden-iot-4131e7005a39.json");
            SecretManagerServiceClient client = SecretManagerServiceClient.Create();
            SecretVersionName secretVersionName = new SecretVersionName(projectId, secretId, secretVersionId);
            
            AccessSecretVersionResponse result = client.AccessSecretVersion(secretVersionName);

            String payload = result.Payload.Data.ToStringUtf8();
            return payload;
        }
    }
}
