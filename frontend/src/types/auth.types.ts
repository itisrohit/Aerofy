export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
  passwordConfirm: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  verifyAuth: () => Promise<boolean>;
}