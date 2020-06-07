export interface TodoViewModel {
    title: string;
    id: string;
    description: string;
    done: boolean;
    createdDate: Date;
    lastModifiedDate: Date;
    userId: string; // <--
}
