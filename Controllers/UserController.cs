using System.Security.Claims;
using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private DataContext _context;
    private readonly IMapper _mapper;
    public UsersController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetUserInfo(int id)
    {
        var user = await _context.Users
            .Include(u=>u.SkillTags)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        var userDTO = _mapper.Map<UserResponseDTO>(user);
        return Ok(userDTO);
    }
    [HttpGet("")]
    public async Task<IActionResult> GetAllUsers([FromQuery] string? tagQuery)
    {
        var usersQuery = _context.Users
            .Include(u=>u.SkillTags).AsQueryable();
        if (tagQuery != null)
        {
            var tags = tagQuery.Split(',');
            usersQuery = usersQuery.Where(u => 
                u.SkillTags
                    .Any(t => 
                        tags.Any(tag=>tag==t.Label)));
        }

        var result = usersQuery.Select(p => _mapper.Map<UserResponseDTO>(p));
        return Ok(result);
    }
    [Authorize]
    [HttpPost("apply/{vacancyId:int}")]
    public async Task<IActionResult> Apply(int vacancyId)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var vacancy = await _context.Vacancies
            .Include(v => v.Candidates).FirstOrDefaultAsync(v => v.Id == vacancyId);
        if (vacancy == null) return NotFound("vacancy not found");
        if (vacancy.AcceptedCandidate != null) return Conflict("Vacancy is closed");
        var user = await _context.Users
            .FirstOrDefaultAsync(c => c.Id == id);
        try
        {
            if (user == null) return NotFound("user not found");
            if (vacancy.Candidates.Contains(user)) return Conflict("You have already applied");
            vacancy.Candidates.Add(user);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new {message = ex.Message});
        }  
    }
    [Authorize]
    [HttpGet("invites")]
    public async Task<IActionResult> GetInvites()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var user = await _context.Users
            .Include(u=>u.Invites).ThenInclude(i=>i.Company)
            .Include(u=>u.Invites).ThenInclude(i=>i.Vacancy)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        var invites = user.Invites.Select(i => _mapper.Map<InviteDTO>(i));
        return Ok(invites);
    }

    [Authorize]
    [HttpPut("invites/accept/{inviteId:int}")]
    public async Task<IActionResult> AcceptInvite(int inviteId)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var user = await _context.Users
            .Include(u=>u.Invites)
                .ThenInclude(i=>i.Vacancy)
                    .ThenInclude(v=>v.AcceptedCandidate)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        var invite = user.Invites.FirstOrDefault(i => i.Id == inviteId);
        if (invite == null) return NotFound("Invite not found");
        if (invite.Status == InviteStatus.Declined) return Conflict("You have already declined the invite");
        if (invite.Vacancy.AcceptedCandidate != null) return Conflict("Other candidate has already taken this vacancy");
        invite.Vacancy.AcceptedCandidate = user;
        invite.Status = InviteStatus.Accepted;
        _context.SaveChanges();
        return Ok();
    }
    [Authorize]
    [HttpPut("invites/decline/{inviteId:int}")]
    public async Task<IActionResult> DeclineInvite(int inviteId)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var user = await _context.Users
            .Include(u=>u.Invites)
            .ThenInclude(i=>i.Vacancy)
            .ThenInclude(v=>v.AcceptedCandidate)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        var invite = user.Invites.FirstOrDefault(i => i.Id == inviteId);
        if (invite == null) return NotFound("Invite not found");
        invite.Status = InviteStatus.Declined;
        _context.SaveChanges();
        return Ok();
    }
}