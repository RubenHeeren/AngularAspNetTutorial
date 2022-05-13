namespace Server.Data.Models;

public class PostCreateUpdateDTO
{
    public string? Title { get; set; }

    public string? Content { get; set; }

    public bool Published { get; set; }
}
