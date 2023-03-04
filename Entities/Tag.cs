namespace LuckyDevFinals.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Label { get; set; }
    public List<User> Users { get; set; }
}