import { Plus } from 'lucide-react';
import React from 'react';

interface CustomListProps<T> {
    title: string;
    buttonLabel: string;
    onAddClick: () => void;
    items: T[];
    emptyMessage: string;
    renderItem: (item: T) => React.ReactNode;
}

const CustomList = <T,>({
    title,
    buttonLabel,
    onAddClick,
    items,
    emptyMessage,
    renderItem,
}: CustomListProps<T>) => {
    return (
        <div className="p-6 mb-5 bg-gray-100 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <button
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-48"
                    onClick={onAddClick}
                >
                    <Plus size={18} />
                    {buttonLabel}
                </button>
            </div>

            <div className="grid gap-4 max-h-[500px] p-2 rounded overflow-y-auto">
                {items.length > 0 ? (
                    items.map(renderItem)
                ) : (
                    <div className="opacity-50">{emptyMessage}</div>
                )}
            </div>
        </div>
    );
};

export default CustomList;