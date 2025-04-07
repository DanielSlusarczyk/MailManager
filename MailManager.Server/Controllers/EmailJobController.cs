using MailManager.Server.Database;
using MailManager.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailJobController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpPost]
        public async Task<IActionResult> CreateEmailJob([FromBody] EmailJob job)
        {
            var groupExists = await _context.Groups.AnyAsync(g => g.Id == job.GroupId);
            if (!groupExists)
                return NotFound("Group not found");

            _context.EmailJobs.Add(job);
            await _context.SaveChangesAsync();

            return Ok(job);
        }
    }
}
