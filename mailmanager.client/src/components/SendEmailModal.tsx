import { useEffect, useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSend: (subject: string, message: string) => void;
    groupName: string;
}

const SendEmailModal: React.FC<Props> = ({ isOpen, onClose, onSend, groupName }) => {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Wyślij wiadomość do grupy: <span className="text-blue-600">{groupName}</span></h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Temat wiadomości"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Treść wiadomości"
                        className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

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
                            Wyślij
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendEmailModal;
