using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Controllers;
[ApiController]
[Route("[controller]")]
public class ProjectsController : ControllerBase
{
    private DataContext _context;
    private readonly IMapper _mapper;

    public ProjectsController(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    [HttpGet("tags")]
    public async Task<IActionResult> GetTags()
    {
        var tags = _context.Tags.Select(t => _mapper.Map<TagDTO>(t)).ToList();
        return Ok(tags);
    }
    [HttpGet("")]
    public async Task<IActionResult> GetProjectsList([FromQuery] string? tagQuery)
    {
        var projectsQuery = _context.Projects
            .Include(p=>p.Vacancies)
            .ThenInclude(v=>v.Tags).AsQueryable();
        if (tagQuery != null)
        {
            var tags = tagQuery.Split(',');
            projectsQuery = projectsQuery.Where(p => p
                .Vacancies
                .SelectMany(v => v.Tags)
                .Any(t => tags.Any(tag=>tag==t.Label)));
        }

        var result = projectsQuery.Select(p => _mapper.Map<ProjectDTO>(p));
        return Ok(result);
    }
}