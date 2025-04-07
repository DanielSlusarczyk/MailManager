import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal';

interface Contact {
    id?: number;
    name: string;
    email: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (contact: Contact) => void;
    contactToEdit?: Contact | null;
}

const ContactFormModal: React.FC<Props> = ({ isOpen, onClose, onSave, contactToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (contactToEdit) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [contactToEdit, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: contactToEdit?.id, name, email });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={contactToEdit ? 'Edit contact' : 'Add new contact'}
        >
            <input
                type="text"
                placeholder="Name and surname"
                className="w-full border border-gray-300 p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </CustomModal>
    );
};

export default ContactFormModal;
