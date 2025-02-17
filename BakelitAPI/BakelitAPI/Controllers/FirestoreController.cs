using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/firestore")]
public class FirestoreController : ControllerBase
{
    private readonly FirestoreService _firestoreService;

    public FirestoreController(FirestoreService firestoreService)
    {
        _firestoreService = firestoreService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddData([FromBody] object data)
    {
        await _firestoreService.AddDataAsync("myCollection", "myDocument", data);
        return Ok("Document added to Firestore.");
    }
}
