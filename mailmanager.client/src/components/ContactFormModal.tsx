import React, { useState, useEffect } from 'react';

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {contactToEdit ? 'Edytuj kontakt' : 'Dodaj nowy kontakt'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Imię i nazwisko"
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
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;
