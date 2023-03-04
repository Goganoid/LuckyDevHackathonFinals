

using System.Security.Claims;
using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.Company;
using LuckyDevFinals.Entities.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Controllers;
[ApiController]
[Route("[controller]")]
public class CompanyController : ControllerBase
{
    private DataContext _context;
    private readonly IMapper _mapper;
    public CompanyController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCompanyInfo(int id)
    {
        var company = await _context.Companies
            .Include(u=>u.Projects)
                .ThenInclude(p=>p.Vacancies)
                    .ThenInclude(v=>v.Tags)
            .Include(u=>u.Reviews)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (company == null) return NotFound("Company not found");
        var companyDTO = _mapper.Map<CompanyResponseDTO>(company);
        return Ok(companyDTO);
    }

    [HttpPost("project-create")]
    public async Task<IActionResult> AddProject(CreateProjectRequestDTO projectDTO)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var company = await _context.Companies
            .Include(c=>c.Projects)
            .FirstOrDefaultAsync(c => c.Id == id);
        try
        {
            if (company == null) return NotFound("company not found");
            var newProject = _mapper.Map<Project>(projectDTO);
            newProject.PublicationDate = DateTime.Now;
            company.Projects.Add(newProject);
            _context.Companies.Update(company);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new {message = ex.Message});
        }
    }
}