using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly FirebaseAuthService _authService;

    public AuthController(FirebaseAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("verify-token")]
    public async Task<IActionResult> VerifyToken([FromBody] TokenRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.IdToken))
        {
            return BadRequest(new { error = "Token is required." });
        }

        var uid = await _authService.VerifyIdTokenAsync(request.IdToken);

        if (uid == null)
        {
            return Unauthorized(new { error = "Invalid or expired token." });
        }

        return Ok(new { UserId = uid });
    }
}

public class TokenRequest
{
    public string IdToken { get; set; }
}
