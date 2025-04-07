using MailManager.Server.Data.DTO;
using MailManager.Server.Data.Models;

namespace MailManager.Server.Data.Mappers
{
    public static class ContactMapper
    {
        public static ContactDto ToDto(Contact contact)
        {
            if (contact == null) 
                throw new ArgumentException("Failed to map contact");

            return new ContactDto
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email
            };
        }
        public static Contact ToModel(ContactDto dto)
        {
            if (dto == null)
                throw new ArgumentException("Failed to map contact");

            return new Contact
            {
                Id = dto.Id,
                Name = dto.Name,
                Email = dto.Email
            };
        }
    }
}
