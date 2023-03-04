

using AutoMapper;
using LuckyDevFinals.Data;
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
            .Include(u=>u.Reviews)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (company == null) return NotFound("Company not found");
        var companyDTO = _mapper.Map<CompanyResponseDTO>(company);
        return Ok(companyDTO);
    }
}