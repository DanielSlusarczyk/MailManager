import React, { useEffect, useState } from 'react';

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Dodaj nową grupę</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nazwa grupy"
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

                    <div className="flex justify-end gap-2 pt-2">
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

export default GroupFormModal;
