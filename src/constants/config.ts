import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Normalizes an API base URL:
 * - Trims whitespace
 * - Strips trailing slashes
 * - Guarantees the path ends with /api
 */
export const normalizeApiUrl = (url: string): string => {
    const cleaned = url.trim().replace(/\/+$/, '');
    if (!cleaned) return '';
    return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
};

/**
 * Automatically detects the backend API URL for this device:
 * 1. Checks EXPO_PUBLIC_API_URL (if provided in .env e.g. for staging or tunneling)
 * 2. In Expo Go on a physical phone, auto-detects host PC IP from Metro bundler hostUri
 *    (Crucial: If Expo is running with --tunnel, the tunnel domain CANNOT be reached on port 3000,
 *     so it falls back to the PC's hotspot/local IP: 172.20.10.2).
 * 3. Fallback for Android emulator (10.0.2.2:3000/api) and iOS Simulator / Web (localhost:3000/api)
 */
export const getDynamicApiUrl = (): string => {
    // 1. Explicit override from .env (e.g., ngrok/localtunnel or staging)
    const envUrl = process.env.EXPO_PUBLIC_API_URL;
    if (envUrl && envUrl.trim().length > 0) {
        return normalizeApiUrl(envUrl);
    }

    // 2. Auto-detect from Expo Go host connection
    const hostUri =
        Constants.expoConfig?.hostUri ||
        (Constants as any).manifest2?.extra?.expoGo?.debuggerHost ||
        (Constants as any).manifest?.debuggerHost;

    if (hostUri) {
        const host = hostUri.split(':')[0];
        const isTunnel = host.includes('expo.app') || host.includes('exp.direct');

        // Only use the host if it is a real IP address and NOT an Expo cloud tunnel domain!
        if (host && !isTunnel && host !== 'localhost' && host !== '127.0.0.1') {
            return `http://${host}:3000/api`;
        }
    }

    // 3. Fallback for physical devices / emulators
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000/api';
    }

    return 'http://localhost:3000/api';

    return 'http://localhost:3000/api';
};

export const API_BASE_URL = getDynamicApiUrl();

if (__DEV__) {
    console.log(`[Judicia Config] Active API Base URL: ${API_BASE_URL}`);
}

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'judicia_auth_token',
    USER_DATA: 'judicia_user_data',
    ONBOARDING_COMPLETED: 'judicia_onboarding_completed',
    CUSTOM_API_URL: 'judicia_custom_api_url',
} as const;

export const APP_CONFIG = {
    appName: 'Judicia',
    tagline: 'LEGAL PRACTICE, CLEARLY MANAGED',
    subTagline: "Built for Sri Lanka's legal community",
    apiTimeoutMs: 15000,
} as const;
