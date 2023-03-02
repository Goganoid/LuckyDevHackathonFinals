using LuckyDevFinals.Entities;
using Microsoft.EntityFrameworkCore;
using RecipeWiki.Entities;

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
    }
    public DbSet<User> Users { get; set; }
}