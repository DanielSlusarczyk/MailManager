using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Data.DTO
{

    public class ContactDto
    {
        public int Id { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Name { get; set; } = "";
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
    }
}
