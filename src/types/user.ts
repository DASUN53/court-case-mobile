export type UserRole = 'LAWYER' | 'CLIENT' | 'ADMIN' | 'STAFF';

export interface User {
    id: string;
    email: string;
    full_name: string;
    user_type: UserRole;
    law_firm_id: string | null;
    is_root_user: boolean;
    avatar_url?: string | null;
    roles?: string[];
    permissions?: string[];
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    error?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    role: 'lawyer' | 'client';
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    firmName?: string;
    barNumber?: string;
    referralCode?: string;
}