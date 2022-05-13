using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;

namespace Server;

public static class PostsEndpoints
{
    // Extends WebApplication.
    public static void MapPostsEndpoints(this WebApplication app)
    {
        app.MapGet("/posts", async (AppDbContext dbContext) =>
        {
            List<Post> allPosts = await dbContext.Posts.ToListAsync();

            return Results.Ok(allPosts);
        });
        
        app.MapGet("/posts/{Id}", async (int Id, AppDbContext dbContext) =>
        {
            Post? post = await dbContext.Posts.FindAsync(Id);

            if (post != null)
            {
                return Results.Ok(post);
            }
            else
            {
                return Results.NotFound();
            }
        });

        app.MapPost("/posts", async (PostCreateUpdateDTO postToCreateDTO, AppDbContext dbContext) =>
        {
            // Let EF Core auto-increment the ID.
            Post PostToCreate = new()
            {
                Id = 0,
                Title = postToCreateDTO.Title,
                Content = postToCreateDTO.Content,
                Published = postToCreateDTO.Published
            };

            dbContext.Posts.Add(PostToCreate);

            bool success = await dbContext.SaveChangesAsync() > 0;

            if (success)
            {
                return Results.Created($"/posts/{PostToCreate.Id}", PostToCreate);
            }
            else
            {
                // 500 = internal server error.
                return Results.StatusCode(500);
            }
        });

        app.MapPut("/posts/{Id}", async (int Id, PostCreateUpdateDTO updatedPostDTO, AppDbContext dbContext) =>
        {
            var postToUpdate = await dbContext.Posts.FindAsync(Id);

            if (postToUpdate != null)
            {
                postToUpdate.Title = updatedPostDTO.Title;
                postToUpdate.Content = updatedPostDTO.Content;
                postToUpdate.Published = updatedPostDTO.Published;

                bool success = await dbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return Results.Ok(postToUpdate);
                }
                else
                {
                    // 500 = internal server error.
                    return Results.StatusCode(500);
                }
            }
            else
            {
                return Results.NotFound();
            }
        });

        app.MapDelete("/posts/{Id}", async (int Id, AppDbContext dbContext) =>
        {
            Post? postToDelete = await dbContext.Posts.FindAsync(Id);

            if (postToDelete != null)
            {
                dbContext.Posts.Remove(postToDelete);

                bool success = await dbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return Results.NoContent();
                }
                else
                {
                    // 500 = internal server error.
                    return Results.StatusCode(500);
                }
            }
            else
            {
                return Results.NotFound();
            }
        });
    }
}
