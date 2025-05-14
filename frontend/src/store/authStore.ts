import {create} from 'zustand';
import {persist, createJSONStorage, PersistOptions} from 'zustand/middleware';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading : boolean;
    error: string | null;

    //Actions
    register: (credentials:{name: string, email: string, password: string, passwordConfirm: string})=> Promise<boolean>;
    login: (credentials:{email: string, password: string}) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    verifyAuth: () => Promise<boolean>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});


let authStore: any = null;


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 && authStore?.getState().isAuthenticated) {
            authStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export const useAuthStore = create(
    persist<AuthState>(
        (set, get) => {
            authStore = { getState: () => useAuthStore.getState() };
            
            return {
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                
                login: async (credentials) => {
                    try {
                        set({ loading: true, error: null });
                        await api.post(`/auth/login`, credentials);
                        return await get().verifyAuth();
                    } catch (error) {
                        set({ 
                            error: (error as any).response?.data?.message || 'Login failed',
                            loading: false 
                        });
                        return false;
                    }
                },
                
                register: async (credentials) => {
                    try {
                        set({ loading: true, error: null });
                        await api.post(`/auth/register`, credentials);
                        return await get().verifyAuth(); 
                    } catch (error) {
                        set({ 
                            error: (error as any).response?.data?.message || 'Registration failed',
                            loading: false 
                        });
                        return false;
                    }
                },
                
                logout: async () => {
                    try {
                        await api.post(`/auth/logout`);
                    } catch (error) {
                        console.error('Logout error:', error);
                    } finally {
                        localStorage.removeItem('aerofy-auth');
                        
                        set({
                            user: null,
                            isAuthenticated: false,
                            loading: false,
                            error: null,
                        });
                    }
                },
                
                clearError: () => {
                    set({ error: null });
                },

                verifyAuth: async () => {
                    try {
                        set({ loading: true });
                        const userResponse = await api.get(`/users/me`);
                        
                        set({
                            user: userResponse.data.user,
                            isAuthenticated: true,
                            loading: false,
                        });
                        return true;
                    } catch (error) {
                        set({ 
                            user: null,
                            isAuthenticated: false,
                            loading: false 
                        });
                        return false;
                    }
                },
            };
        },
        {
            name: 'aerofy-auth',
            storage: createJSONStorage(()=> localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        } as PersistOptions<AuthState>
    )

);

