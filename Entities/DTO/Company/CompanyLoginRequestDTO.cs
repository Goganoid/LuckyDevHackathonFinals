namespace LuckyDevFinals.Entities.DTO.Company;

public class CompanyLoginRequestDTO
{
    /// <example>company_email@gmail.com</example> 
    public required string Email { get; set; }

    /// <example>123456</example> 
    public required string Password { get; set; }
}