export type LoginRequest = {
    username: string;
    password: string;
};
  
export type CreateUserRequest = {
    username: string;
    password: string;
    email: string;
};

export type Todo = {
    id?: number;
    title: string;
    description?: string;
    completed?: boolean;
    userId?: number;
};
