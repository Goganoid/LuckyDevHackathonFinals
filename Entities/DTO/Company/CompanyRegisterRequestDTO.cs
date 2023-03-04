using System.ComponentModel.DataAnnotations;

namespace LuckyDevFinals.Entities.DTO.Company;

public class CompanyRegisterRequestDTO
{
    /// <example>john_doe@gmail.com</example>
    [EmailAddress] 
    public required string Email { get; set; }

    /// <example>123456</example>
    public required string Password { get; set; }
    
    public required string Name { get; set; }
}