import { apiClient } from './client';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/user';

export const authApi = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', payload);
        return response.data;
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', payload);
        return response.data;
    },

    getMe: async (): Promise<User | null> => {
        try {
            const response = await apiClient.get<{ success: boolean; user: User }>('/auth/me');
            return response.data.user || null;
        } catch {
            return null;
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout');
        } catch {
            // Continue even if server logout fails
        }
    },
};