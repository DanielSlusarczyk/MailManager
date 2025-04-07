import React, { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';
import axios from 'axios';
import ContactFormModal from '../modals/ContactFormModal';
import CustomList from './CustomList';

interface Contact {
    id: number;
    name: string;
    email: string;
}

const ContactsList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get<Contact[]>('/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Failed to fetch contacts', error);
        }
    };

    const deleteContact = async (id: number) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            setContacts((prev) => prev.filter((contact) => contact.id !== id));
        } catch (error) {
            console.error('Failed to delete contact', error);
        }
    };


    const handleSave = async (contact: Partial<Contact>) => {
        if (contact.id) {
            await axios.put(`/api/contacts/${contact.id}`, contact);
        } else {
            const response = await axios.post('/api/contacts', contact);
            contact = response.data;
        }
        setModalOpen(false);
        setEditingContact(null);
        fetchContacts();
    };

    return (
        <>
            <CustomList
                title="Contacts"
                buttonLabel="Add new contact"
                onAddClick={() => {
                    setEditingContact(null);
                    setModalOpen(true);
                }}
                items={contacts}
                emptyMessage="You have no contacts yet"
                renderItem={(contact) => (
                    <div
                        key={contact.id}
                        className="shadow-xl rounded-2xl p-4 bg-white flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{contact.name}</h3>
                            <p className="text-gray-500">{contact.email}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setEditingContact(contact);
                                    setModalOpen(true);
                                }}
                                className="hover:text-blue-600"
                            >
                                <Settings size={25} />
                            </button>
                            <button onClick={() => deleteContact(contact.id)}>
                                <X size={25} className="hover:text-red-600 transition-colors" />
                            </button>
                        </div>
                    </div>
                )}
            />

            <ContactFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                contactToEdit={editingContact}
            />
        </>

    );
};

export default ContactsList;
