import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import ContactFormModal from '../modals/ContactFormModal';
import CustomList from './CustomList';
import { Contact } from '../../interfaces/Contact';

interface ContactsListProps {
    contacts: Contact[];
    onDelete: (id: number) => void;
    onSave: (contact: Partial<Contact>) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, onDelete, onSave }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const handleSave = async (contact: Partial<Contact>) => {
        setModalOpen(false);
        setEditingContact(null);

        onSave(contact);
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
                        className="shadow-md rounded-2xl p-4 bg-white flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold max-w-56 overflow-hidden">{contact.name} </h3>
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
                            <button onClick={() => onDelete(contact.id)}>
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
