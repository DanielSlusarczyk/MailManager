using System.ComponentModel.DataAnnotations;

namespace MailManager.Server.Data.DTO
{
    public class CreateGroupDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = "";

        public List<int> ContactIds { get; set; } = [];
    }
}
