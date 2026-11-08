import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { authApi } from '@/api/auth';
import { STORAGE_KEYS } from '@/constants/config';
import { User, LoginPayload, RegisterPayload, UserRole } from '@/types/user';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => Promise<User>;
    register: (payload: RegisterPayload) => Promise<User>;
    logout: () => Promise<void>;
    selectedPortalRole: 'lawyer' | 'client';
    setSelectedPortalRole: (role: 'lawyer' | 'client') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPortalRole, setSelectedPortalRole] = useState<'lawyer' | 'client'>('lawyer');

    // Load existing session on app startup
    useEffect(() => {
        const loadSession = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
                const storedUser = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.warn('Failed to restore session:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    const routeUserByRole = (userType: UserRole) => {
        if (userType === 'LAWYER') {
            router.replace('/(lawyer)' as any);
        } else {
            router.replace('/(client)' as any);
        }
    };

    const login = async (payload: LoginPayload): Promise<User> => {
        setIsLoading(true);
        try {
            const res = await authApi.login(payload);
            if (!res.user) {
                throw new Error(res.error || 'Login failed');
            }

            const receivedToken = res.token || 'session_active';
            await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, receivedToken);
            await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(res.user));

            setToken(receivedToken);
            setUser(res.user);

            // Automatically route according to role!
            routeUserByRole(res.user.user_type);
            return res.user;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (payload: RegisterPayload): Promise<User> => {
        setIsLoading(true);
        try {
            const res = await authApi.register(payload);
            if (!res.user) {
                throw new Error(res.error || 'Registration failed');
            }

            const receivedToken = res.token || 'session_active';
            await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, receivedToken);
            await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(res.user));

            setToken(receivedToken);
            setUser(res.user);

            routeUserByRole(res.user.user_type);
            return res.user;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await authApi.logout();
        await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
        await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
        setToken(null);
        setUser(null);
        router.replace('/(auth)' as any);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                selectedPortalRole,
                setSelectedPortalRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};