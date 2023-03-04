namespace LuckyDevFinals.Entities.DTO.Company;

public class CompanyResponseDTO
{
    /// <example>1</example>
    public int Id { get; set; }
    
    /// <example>email@gmail.com</example>
    public required string Email { get; set; }
    
    public required string About { get; set; }
    
    public List<ProjectDTO> Projects { get; set; }
    public List<CompanyReviewDTO> Reviews { get; set; }
}