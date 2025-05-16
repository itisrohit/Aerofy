import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const store = useAuthStore();
    const router = useRouter();
    
    const {user, isAuthenticated, loading, error } = store;

    useEffect(() => {
        if (isAuthenticated) {
            store.verifyAuth();
        }
    }, [isAuthenticated]);

    const requireAuth = useCallback((redirectPath = '/auth')=> {
        if (!isAuthenticated && !loading) {
            router.push(redirectPath);
            return false;
        }
        return true;
    }, [isAuthenticated, loading, router]);

    const redirectIfAuthenticated = useCallback((redirectPath = '/send') => {
        if (isAuthenticated && !loading) {
            router.replace(redirectPath)
            return false;
        }
        return true;
    }, [isAuthenticated, loading, router]);
    
    const login = async (credentials:{email: string, password: string}, redirectPath = '/send') => {
        try {
            const success = await store.login(credentials);
            if ( success &&  store.isAuthenticated) {
                router.replace(redirectPath);
            }
            return success;
        } catch (error) {
            // console.error("Login failed", error);
            return false
        }
    };
    const register = async (credentials:{name: string, email: string, password: string, passwordConfirm: string}, redirectPath = '/send') => {
        try {
            const success = await store.register(credentials);
            if (success && store.isAuthenticated){
                router.replace(redirectPath);
            }
            return success;
        }catch (error) {
            // console.error("Registration failed", error);
            return false
        }
    };

    const logout = async (redirectPath='/auth') => {
        store.logout();
        router.replace(redirectPath);
    };

    return {
    // Auth state
    user,
    isAuthenticated,
    loading,
    error,
    
    // Auth operations with navigation
    login,
    register,
    logout,
    clearError: store.clearError,
    
    // Protection helpers
    requireAuth,
    redirectIfAuthenticated,

    // Additional operations
    verifyAuth: store.verifyAuth,
    
    // Profile operations
    updateName: store.updateName,
    updatePassword: store.updatePassword,
  };
};
