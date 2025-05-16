import { useState, useCallback, useEffect } from 'react';
import { useFileStore } from '@/store/sendStore';

export interface SendFormData {
  files: File[];
  recipientEmail: string;
  password: string;
  expiryDate: Date;
}

export const useSend = (itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState<boolean>(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState<boolean>(false);
  
  const {
    isUploading,
    progress,
    error,
    recentFiles,
    totalFiles,
    uploadFiles,
    getRecentFiles,
    clearError,
    setProgress,
    validateEmail
  } = useFileStore();

  const loadRecentFiles = useCallback(async () => {
    try {
      await getRecentFiles(currentPage, itemsPerPage);
    } catch (error) {
      console.error("Failed to load recent files:", error);
    }
  }, [getRecentFiles, currentPage, itemsPerPage]);

  useEffect(() => {
    loadRecentFiles();
  }, [loadRecentFiles]);

  const handleEmailValidation = async (email: string) => {
    if (!email) {
      return { isValid: false, message: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Invalid email format" };
    }
    setIsValidatingEmail(true);
    try {
      const result = await validateEmail(email);
      setIsValidatingEmail(false);
      return result;
    } catch (error) {
      setIsValidatingEmail(false);
      console.error("Email validation error:", error);
      return { isValid: false, message: "Failed to validate email" };
    }
  };

  const handleSendFiles = async (formData: SendFormData): Promise<boolean> => {
    setFormSubmitAttempted(true);

    if (!formData.recipientEmail || !formData.password || !formData.expiryDate || formData.files.length === 0) {
      return false;
    }

    try {
      // Validate email before sending
      const emailValidation = await handleEmailValidation(formData.recipientEmail);
      if (!emailValidation.isValid) {
        return false;
      }

      // Convert the form data to match what our store expects
      const uploadFormData: Parameters<typeof uploadFiles>[0] = {
        fileUpload: formData.files,
        recipient_email: formData.recipientEmail,
        password: formData.password,
        expiration_date: formData.expiryDate
      };

      const success = await uploadFiles(uploadFormData);
      
      if (success) {
        // Refresh the recent files list after successful upload
        await loadRecentFiles();
      }

      return success;
    } catch (error) {
      console.error("Upload failed:", error);
      return false;
    }
  };

  const resetForm = () => {
    setFormSubmitAttempted(false);
    clearError();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalFiles / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  return {
    // State
    isUploading,
    progress,
    error,
    recentFiles,
    totalFiles,
    currentPage,
    formSubmitAttempted,
    totalPages,
    startIndex,
    isValidatingEmail,
    
    // Actions
    handleSendFiles,
    resetForm,
    loadRecentFiles,
    handlePageChange,
    setProgress,
    clearError,
    validateEmail: handleEmailValidation
  };
};