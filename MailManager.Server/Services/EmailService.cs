using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace MailManager.Server.Services
{
    public class EmailService(IOptions<EmailSettings> emailSettings)
    {
        private readonly EmailSettings _emailSettings = emailSettings.Value;

        public void ValidateConfiguration()
        {
            if (string.IsNullOrWhiteSpace(_emailSettings.SmtpServer))
                throw new InvalidOperationException("SMTP server is not configured");

            if (_emailSettings.SmtpPort <= 0)
                throw new InvalidOperationException("SMTP port is invalid or not configured");

            if (string.IsNullOrWhiteSpace(_emailSettings.SmtpUser))
                throw new InvalidOperationException("SMTP user is not configured");

            if (string.IsNullOrWhiteSpace(_emailSettings.SmtpPass))
                throw new InvalidOperationException("SMTP password is not configured");
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            var mail = new MailMessage
            {
                From = new MailAddress(_emailSettings.SmtpUser),
                Subject = subject,
                Body = message
            };
            mail.To.Add(toEmail);

            using (var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))
            {
                smtp.Credentials = new NetworkCredential(_emailSettings.SmtpUser, _emailSettings.SmtpPass);
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(mail);
            }
        }
    }

    public class EmailSettings
    {
        public string SmtpServer { get; set; } = "";
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; } = "";
        public string SmtpPass { get; set; } = "";
    }
}
