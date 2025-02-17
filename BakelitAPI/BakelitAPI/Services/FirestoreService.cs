using Google.Cloud.Firestore;
using System;
using System.Threading.Tasks;

public class FirestoreService
{
    private FirestoreDb _db;

    public FirestoreService()
    {
        _db = FirestoreDb.Create("vizsgaremek-26549");
        Console.WriteLine("Connected to Firestore.");
    }

    public async Task AddDataAsync(string collection, string document, object data)
    {
        DocumentReference docRef = _db.Collection(collection).Document(document);
        await docRef.SetAsync(data);
        Console.WriteLine("Document written successfully.");
    }
}
