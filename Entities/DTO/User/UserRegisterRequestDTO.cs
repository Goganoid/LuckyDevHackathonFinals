using System.ComponentModel.DataAnnotations;

namespace LuckyDevFinals.Entities.DTO.User;

public class UserRegisterRequestDTO
{
    /// <example>John</example> 
    public required string FirstName { get; set; }

    /// <example>Doe</example> 
    public required string LastName { get; set; }

    /// <example>john_doe@gmail.com</example>
    [EmailAddress] 
    public required string Email { get; set; }

    /// <example>123456</example>
    public required string Password { get; set; }
}