namespace LuckyDevFinals.Entities.DTO.User;

public class UserUpdateRequestDTO
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? Password { get; set; }
}