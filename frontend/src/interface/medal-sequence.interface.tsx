export interface MedalSequenceByUser {
    default: Default;
    next: Next;
}

export interface Default {
    id?: string;
    name: string;
    count?: number;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
    pendingPoints: number;
}

export interface Next {
    id: string;
    name: string;
    count: number;
    state: number;
    createdAt: string;
    updatedAt: string;
}
