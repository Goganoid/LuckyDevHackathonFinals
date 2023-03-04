using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using LuckyDevFinals.Helpers;

namespace LuckyDevFinals.Entities;

public abstract class BaseUser
{
    public BaseUser()
    {
    }

    [SetsRequiredMembers]
    public BaseUser(string email,
        string password)
    {
        Email = email;
        PasswordUtils.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
    }

    public int Id { get; set; }
    [EmailAddress] public required string Email { get; set; }

    public string About { get; set; } = "";
    
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}