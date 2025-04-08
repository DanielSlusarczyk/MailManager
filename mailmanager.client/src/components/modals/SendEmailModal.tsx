import { useEffect, useState } from 'react';
import CustomModal from './CustomModal';

interface SendEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (subject: string, message: string) => void;
    groupName: string;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({ isOpen, onClose, onSend, groupName }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSubject('');
            setMessage('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend(subject, message);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={<span>Send email to group: <span className="text-blue-600">{groupName}</span></span>}
            submitLabel="Send"
        >
            <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 p-2 rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={150}
                required
            />
            <textarea
                placeholder="Text"
                className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                required
            />
        </CustomModal>
    );
};

export default SendEmailModal;
