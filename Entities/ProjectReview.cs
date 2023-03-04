namespace LuckyDevFinals.Entities;

public class ProjectReview
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CompanyId { get; set; }
    public string Content { get; set; }
}