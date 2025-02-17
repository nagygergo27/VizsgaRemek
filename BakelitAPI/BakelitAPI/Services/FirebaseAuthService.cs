using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using System;
using System.Threading.Tasks;

public class FirebaseAuthService
{
    public FirebaseAuthService()
    {
        if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("vizsgaremek-26549-firebase-adminsdk-fbsvc-d1d9f091fd.json")
            });
        }
    }

    public async Task<string> VerifyIdTokenAsync(string idToken)
    {
        try
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            return decodedToken.Uid;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Token verification failed: {ex.Message}");
            return null;
        }
    }
}
