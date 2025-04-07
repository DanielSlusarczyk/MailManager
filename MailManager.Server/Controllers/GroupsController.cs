using MailManager.Server.Data.DTO;
using MailManager.Server.Data.Mappers;
using MailManager.Server.Data.Models;
using MailManager.Server.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

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

                bool IsJobInProgress = jobInfo?.HasInProgress ?? false;
                
                DateTime? LastJobFinishedAt = null;
                int? LastJobFailedCount = null;

                if(!IsJobInProgress)
                {
                    LastJobFinishedAt = jobInfo?.LastProcessed?.FinishedAt;
                    LastJobFailedCount = jobInfo?.LastProcessed?.FailedCount;
                }

                return GroupMapper.ToDto(group, IsJobInProgress, LastJobFinishedAt, LastJobFailedCount);
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

            return GroupMapper.ToDto(group);
        }

        [HttpPost]
        public async Task<ActionResult<GroupDto>> CreateGroup(CreateGroupDto dto)
        {
            var contacts = await _context.Contacts
                .Where(c => dto.ContactIds.Contains(c.Id))
                .ToListAsync();

            if(contacts == null || contacts.Count == 0)
            {
                return BadRequest();
            }

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
