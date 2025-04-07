namespace MailManager.Server.Data.DTO
{
    public class GroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Contacts { get; set; }

        public bool IsJobInProgress { get; set; }
        public DateTime? LastJobFinishedAt { get; set; }
        public int? LastJobFailedCount { get; set; }
    }
}
