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

// Interceptor: Dynamically check custom API URL and attach Bearer token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const customUrl = await SecureStore.getItemAsync(STORAGE_KEYS.CUSTOM_API_URL);
            if (customUrl && customUrl.trim().length > 0) {
                config.baseURL = customUrl.trim();
            }
            const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn('Failed in request interceptor:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: Handle errors cleanly
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const activeUrl = error.config?.baseURL || API_BASE_URL;
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
        const isNetworkErr = !error.response || error.code === 'ERR_NETWORK' || isTimeout;

        if (__DEV__ && isNetworkErr) {
            console.warn(
                `[API Network Error] Could not reach ${activeUrl}. (${error.message})`
            );
        }

        let message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'Network request failed';

        if (isTimeout) {
            message = `Connection timed out (15s). Could not connect to ${activeUrl}.\nPlease verify your PC backend is running ('npm run dev') and reachable.`;
        } else if (!error.response) {
            message = `Cannot reach backend at ${activeUrl}.\nEnsure Next.js is running and port 3000 is accessible.`;
        }

        return Promise.reject(new Error(message));
    }
);
