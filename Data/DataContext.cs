using LuckyDevFinals.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Data;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Vacancies)
            .WithMany(v => v.Candidates);
        modelBuilder.Entity<User>()
            .HasMany(u => u.AcceptedVacancies)
            .WithOne(v => v.AcceptedCandidate);
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Tag> Tags { get; set; } 
    public DbSet<Project> Projects { get; set; }
    public DbSet<Vacancy> Vacancies { get; set; }
}