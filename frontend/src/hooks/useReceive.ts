import { useState, useCallback, useEffect } from 'react';
import { useReceiveStore } from '@/store/receiveStore';



export const useReceive = (itemsPerPage: number = 5) => {
  // Pagination states
  const [currentPendingPage, setCurrentPendingPage] = useState<number>(1);
  const [currentReceivedPage, setCurrentReceivedPage] = useState<number>(1);
  const [filePasswordAttempted, setFilePasswordAttempted] = useState<boolean>(false);
  

  const {
    pendingFiles,
    receivedFiles,
    totalPendingFiles,
    totalReceivedFiles,
    isLoadingPending,
    isLoadingReceived,
    isAccepting,
    isDownloading,
    downloadingFileId,
    downloadProgress,
    error,
    
    getPendingFiles,
    acceptFile,
    getReceivedFiles,
    downloadFile,
    resetError,
    setDownloadProgress
  } = useReceiveStore();

  // Load pending files
  const loadPendingFiles = useCallback(async () => {
    try {
      await getPendingFiles(currentPendingPage, itemsPerPage);
    } catch (error) {
      console.error("Failed to load pending files:", error);
    }
  }, [getPendingFiles, currentPendingPage, itemsPerPage]);

  // Load received files
  const loadReceivedFiles = useCallback(async () => {
    try {
      await getReceivedFiles(currentReceivedPage, itemsPerPage);
    } catch (error) {
      console.error("Failed to load received files:", error);
    }
  }, [getReceivedFiles, currentReceivedPage, itemsPerPage]);

  // Load data on initial render and when pagination changes
  useEffect(() => {
    loadPendingFiles();
  }, [loadPendingFiles]);

  useEffect(() => {
    loadReceivedFiles();
  }, [loadReceivedFiles]);

  // Handle file acceptance
  const handleAcceptFile = async (shared_id: string, password: string): Promise<boolean> => {
    setFilePasswordAttempted(true);
    
    if (!password) {
      return false;
    }
    
    try {
      const result = await acceptFile(shared_id, password);
      
      if (result.status === 'success') {
        // Refresh both file lists after successful acceptance
        await loadPendingFiles();
        await loadReceivedFiles();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Accept file failed:", error);
      return false;
    }
  };

  // Handle file download
  const handleDownloadFile = async (shared_id: string, fileName: string): Promise<boolean> => {
    try {
      await downloadFile(shared_id, fileName);
      return true;
    } catch (error) {
      console.error("Download failed:", error);
      return false;
    }
  };

  // Create a progress simulation function for UI feedback
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setDownloadProgress(Math.min(progress, 100));
    }, 300);

    return () => clearInterval(interval);
  };

  // Reset form state
  const resetForm = () => {
    setFilePasswordAttempted(false);
    resetError();
  };

  // Handle pagination for pending files
  const handlePendingPageChange = (page: number) => {
    setCurrentPendingPage(page);
  };

  // Handle pagination for received files
  const handleReceivedPageChange = (page: number) => {
    setCurrentReceivedPage(page);
  };

  // Calculate pagination values
  const totalPendingPages = Math.ceil(totalPendingFiles / itemsPerPage);
  const totalReceivedPages = Math.ceil(totalReceivedFiles / itemsPerPage);
  const pendingStartIndex = (currentPendingPage - 1) * itemsPerPage;
  const receivedStartIndex = (currentReceivedPage - 1) * itemsPerPage;

  return {
    // States
    pendingFiles,
    receivedFiles,
    totalPendingFiles,
    totalReceivedFiles,
    isLoadingPending,
    isLoadingReceived,
    isAccepting,
    isDownloading,
    downloadingFileId, // Add this property
    downloadProgress,
    error,
    filePasswordAttempted,
    
    // Pagination
    currentPendingPage,
    currentReceivedPage,
    totalPendingPages,
    totalReceivedPages,
    pendingStartIndex,
    receivedStartIndex,
    
    // Actions
    handleAcceptFile,
    handleDownloadFile,
    simulateProgress,
    resetForm,
    loadPendingFiles,
    loadReceivedFiles,
    handlePendingPageChange,
    handleReceivedPageChange,
    setDownloadProgress,
    resetError
  };
};