

using System.Security.Claims;
using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.Company;
using LuckyDevFinals.Entities.DTO.User;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
    [Authorize]
    [HttpPost("reviews-create")]
    public async Task<IActionResult> AddReview(CreateReviewDTO reviewDTO)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var user = await _context.Users
            .FirstOrDefaultAsync(c => c.Id == id);
        try
        {
            if (user == null) return NotFound("user not found");
            var newReview = _mapper.Map<CompanyReview>(reviewDTO);
            var company = _context.Companies
                .Include(c=>c.Reviews)
                .FirstOrDefault(c=>c.Id==reviewDTO.CompanyId);
            if(company==null) return NotFound("company not found");
            newReview.UserId = user.Id;
            company.Reviews.Add(newReview);
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