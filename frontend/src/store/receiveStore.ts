import { create } from 'zustand';
import axios from 'axios';

interface PendingFile {
  file_id: string;
  shared_id: string;
  file_name: string;
  sender_email: string;
  expiration_date: string;
  created_at: string;
}

interface ReceivedFile {
  file_id: string;
  shared_id: string;
  file_name: string;
  sender_email: string;
  expiration_date: string;
  created_at: string;
}


interface FilesResponse {
  status: string;
  files: PendingFile[] | ReceivedFile[];
  results: number;
}

interface AcceptResponse {
  status: string;
  message: string;
}


interface ReceiveState {
  pendingFiles: PendingFile[];
  receivedFiles: ReceivedFile[];
  totalPendingFiles: number;
  totalReceivedFiles: number;
  isLoadingPending: boolean;
  isLoadingReceived: boolean;
  isAccepting: boolean;
  isDownloading: boolean;
  downloadingFileId: string | null; 
  downloadProgress: number;
  error: string | null;
  
  // Actions
  getPendingFiles: (page: number, limit: number) => Promise<void>;
  acceptFile: (shared_id: string, password: string) => Promise<AcceptResponse>;
  getReceivedFiles: (page: number, limit: number) => Promise<void>;
  downloadFile: (shared_id: string, fileName: string) => Promise<void>;
  resetError: () => void;
  setDownloadProgress: (progress: number) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


export const useReceiveStore = create<ReceiveState>((set, get) => ({
  pendingFiles: [],
  receivedFiles: [],
  totalPendingFiles: 0,
  totalReceivedFiles: 0,
  isLoadingPending: false,
  isLoadingReceived: false,
  isAccepting: false,
  isDownloading: false,
  downloadingFileId: null, // Initialize as null
  downloadProgress: 0,
  error: null,
  
  // Get pending files for current user
  getPendingFiles: async (page = 1, limit = 5) => {
    try {
      set({ isLoadingPending: true, error: null });
      const response = await api.get<FilesResponse>(
        `/list/pendingreceive?page=${page}&limit=${limit}`
      );
      
      if (response.data.status === 'success') {
        set({ 
          pendingFiles: response.data.files as PendingFile[],
          totalPendingFiles: response.data.results,
          isLoadingPending: false 
        });
      } else {
        throw new Error('Failed to fetch pending files');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load pending files', 
        isLoadingPending: false 
      });
      throw error;
    }
  },
  

  acceptFile: async (shared_id, password) => {
    try {
      set({ isAccepting: true, error: null });
      const response = await api.post<AcceptResponse>(`/file/accept`, {
        shared_id,
        password
      });
      
      set({ isAccepting: false });
      
      // If successful, update pending files list
      if (response.data.status === 'success') {
        const { pendingFiles } = get();
        set({
          pendingFiles: pendingFiles.filter(file => file.shared_id !== shared_id)
        });
      }
      
      return response.data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to accept file', 
        isAccepting: false 
      });
      throw error;
    }
  },
  

  getReceivedFiles: async (page = 1, limit = 10) => {
    try {
      set({ isLoadingReceived: true, error: null });
      const response = await api.get<FilesResponse>(
        `/list/receive?page=${page}&limit=${limit}`
      );
      
      if (response.data.status === 'success') {
        set({ 
          receivedFiles: response.data.files as ReceivedFile[],
          totalReceivedFiles: response.data.results,
          isLoadingReceived: false 
        });
      } else {
        throw new Error('Failed to fetch received files');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load received files', 
        isLoadingReceived: false 
      });
      throw error;
    }
  },
  
  // Download a file
  downloadFile: async (shared_id, fileName) => {
    try {
      set({ 
        isDownloading: true, 
        downloadingFileId: shared_id, // Set the downloading file ID
        downloadProgress: 0, 
        error: null 
      });
      
      // Create progress tracking
      const onDownloadProgress = (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        set({ downloadProgress: percentCompleted });
      };
      
      const response = await api.post(
        `/file/retrieve`,
        { shared_id },
        { 
          responseType: 'blob',
          onDownloadProgress 
        }
      );
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from content-disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let downloadName = fileName || 'download';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          downloadName = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // On completion
      set({ 
        isDownloading: false, 
        downloadingFileId: null, // Clear the downloading file ID
        downloadProgress: 100 
      });
      
      // Reset progress after a delay
      setTimeout(() => set({ downloadProgress: 0 }), 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to download file', 
        isDownloading: false,
        downloadingFileId: null // Clear the downloading file ID on error too
      });
      throw error;
    }
  },
  
  
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  
  // Reset error state
  resetError: () => set({ error: null })
}));