using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.Company;
using LuckyDevFinals.Entities.DTO.User;
using LuckyDevFinals.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LuckyDevFinals.Controllers;


[Authorize]
[ApiController]
[Route("auth/company")]
public class CompanyAuthController : ControllerBase
{
    private readonly AppSettings _appSettings;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public CompanyAuthController(
        IOptions<AppSettings> appSettings,
        IMapper mapper,
        DataContext context)
    {
        _mapper = mapper;
        _context = context;
        _appSettings = appSettings.Value;
    }

    /// <summary>
    /// Login using email and password
    /// </summary>
    /// <returns>User info and jwt token</returns>
    /// <response code="200">Request successful</response>
    /// <response code="400">If the email or password is incorrect </response>
    [AllowAnonymous]
    [ProducesResponseType(typeof(CompanyLoginDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorMessage), StatusCodes.Status400BadRequest)]
    [HttpPost("login")]
    public IActionResult Login([FromBody] CompanyLoginRequestDTO model)
    {
        var company = Authenticate(model.Email, model.Password);

        if (company == null)
            return BadRequest(new ErrorMessage("Email or password is incorrect"));

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, company.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        // return basic user info and authentication token
        return Ok(new CompanyLoginDTO
        {
            Id = company.Id,
            Email = company.Email,
            Token = tokenString
        });
    }

    /// <summary>
    /// User Registration
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="400">The email or password is incorrect </response>
    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register([FromBody] CompanyRegisterRequestDTO requestDTO)
    {
        try
        {
            Console.WriteLine(string.IsNullOrEmpty(requestDTO.Password.Trim()));
            if (string.IsNullOrEmpty(requestDTO.Password.Trim()))
                throw new Exception("Password is required");
            if (string.IsNullOrWhiteSpace(requestDTO.Email))
                throw new Exception("Email is required");
            
            // map model to entity
            var company = _mapper.Map<Company>(requestDTO);
            
            if (_context.Companies.Any(x => x.Email == company.Email))
                throw new Exception("\"" + company.Email + "\" is already taken");

            PasswordUtils.CreatePasswordHash(requestDTO.Password, out var passwordHash, out var passwordSalt);
            company.PasswordHash = passwordHash;
            company.PasswordSalt = passwordSalt;
            // create user
            _context.Companies.Add(company);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new {message = ex.Message});
        }
    }
    
    private Company? Authenticate(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return null;

        var company = _context.Companies.SingleOrDefault(x => x.Email == username);

        // check if username exists
        if (company == null)
            return null;

        // check if password is correct
        if (!PasswordUtils.VerifyPasswordHash(password, company.PasswordHash, company.PasswordSalt))
            return null;

        // authentication successful
        return company;
    }

    
    public static int? GetUserId(ClaimsIdentity? identity)
    {
        if (int.TryParse(GetClaim(identity, ClaimTypes.Name), out var id))
            return id;
        return null;
    }

    private static string? GetClaim(ClaimsIdentity? identity, string claimType)
    {
        var userClaims = identity?.Claims;
        return userClaims?.FirstOrDefault(o => o.Type == claimType)?.Value;
    }
}