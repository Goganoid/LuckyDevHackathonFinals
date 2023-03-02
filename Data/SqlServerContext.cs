using Microsoft.EntityFrameworkCore;

namespace LuckyDevFinals.Data;

public class SqlServerContext : DataContext
{
    public SqlServerContext(IConfiguration configuration) : base(configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        options.UseSqlServer(Configuration.GetConnectionString("ConnStr"));
    }
}