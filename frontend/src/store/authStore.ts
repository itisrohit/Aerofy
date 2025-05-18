import {create} from 'zustand';
import {persist, createJSONStorage, PersistOptions} from 'zustand/middleware';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    public_key?: string;
    created_at?: string;
    updated_at?: string;
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
    
    // New methods for profile page
    updateName: (name: string) => Promise<boolean>;
    updatePassword: (oldPassword: string, newPassword: string, newPasswordConfirm: string) => Promise<boolean>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

let authStore: any = null;

// Local logout function that doesn't make API requests
const localLogout = () => {
  // Update the store state directly
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });
  
  // Clear cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  
  // Clear localStorage - use your specific storage key
  localStorage.removeItem('aerofy-auth');
};

// Updated interceptor using local logout
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 && authStore?.getState().isAuthenticated) {
            localLogout();
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
                        localLogout();
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
                            user: userResponse.data.data.user,
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
                
                
                updateName: async (name: string) => {
                    try {
                        set({ loading: true, error: null });
                        await api.put('/users/name', { name });
                        
                        const currentUser = get().user;
                        if (currentUser) {
                            set({ 
                                user: { ...currentUser, name },
                                loading: false
                            });
                        }
                        
                        return true;
                    } catch (error) {
                        set({ 
                            error: (error as any).response?.data?.message || 'Failed to update name',
                            loading: false 
                        });
                        return false;
                    }
                },
                
                updatePassword: async (old_password: string, new_password: string, new_password_confirm: string) => {
                    try {
                        set({ loading: true, error: null });
                        await api.put('/users/password', { 
                            old_password, 
                            new_password, 
                            new_password_confirm 
                        });
                        
                        set({ loading: false });
                        return true;
                    } catch (error) {
                        set({ 
                            error: (error as any).response?.data?.message || 'Failed to update password',
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

