using MailManager.Server.Data.DTO;
using MailManager.Server.Database;
using MailManager.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactGroupsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            var groups = await _context.Groups
                .Include(g => g.Contacts)
                .ToListAsync();

            var jobsInfo = await _context.EmailJobs
                .GroupBy(j => j.GroupId)
                .Select(g => new
                {
                    GroupId = g.Key,
                    HasInProgress = g.Any(x => !x.IsProcessed),
                    LastProcessed = g.Where(x => x.IsProcessed)
                                        .OrderByDescending(x => x.FinishedAt)
                                        .Select(x => new { x.FinishedAt, x.FailedCount })
                                        .FirstOrDefault()
                })
                .ToListAsync();

            var jobsDict = jobsInfo.ToDictionary(j => j.GroupId);



            return groups.Select(group =>
            {
                jobsDict.TryGetValue(group.Id, out var jobInfo);

                return new GroupDto
                {
                    Id = group.Id,
                    Name = group.Name,
                    Contacts = group.Contacts.Count,
                    IsJobInProgress = jobInfo?.HasInProgress ?? false,
                    LastJobFinishedAt = jobInfo?.HasInProgress == true ? null : jobInfo?.LastProcessed?.FinishedAt,
                    LastJobFailedCount = jobInfo?.HasInProgress == true ? null : jobInfo?.LastProcessed?.FailedCount
                };
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDto>> GetGroup(int id)
        {
            var group = await _context.Groups
               .Include(g => g.Contacts)
               .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null)
                return NotFound();

            var groupDto = new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };

            return groupDto;
        }

        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup(CreateGroupDto dto)
        {
            var contacts = await _context.Contacts
                .Where(c => dto.ContactIds.Contains(c.Id))
                .ToListAsync();

            var group = new Group
            {
                Name = dto.Name,
                Contacts = contacts
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroup), new { id = group.Id }, new { group.Id, group.Name });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null)
                return NotFound();

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
