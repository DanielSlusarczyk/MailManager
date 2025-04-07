import React, { useEffect, useState } from 'react';
import CustomModal from './CustomModal';

interface Contact {
    id: number;
    name: string;
    email: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (groupName: string, contactIds: number[]) => void;
    availableContacts: Contact[];
}

const GroupFormModal: React.FC<Props> = ({ isOpen, onClose, onSave, availableContacts }) => {
    const [name, setName] = useState('');
    const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setSelectedContactIds([]);
        }
    }, [isOpen]);

    const toggleContact = (id: number) => {
        setSelectedContactIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name, selectedContactIds);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Add new group"
        >
            <input
                type="text"
                placeholder="Group name"
                className="w-full border border-gray-300 p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
                {availableContacts.map((contact) => (
                    <label key={contact.id} className="flex items-center gap-2 py-1">
                        <input
                            type="checkbox"
                            checked={selectedContactIds.includes(contact.id)}
                            onChange={() => toggleContact(contact.id)}
                        />
                        <span>{contact.name} ({contact.email})</span>
                    </label>
                ))}
            </div>
        </CustomModal>
    );
};

export default GroupFormModal;
