export interface SentFile {
  file_id: string;
  file_name: string;
  recipient_email: string;
  expiration_date: string;
  created_at: string;
}

export interface SendListResponse {
  status: string;
  files: SentFile[];
  results: number;
}

export interface UploadFormData {
  fileUpload: File[];
  recipient_email: string;
  password: string;
  expiration_date: Date;
}

export interface SendFormData {
  files: File[];
  recipientEmail: string;
  password: string;
  expiryDate: Date;
}

export interface FileState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  recentFiles: SentFile[];
  totalFiles: number;

  // Actions
  uploadFiles: (formData: UploadFormData) => Promise<boolean>;
  getRecentFiles: (page?: number, limit?: number) => Promise<void>;
  clearError: () => void;
  setProgress: (progress: number) => void;
}