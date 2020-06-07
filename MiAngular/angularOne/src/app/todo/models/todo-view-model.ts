export interface TodoViewModel {
    title: string;
    description: string;
    done: boolean;
    createdDate: Date;
    lastModifiedDate: Date;
    userId: string; // <--
}
