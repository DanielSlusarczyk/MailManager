import { useEffect, useState } from 'react';
import ContactsList from './components/lists/ContactsList';
import GroupsList from './components/lists/GroupsList';
import axios from 'axios';
import { Group } from './interfaces/Group';
import { Contact } from './interfaces/Contact';

function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get<Contact[]>('/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Failed to fetch contacts', error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.get<Group[]>('/api/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Failed to fetch groups', error);
        }
    };

    const handleDeleteContact = async (id: number) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            setContacts((prev) => prev.filter((contact) => contact.id !== id));

            fetchGroups();
        } catch (error) {
            console.error('Failed to delete contact', error);
        }
    };

    const handleSaveContact = async (contact: Partial<Contact>) => {
        if (contact.id) {
            await axios.put(`/api/contacts/${contact.id}`, contact);
        } else {
            const response = await axios.post('/api/contacts', contact);
            contact = response.data;
        }

        fetchContacts();
    };

    const handleSaveGroup = async (name: string, contactIds: number[]) => {
        await axios.post('/api/groups', {
            name,
            contactIds
        });
        fetchGroups();
    };

    const handleDeleteGroup = async (id: number) => {
        try {
            await axios.delete(`/api/groups/${id}`);
            setGroups((prev) => prev.filter((group) => group.id !== id));

        } catch (error) {
            console.error('Failed to delete group', error);
        }
    };

    const handleSendEmail = async (subject: string, message: string, groupId: number) => {
        await axios.post('/api/emailjobs', {
            subject,
            message,
            groupId: groupId
        });

        await fetchGroups();
    };

    useEffect(() => {
        fetchContacts();
        fetchGroups();
    }, []);

    return (
        <div className="w-11/12 m-auto mt-10 min-w-96">
            <ContactsList
                contacts={contacts}
                onDelete={handleDeleteContact}
                onSave={ handleSaveContact}
            />
            <GroupsList
                groups={groups}
                contacts={contacts}
                onSave={handleSaveGroup}
                onDelete={handleDeleteGroup}
                onSendEmail={handleSendEmail}
            />
        </div>
    );
}

export default App;