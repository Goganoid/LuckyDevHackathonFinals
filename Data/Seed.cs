namespace LuckyDevFinals.Data;


public static class Seed
{
    public static void SeedData(DataContext dataContext)
    {
        // if(dataContext.Books.Any()) return;
        // insert data
        dataContext.SaveChanges();
    }
}