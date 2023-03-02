namespace LuckyDevFinals.Entities.DTO.User;

public class UserResponseDTO
{
    /// <example>1</example>
    public int Id { get; set; }

    /// <example>John</example>
    public required string FirstName { get; set; }

    /// <example>Doe</example>
    public required string LastName { get; set; }

    /// <example>email@gmail.com</example>
    public required string Email { get; set; }
}