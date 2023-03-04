namespace LuckyDevFinals.Entities.DTO;

public class CompanyReviewDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CompanyId { get; set; }
    public string Content { get; set; }
}