namespace LuckyDevFinals.Entities;

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Tag> Tags { get; set; }
    public bool Open { get; set; }
    public List<User> Candidates { get; set; } = new();
    public User? AcceptedCandidate { get; set; }
}