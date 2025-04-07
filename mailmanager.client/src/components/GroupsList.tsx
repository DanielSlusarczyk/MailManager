import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupFormModal from './GroupFormModal';
import { Mail, Plus } from 'lucide-react';
import SendEmailModal from './SendEmailModal';

interface Contact {
    id: number;
    name: string;
    email: string;
}

interface ContactGroup {
    id: number;
    name: string;
    contacts: number;

    isJobInProgress: boolean;
    lastJobFinishedAt?: string;
    lastJobFailedCount?: number;
}

const GroupsList: React.FC = () => {
    const [groups, setGroups] = useState<ContactGroup[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    useEffect(() => {
        fetchGroups();
        fetchContacts();
    }, []);

    const handleOpenEmailModal = (groupId: number, groupName: string) => {
        setSelectedGroupId(groupId);
        setSelectedGroupName(groupName);
        setEmailModalOpen(true);
    };

    const handleSendEmail = async (subject: string, message: string) => {
        if (!selectedGroupId) return;

        await axios.post('/api/emailjob', {
            subject,
            message,
            groupId: selectedGroupId
        });

        await fetchGroups();
        setEmailModalOpen(false);
    };

    const fetchGroups = async () => {
        const response = await axios.get<ContactGroup[]>('/api/contactgroups');
        setGroups(response.data);
    };

    const fetchContacts = async () => {
        const response = await axios.get<Contact[]>('/api/contacts');
        setContacts(response.data);
    };

    const handleSaveGroup = async (name: string, contactIds: number[]) => {
        await axios.post('/api/contactgroups', {
            name,
            contactIds
        });
        setModalOpen(false);
        fetchGroups();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Grupy kontaktów</h1>
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setModalOpen(true)}
                >
                    <Plus size={18} />
                    Dodaj grupę
                </button>
            </div>

            <div className="grid gap-4">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            <p className="text-gray-500">
                                {group.contacts ?? 0} kontakt{group.contacts === 1 ? '' : 'ów'}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <button
                                onClick={() => handleOpenEmailModal(group.id, group.name)}
                                className={`text-black hover:text-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={group.isJobInProgress}
                            >
                                <Mail size={20} />
                            </button>
                            {!group.isJobInProgress && group.lastJobFinishedAt && (
                                <p className="text-[10px] text-gray-500 text-center leading-tight">
                                    Last sent: {new Date(group.lastJobFinishedAt).toLocaleString()}
                                    {group.lastJobFailedCount && group.lastJobFailedCount > 0
                                        ? `(${group.lastJobFailedCount} failures)`
                                        : ''}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <GroupFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveGroup}
                availableContacts={contacts}
            />
            <SendEmailModal
                isOpen={emailModalOpen}
                onClose={() => setEmailModalOpen(false)}
                onSend={handleSendEmail}
                groupName={selectedGroupName}
            />
        </div>
    );
};

export default GroupsList;
