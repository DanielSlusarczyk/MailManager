using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = "";
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        public ICollection<Group> Groups { get; set; } = [];
    }
}
