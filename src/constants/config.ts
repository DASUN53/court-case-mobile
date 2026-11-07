import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Automatically detects your PC's IP address when Expo Go connects.
 * You don't need to manually configure your IPv4 address in .env!
 */
const getDynamicApiUrl = (): string => {
    // 1. If explicitly set in .env, use that
    if (process.env.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // 2. Auto-detect from Expo Go's connection to your PC
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
        const pcIp = hostUri.split(':')[0]; // Extracts computer IP dynamically
        return `http://${pcIp}:3000/api`;
    }

    // 3. Fallback for emulator / web
    return Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';
};

export const API_BASE_URL = getDynamicApiUrl();

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'judicia_auth_token',
    USER_DATA: 'judicia_user_data',
    ONBOARDING_COMPLETED: 'judicia_onboarding_completed',
} as const;

export const APP_CONFIG = {
    appName: 'Judicia',
    tagline: 'LEGAL PRACTICE, CLEARLY MANAGED',
    subTagline: "Built for Sri Lanka's legal community",
    apiTimeoutMs: 15000,
} as const;