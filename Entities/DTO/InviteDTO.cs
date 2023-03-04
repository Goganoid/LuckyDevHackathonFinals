using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO.Company;

namespace LuckyDevFinals.Entities.DTO;

public class InviteDTO
{
    public int Id { get; set; }
    public string Message { get; set; }
    public CompanyResponseDTO Company { get; set; }
    public int VacancyId { get; set; }
    public InviteStatus Status { get; set; }
    public int UserId { get; set; }
}