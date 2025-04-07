using MailManager.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Database
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<EmailJob> EmailJobs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Contact>()
                .HasMany(c => c.Groups)
                .WithMany(g => g.Contacts);
        }
    }
}
