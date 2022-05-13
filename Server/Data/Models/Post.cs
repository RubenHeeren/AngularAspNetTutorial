namespace Server.Data.Models;

public class Post
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public bool Published { get; set; }
}
