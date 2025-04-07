



### 📬 Description
MailManager is a web application designed for managing contacts, organizing them into groups, and sending emails to selected recipients.

Technologies: 
* **Backend**: ASP.NET Core (net8.0)
* **Frontend**: React + TypeScript
* **Database**: SQLite

### 🔥 Run
1. Open project in VS 2022
2. Configure in `Configure Startup Projects...` > `Multiple startup projects`:
* mailmanager.client - Action: Start
* MailManager.Server - Action: Start
3. Fill SMTP credentials in `MailManager.Server/appsettings.json` - `EmailSettings`


### ✨ Example features

* **Listing of created contacts and groups:**
![lists](https://github.com/user-attachments/assets/2ed93e95-725d-43c8-8ecf-4a38f83032a1)

* **Adding a new contacts:**
![new_contact](https://github.com/user-attachments/assets/aac8dc84-61f8-4b20-b2e3-e5a9c7b1ab51)

* **Adding a new groups:**
![new_group](https://github.com/user-attachments/assets/8a2d7741-93ed-496e-8b30-6bf426f9f4f6)

* **Editing an existing contact:**
![edit](https://github.com/user-attachments/assets/19a43e7e-84a2-4027-807e-02fb1750b1a3)

* **Sending emails to groups:**
![send_email](https://github.com/user-attachments/assets/baa94fce-ccc6-445f-870c-587179a09bc1)

* **Reading information about the last email sent to a group:**
![sent-info](https://github.com/user-attachments/assets/59cca745-a650-490d-aa00-d0bc13282f54)




