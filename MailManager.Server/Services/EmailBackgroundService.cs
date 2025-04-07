using MailManager.Server.Database;
using Microsoft.EntityFrameworkCore;

namespace MailManager.Server.Services
{
    public class EmailBackgroundService(IServiceProvider services, ILogger<EmailBackgroundService> logger) : BackgroundService
    {
        private readonly IServiceProvider _services = services;
        private readonly ILogger<EmailBackgroundService> _logger = logger;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var pendingJobs = await context.EmailJobs
                    .Where(j => !j.IsProcessed)
                    .ToListAsync(stoppingToken);

                foreach (var job in pendingJobs)
                {
                    var group = await context.Groups
                        .Include(g => g.Contacts)
                        .FirstOrDefaultAsync(g => g.Id == job.GroupId, stoppingToken);

                    if (group == null)
                        continue;

                    int failedCount = 0;

                    foreach (var contact in group.Contacts)
                    {
                        try
                        {
                            _logger.LogInformation($"Sending email to {contact.Email}: {job.Subject}");
                        }
                        catch (Exception ex)
                        {
                            failedCount++;
                            _logger.LogError(ex, $"Failed to send email to {contact.Email}");
                        }
                    }

                    job.IsProcessed = true;
                    job.FinishedAt = DateTime.UtcNow;
                    job.FailedCount = failedCount;

                    await context.SaveChangesAsync(stoppingToken);
                }

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }
    }

}
