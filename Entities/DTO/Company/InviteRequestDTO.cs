namespace LuckyDevFinals.Entities.DTO.Company;

public class InviteRequestDTO
{
    public int UserId { get; set; }
    public int VacancyId { get; set; }
    public string Message { get; set; }
}