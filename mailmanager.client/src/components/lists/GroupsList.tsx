import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import GroupFormModal from '../modals/GroupFormModal';
import SendEmailModal from '../modals/SendEmailModal';
import CustomList from './CustomList';
import { Group } from '../../interfaces/Group';
import { Contact } from '../../interfaces/Contact';

interface GroupsListProps {
    groups: Group[];
    contacts: Contact[];
    onSave: (name: string, contactIds: number[]) => void;
    onDelete: (id: number) => void;
    onSendEmail: (subject: string, message: string, groupId: number) => void;

}

const GroupsList: React.FC<GroupsListProps> = ({ groups, contacts, onSave, onDelete, onSendEmail }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    const handleOpenEmailModal = (groupId: number, groupName: string) => {
        setSelectedGroupId(groupId);
        setSelectedGroupName(groupName);
        setEmailModalOpen(true);
    };

    const handleSendEmail = async (subject: string, message: string) => {
        if (!selectedGroupId) return;

        setEmailModalOpen(false);

        onSendEmail(subject, message, selectedGroupId);
    };


    const handleSaveGroup = async (name: string, contactIds: number[]) => {
        setModalOpen(false);
        onSave(name, contactIds);
    };

    return (
        <>
            <CustomList
                title="Contacts Groups"
                buttonLabel="Add new group"
                onAddClick={() => setModalOpen(true)}
                items={groups}
                emptyMessage="You have no groups yet"
                renderItem={(group) => (
                    <div
                        key={group.id}
                        className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            <p className="text-gray-500">
                                Number of contacts: {group.contacts ?? 0}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div>
                                <button
                                    onClick={() => handleOpenEmailModal(group.id, group.name)}
                                    className="text-black hover:text-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={group.isJobInProgress}
                                >
                                    <Mail size={25} />
                                </button>
                                <button onClick={() => onDelete(group.id)}>
                                    <X size={25} className="hover:text-red-600 transition-colors" />
                                </button>
                            </div>

                            {!group.isJobInProgress && group.lastJobFinishedAt && (
                                <p className="text-[10px] text-gray-500 text-center leading-tight">
                                    Last sent: {new Date(group.lastJobFinishedAt).toLocaleString()}
                                    {group.lastJobFailedCount && group.lastJobFailedCount > 0
                                        ? ` (${group.lastJobFailedCount} failures)`
                                        : ''}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            />

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
        </>
    );
};

export default GroupsList;
