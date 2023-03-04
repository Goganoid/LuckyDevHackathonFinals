using LuckyDevFinals.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Data;


public static class Seed
{
    private static readonly string lorem =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    private static readonly List<string> tagLabels = new List<string>()
    {
        "JS",
        "React.js",
        ".NET",
        "ASP.NET",
        "WPF",
        "Angular",
        "Vue",
        "Redux",
        "REST",
        "HTML",
        "CSS",
        "PHP"
    };

    private static List<Tag> SeedTags()
    {
        return tagLabels.Select(label => new Tag() {Label = label}).ToList();
    }
    private static List<User> SeedUsers(int amount,DataContext dataContext)
    {
        List<User> users = new();
        var tags = dataContext.Tags.ToList();
        for (int i = 0; i < amount; i++)
        {
            var user = new User("Jonh", $"Doe {i}", $"john_doe{(i==0?"":i)}@gmail.com", "123456");
            user.About = lorem;
            user.EnglishLevel = (LanguageLevel)Random.Shared.Next(0, 6);
            user.SkillTags = tags.OrderBy(x => Random.Shared.Next()).Take(Random.Shared.Next(4, 8)).ToList();
            users.Add(user);
        }

        return users;
    }

    private static List<Company> SeedCompanies(int amount,DataContext dataContext)
    {
        List<Company> companies = new();
       
        for (int i = 0; i < amount; i++)
        {
            var company = new Company($"company_email{(i==0?"":i)}@gmail.com", "123456");
            company.Name = $"Company {i}";
            company.About = lorem;
            company.Reviews = Enumerable.Range(0, Random.Shared.Next(1, 6)).Select(_j => new CompanyReview
            {
                Content = lorem
            }).ToList();
            company.Projects = Enumerable.Range(0, Random.Shared.Next(1, 6)).Select(_i =>
            {
                var pubDate = DateTime.Now.Subtract(TimeSpan.FromDays(Random.Shared.Next(60)));
                
                
                return new Project
                {
                    Description = lorem,
                    Title = $"[{company.Name}] Project {_i}",
                    EnglishLevel = (LanguageLevel) Random.Shared.Next(0, 6),
                    PublicationDate = pubDate,
                    Vacancies = new(),
                    ProjectHiringStatus = ProjectHiringStatus.Ongoing
                };
            }).ToList();
            companies.Add(company);
        }

        return companies;
    }

    private static void SeedVacancies(DataContext dataContext)
    {
        var tags = dataContext.Set<Tag>().ToList();
        foreach (var company in dataContext.Companies.Include(c=>c.Projects))
        {
            foreach (var project in company.Projects)
            {
                var vacancies = Enumerable.Range(0, Random.Shared.Next(1, 6)).Select(_j =>
                {
                    var tags_s = tags
                        .OrderBy(x => Random.Shared.Next())
                        .Take(Random.Shared.Next(4, 8))
                        // .Select(t=>new Tag{Id = t.Id,Label = t.Label})
                        .ToList();
                    return new Vacancy
                    {
                        Name = $"[{company.Name}] Vacancy {_j}",
                        Open = true,
                        Tags = tags_s
                    };
                }).ToList();
                project.Vacancies.AddRange(vacancies);
                dataContext.SaveChanges();
            }
            
        }
    }
    public static void SeedData(DataContext dataContext)
    {
        if(dataContext.Users.Any()) return;
        // insert data
        dataContext.Tags.AddRange(SeedTags());
        dataContext.SaveChanges();
        dataContext.Users.AddRange(SeedUsers(10,dataContext));
        dataContext.SaveChanges();
        dataContext.Companies.AddRange(SeedCompanies(5,dataContext));
        dataContext.SaveChanges();
        SeedVacancies(dataContext);
        dataContext.SaveChanges();
    }
}