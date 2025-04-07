using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Data.Dto
{
    public class EmailJobDto
    {
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(150)]
        public string Subject { get; set; } = "";

        [Required]
        [MinLength(1)]
        [MaxLength(5000)]
        public string Message { get; set; } = "";

        [Required]
        public int GroupId { get; set; }
    }
}
