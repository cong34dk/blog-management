using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class BlogContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.Property(p => p.Id).ValueGeneratedOnAdd();
                entity.Property(p => p.Position).HasConversion(
                    p => string.Join(',', p),
                    p => p.Split(',', StringSplitOptions.RemoveEmptyEntries));
            });
        }
    }
}
