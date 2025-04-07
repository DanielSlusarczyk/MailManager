using MailManager.Server.Data.DTO;
using MailManager.Server.Data.Mappers;
using MailManager.Server.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetContacts()
        {
            return await _context.Contacts
                .Select(contact => ContactMapper.ToDto(contact)).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound();

            return ContactMapper.ToDto(contact);
        }

        [HttpPost]
        public async Task<ActionResult<ContactDto>> CreateContact(ContactDto contact)
        {
            _context.Contacts.Add(ContactMapper.ToModel(contact));
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, ContactDto updatedContact)
        {
            if (id != updatedContact.Id)
                return BadRequest();

            if (!_context.Contacts.Any(c => c.Id == id))
                return NotFound();

            _context.Entry(ContactMapper.ToModel(updatedContact)).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts
                .Include(c => c.Groups)
                .ThenInclude(g => g.Contacts)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null)
                return NotFound();

            var groupsToCheck = contact.Groups.ToList();

            foreach (var group in groupsToCheck)
            {
                group.Contacts.Remove(contact);

                if (group.Contacts.Count == 0)
                {
                    _context.Groups.Remove(group);
                }
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
