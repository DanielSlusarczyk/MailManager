interface BaseContact {
    name: string;
    email: string;
}

export interface SaveContact extends BaseContact {
    id?: number;
}

export interface Contact extends BaseContact {
    id: number;
}