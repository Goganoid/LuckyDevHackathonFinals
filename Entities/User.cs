using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LuckyDevFinals.Entities;

public class User : BaseUser
{
    public User()
    {
    }

    [SetsRequiredMembers]
    public User(string firstName, string lastName, string email,
        string password) : base(email, password)
    {
        FirstName = firstName;
        LastName = lastName;
    }

    public required string FirstName { get; set; }
    public required string LastName { get; set; }

    public List<Tag> SkillTags { get; set; } = new();
    // 0-5
    public LanguageLevel EnglishLevel { get; set; } = LanguageLevel.NoEnglish;
    
}