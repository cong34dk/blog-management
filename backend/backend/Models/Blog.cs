using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Blog
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public string? Content { get; set; }
        public string Image { get; set; }
        [Required]
        public string[] Position { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public bool IsPublic { get; set; }
        public DateTime? PublishDate { get; set; }

        public Blog()
        {
            Position = new string[] { };
            Image = string.Empty;
        }
    }
}
