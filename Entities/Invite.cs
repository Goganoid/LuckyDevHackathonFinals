namespace LuckyDevFinals.Entities;

public enum InviteStatus
{
    Accepted,
    Declined,
    Unresponded,
}
public class Invite
{
    public int Id { get; set; }
    public Company Company { get; set; }
    public User User { get; set; }
    public Vacancy Vacancy { get; set; }
    public string Message { get; set; }
    public InviteStatus Status { get; set; } = InviteStatus.Unresponded;
}