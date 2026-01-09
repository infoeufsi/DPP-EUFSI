'use client';

/**
 * Simple auth store using localStorage
 * In a real app, this would use cookies or a more secure state manager
 */
export const authStore = {
    setToken: (token: string) => localStorage.setItem('eufsi_token', token),
    getToken: () => typeof window !== 'undefined' ? localStorage.getItem('eufsi_token') : null,
    clearToken: () => localStorage.removeItem('eufsi_token'),
    setUser: (user: any) => localStorage.setItem('eufsi_user', JSON.stringify(user)),
    getUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem('eufsi_user');
        return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => !!(typeof window !== 'undefined' && localStorage.getItem('eufsi_token'))
};
