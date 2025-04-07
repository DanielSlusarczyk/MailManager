using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Models
{
    public class EmailJob
    {
        public int Id { get; set; }

        [Required]
        public string Subject { get; set; } = "";

        [Required]
        public string Message { get; set; } = "";

        public int GroupId { get; set; }
        public bool IsProcessed { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime FinishedAt { get; set; }

        public int FailedCount { get; set; } = 0;
    }
}
