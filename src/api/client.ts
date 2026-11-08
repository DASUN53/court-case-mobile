import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, STORAGE_KEYS, APP_CONFIG } from '@/constants/config';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: APP_CONFIG.apiTimeoutMs,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptor: Automatically attaches Bearer token from secure storage
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn('Failed to retrieve auth token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: Handle errors cleanly
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'Network request failed';
        return Promise.reject(new Error(message));
    }
);