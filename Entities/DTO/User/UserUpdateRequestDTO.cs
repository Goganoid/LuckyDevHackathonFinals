namespace LuckyDevFinals.Entities.DTO.User;

public class UserUpdateRequestDTO
{
    public string? FirstName { get; set; }
    public string?  LastName { get; set; }
    public string?  Email { get; set; }
    public List<int>? TagIds { get; set; }
    public LanguageLevel? EnglishLevel { get; set; }
    public string? About { get; set; }
    public string? Password { get; set; }
}