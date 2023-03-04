using AutoMapper;
using LuckyDevFinals.Data;
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
}