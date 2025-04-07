using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Models
{
    public class Group
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = "";

        public ICollection<Contact> Contacts { get; set; } = [];
    }
}
