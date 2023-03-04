using System.Security.Claims;
using AutoMapper;
using LuckyDevFinals.Data;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.Company;
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
            .Include(u=>u.Projects).ThenInclude(p=>p.Vacancies).ThenInclude(v=>v.Tags)
            .Include(u=>u.Projects).ThenInclude(p=>p.Vacancies).ThenInclude(v=>v.Candidates).ThenInclude(c=>c.SkillTags)
            .Include(u=>u.Projects).ThenInclude(p=>p.Vacancies).ThenInclude(v=>v.AcceptedCandidate)
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

    [Authorize]
    [HttpPost("invite/")]
    public async Task<IActionResult> InviteUser(InviteRequestDTO inviteDTO)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var company = await _context.Companies
            .Include(c=>c.Projects)
             .ThenInclude(p=>p.Vacancies)
            .FirstOrDefaultAsync(c => c.Id == id);
        var user = await _context.Users
            .Include(u=>u.Invites)
            .ThenInclude(i=>i.Vacancy)    
            .FirstOrDefaultAsync(u => u.Id == inviteDTO.UserId);
        
        try
        {
            if (user == null) return NotFound("user not found");
            if (company==null) return NotFound("company not found");
            var vacancy = company.Projects.SelectMany(p => p.Vacancies)
                .FirstOrDefault(v => v.Id == inviteDTO.VacancyId);
            if (vacancy==null) return NotFound("vacancy not found");
            if (user.Invites.Any(i => i.Vacancy.Id == vacancy.Id)) return Conflict("You have already sent invite");
            user.Invites.Add(new Invite()
            {
                Message = inviteDTO.Message,
                Company = company,
                Vacancy = vacancy,
                User = user,
            });
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
    [HttpPost("accept/")]
    public async Task<IActionResult> AcceptCandidate(CandidateAcceptRequest candidateAcceptRequest)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        var company = await _context.Companies
            .Include(c=>c.Projects).ThenInclude(p=>p.Vacancies).ThenInclude(v=>v.Candidates)
            .Include(c=>c.Projects).ThenInclude(p=>p.Vacancies).ThenInclude(v=>v.AcceptedCandidate)
            .FirstOrDefaultAsync(c => c.Id == id);
        try
        {
            if (company==null) return NotFound("company not found");
            var vacancy = company.Projects.SelectMany(p => p.Vacancies)
                .FirstOrDefault(v => v.Id == candidateAcceptRequest.VacancyId);
            if (vacancy==null) return NotFound("vacancy not found");
            var user = vacancy.Candidates.FirstOrDefault(u => u.Id == candidateAcceptRequest.UserId);
            if (user == null) return NotFound("user not found");

            vacancy.AcceptedCandidate = user;
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