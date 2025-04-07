using MailManager.Server.Data.Dto;
using MailManager.Server.Data.Models;

namespace MailManager.Server.Data.Mappers
{
    public static class EmailJobMapper
    {
        public static EmailJobDto ToDto(EmailJob job)
        {
            if (job == null)
                throw new ArgumentException("Failed to map email job");

            return new EmailJobDto
            {
                Id = job.Id,
                Subject = job.Subject,
                Message = job.Message,
                GroupId = job.GroupId
            };
        }

        public static EmailJob ToModel(EmailJobDto dto)
        {
            if (dto == null)
                throw new ArgumentException("Failed to map email job");

            return new EmailJob
            {
                Id = dto.Id,
                Subject = dto.Subject,
                Message = dto.Message,
                GroupId = dto.GroupId,
            };
        }
    }
}
