using MailManager.Server.Data.Dto;
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
    public class EmailJobsController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        
        [HttpGet("{id}")]
        public async Task<ActionResult<EmailJobDto>> GetEmailJob(int id)
        {
            var job = await _context.EmailJobs.FirstOrDefaultAsync(j => j.Id == id);

            if (job == null)
                return NotFound();

            return EmailJobMapper.ToDto(job);
        }

        [HttpPost]
        public async Task<ActionResult<EmailJobDto>> CreateEmailJob([FromBody] EmailJobDto job)
        {
            var groupExists = await _context.Groups.AnyAsync(g => g.Id == job.GroupId);
            
            if (!groupExists)
                return NotFound("Group not found");

            _context.EmailJobs.Add(EmailJobMapper.ToModel(job));
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmailJob), new { id = job.Id }, job);
        }
    }
}
