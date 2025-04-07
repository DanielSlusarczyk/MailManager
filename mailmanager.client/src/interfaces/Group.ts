export interface Group {
    id: number;
    name: string;
    contacts: number;

    isJobInProgress: boolean;
    lastJobFinishedAt?: string;
    lastJobFailedCount?: number;
}