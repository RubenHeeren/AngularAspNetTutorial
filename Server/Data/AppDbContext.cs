using Microsoft.EntityFrameworkCore;
using Server.Data.Models;

namespace Server.Data;

public class AppDbContext : DbContext
{
    // We use => (expression-bodied members) to avoid nullable reference types errors.
    // Source: https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types#dbcontext-and-dbset.
    public DbSet<Post> Posts => Set<Post>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {               
        // Call the base version of this method (in DbContext) as well, else we sometimes get an error later on.
        base.OnModelCreating(modelBuilder);

        var postsToSeed = new Post[6];

        for (int i = 1; i < 7; i++)
        {
            postsToSeed[i - 1] = new()
            {
                Id = i,
                Title = $"Post {i}",
                Content = $"Content of post {i}",
                Published = true
            };
        }

        modelBuilder.Entity<Post>().HasData(postsToSeed);
    }
}
