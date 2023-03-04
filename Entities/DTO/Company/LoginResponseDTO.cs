namespace LuckyDevFinals.Entities.DTO.Company;

public class CompanyLoginDTO
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string Token { get; set; }
}