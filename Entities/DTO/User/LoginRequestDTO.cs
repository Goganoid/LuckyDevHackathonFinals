namespace LuckyDevFinals.Entities.DTO.User;

public class LoginRequestDTO
{
    /// <example>john_doe@gmail.com</example> 
    public required string Email { get; set; }

    /// <example>123456</example> 
    public required string Password { get; set; }
}