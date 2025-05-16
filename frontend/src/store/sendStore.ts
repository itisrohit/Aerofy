import { create } from "zustand";
import axios from "axios";

interface SentFile {
  file_id: string;
  file_name: string;
  recipient_email: string;
  expiration_date: string;
  created_at: string;
}
interface EmailSearchResponse {
  status: string;
  emails: { email: string }[];
}

interface EmailValidationResult {
  isValid: boolean;
  message?: string;
}

interface SendListResponse {
  status: string;
  files: SentFile[];
  results: number;
}

interface UploadFormData {
  fileUpload: File[];
  recipient_email: string;
  password: string;
  expiration_date: Date;
}

interface FileState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  recentFiles: SentFile[];
  totalFiles: number;

  // Actions
  uploadFiles: (formData: UploadFormData) => Promise<boolean>;
  getRecentFiles: (page?: number, limit?: number) => Promise<void>;
  validateEmail: (email: string) => Promise<EmailValidationResult>;
  clearError: () => void;
  setProgress: (progress: number) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useFileStore = create<FileState>((set, get) => ({
  isUploading: false,
  progress: 0,
  error: null,
  recentFiles: [],
  totalFiles: 0,

  uploadFiles: async (formData) => {
    try {
      set({ isUploading: true, progress: 0, error: null });
      await api.post("/file/upload", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            set({ progress: percentCompleted });
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isUploading: false, progress: 100 });
      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Upload failed",
        isUploading: false,
      });
      return false;
    }
  },

  getRecentFiles: async (page = 1, limit = 5) => {
    try {
      const response = await api.get<SendListResponse>(`/list/send?page=${page}&limit=${limit}`);
      set({
        recentFiles: response.data.files,
        totalFiles: response.data.results
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to load files' });
      throw error;
    }
  },
  validateEmail: async (email) => {
    try {
      const response = await api.get<EmailSearchResponse>(`users/search-emails?query=${email}`);
      if (response.data.emails.length > 0) {
        return { isValid: true };
      } else {
        return { isValid: false, message: "Invalid email address" };
      }
    } catch (error: any) {
      return { isValid: false, message: error.response?.data?.message || "Validation failed" };
    }
  },

  clearError: () => set({ error: null }),
  setProgress: (progress) => set({ progress }),
}));
