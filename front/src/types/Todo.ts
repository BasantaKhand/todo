export interface Todo {
    id?: number;
    text: string;
    completed: boolean;
    updatedAt?: string;
    createdAt?: string;
    userId: string
}