using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Data;

public class InMemoryContext : DataContext
{
    public InMemoryContext(IConfiguration configuration) : base(configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseInMemoryDatabase(databaseName:"DB");
    }
}