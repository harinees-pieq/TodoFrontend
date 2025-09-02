import axios from 'axios';
import type { LoginRequest, CreateUserRequest, Todo } from '../model/Todo';

const API = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const loginUser = (data: LoginRequest) => API.post('/users/login', data);

export const registerUser = (data: CreateUserRequest) => API.post('/users/register', data);

export const getTodos = (userId: number) => API.get(`/todos?userId=${userId}`);

export const createTodo = (title: string, description: string, userId: number) => {
    return API.post('/todos', { title, description, userId });
}  
export const updateTodo = (id: number, data: Partial<Todo>) => API.put(`/todos/${id}`, data);

export const deleteTodo = (id: number) => API.delete(`/todos/${id}`);
