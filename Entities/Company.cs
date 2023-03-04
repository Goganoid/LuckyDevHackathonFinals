using System.Diagnostics.CodeAnalysis;

namespace LuckyDevFinals.Entities;

public class Company : BaseUser
{
    public Company(){}
    [SetsRequiredMembers]
    public Company(string email, string password): base(email, password){}
    
    public string Name { get; set; }
    public List<Project> Projects { get; set; } = new();
    public List<CompanyReview> Reviews { get; set; }
}