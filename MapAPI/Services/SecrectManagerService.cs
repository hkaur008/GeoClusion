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

            SecretManagerServiceClientBuilder bclient = new SecretManagerServiceClientBuilder
            {
                CredentialsPath = "smartgarden-iot-94fb06ac28c8.json"
            };
            SecretManagerServiceClient client = bclient.Build();
            SecretVersionName secretVersionName = new SecretVersionName(projectId, secretId, secretVersionId);
            
            AccessSecretVersionResponse result = client.AccessSecretVersion(secretVersionName);

            String payload = result.Payload.Data.ToStringUtf8();
            return payload;
        }
    }
}
