using MailManager.Server.Data.DTO;
using MailManager.Server.Data.Models;

namespace MailManager.Server.Data.Mappers
{
    public static class GroupMapper
    {
        public static GroupDto ToDto(Group group, bool IsJobInProgress = false, DateTime? LastJobFinishedAt = null, int? LastJobFailedCount = 0)
        {
            if (group == null)
                throw new ArgumentException("Failed to map group");

            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Contacts = group.Contacts?.Count ?? 0,
                IsJobInProgress = IsJobInProgress,
                LastJobFinishedAt = LastJobFinishedAt,
                LastJobFailedCount = LastJobFailedCount
            };
        }
    }
}
