"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  File,
  FileText,
  Download,
  Loader2,
  Calendar,
  Lock,
  Mail,
  Check,
  Shield,
} from "lucide-react";
import { toastSuccess, toastError } from "@/utility/toastStyle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// Remove Toaster import since it should only be in the root layout
// import { Toaster } from "@/components/ui/sonner";
// Keep toast import if needed for other functionality
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 5;

// API service for file operations - replace with your actual API calls
const fileService = {
  accessFile: async (accessCode: string, password: string): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (accessCode && password) {
        return { 
          success: true, 
          message: "File access granted",
          file: {
            id: 123,
            name: "shared-document.pdf",
            size: "3.2 MB",
            expiresOn: "2023-12-31",
            downloadUrl: "#"
          }
        };
      } else {
        throw new Error("Invalid access code or password");
      }
    } catch (error) {
      console.error("File access failed:", error);
      throw new Error("Failed to access file");
    }
  },

  getRecentFiles: async (
    page: number = 1,
    limit: number = ITEMS_PER_PAGE
  ): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockFiles = [
        {
          id: 1,
          name: "received-presentation.pdf",
          size: "2.4 MB",
          date: "2023-06-12",
          status: "available",
          from: "alex@example.com"
        },
        {
          id: 2,
          name: "shared-document.docx",
          size: "1.8 MB",
          date: "2023-06-10",
          status: "available",
          from: "taylor@example.com"
        },
        {
          id: 3,
          name: "project-image.jpg",
          size: "4.2 MB",
          date: "2023-06-08",
          status: "expired",
          from: "jordan@example.com"
        },
        {
          id: 4,
          name: "budget.xlsx",
          size: "3.1 MB",
          date: "2023-06-05",
          status: "available",
          from: "casey@example.com"
        },
        {
          id: 5,
          name: "contract.pdf",
          size: "5.7 MB",
          date: "2023-06-01",
          status: "available",
          from: "morgan@example.com"
        },
        {
          id: 6,
          name: "meeting-notes.txt",
          size: "0.2 MB",
          date: "2023-05-28",
          status: "expired",
          from: "robin@example.com"
        },
      ];

      const startIndex = (page - 1) * limit;
      const paginatedFiles = mockFiles.slice(startIndex, startIndex + limit);

      return {
        files: paginatedFiles,
        total: mockFiles.length,
        page,
        limit,
      };
    } catch (error) {
      console.error("Failed to fetch recent files:", error);
      throw new Error("Failed to load recent files");
    }
  },

  getPendingFiles: async (): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockPendingFiles = [
        {
          id: 10,
          name: "confidential-report.pdf",
          size: "4.7 MB",
          sharedDate: "2023-06-15",
          from: "director@example.com",
          accessCode: "ABC123"
        },
        {
          id: 11,
          name: "project-proposal.docx",
          size: "2.1 MB",
          sharedDate: "2023-06-14",
          from: "partner@example.com", 
          accessCode: "XYZ789"
        }
      ];

      return mockPendingFiles;
    } catch (error) {
      console.error("Failed to fetch pending files:", error);
      throw new Error("Failed to load pending files");
    }
  },

  acceptFile: async (fileId: number, accessCode: string, password: string): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: "File accepted successfully",
        file: {
          id: fileId,
          name: "confidential-report.pdf",
          size: "4.7 MB",
          expiresOn: "2023-12-31",
          downloadUrl: "#"
        }
      };
    } catch (error) {
      console.error("Failed to accept file:", error);
      throw new Error("Failed to accept file");
    }
  },
};

export default function ReceivePage() {
  const [accessCode, setAccessCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [pendingFiles, setPendingFiles] = useState<any[]>([]);
  const [loadingPending, setLoadingPending] = useState<boolean>(false);
  const [selectedPendingFile, setSelectedPendingFile] = useState<any>(null);
  const [acceptPassword, setAcceptPassword] = useState<string>("");
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false);

  const totalPages = Math.ceil(totalFiles / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const loadRecentFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fileService.getRecentFiles(currentPage);
      setRecentFiles(response.files);
      setTotalFiles(response.total);
    } catch (error) {
      toastError("Failed to load recent files");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const loadPendingFiles = useCallback(async () => {
    try {
      setLoadingPending(true);
      const pendingFiles = await fileService.getPendingFiles();
      setPendingFiles(pendingFiles);
    } catch (error) {
      toastError("Failed to load pending files");
    } finally {
      setLoadingPending(false);
    }
  }, []);

  useEffect(() => {
    loadRecentFiles();
    loadPendingFiles();
  }, [loadRecentFiles, loadPendingFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim() || !password.trim()) {
      toastError("Please enter both access code and password");
      return;
    }

    try {
      setIsVerifying(true);
      const result = await fileService.accessFile(accessCode, password);
      setCurrentFile(result.file);
      toastSuccess("File access granted");
      setAccessCode("");
      setPassword("");
    } catch (error) {
      toastError("Access denied", {
        description: "Invalid access code or password",
      });
    } finally {
      setIsVerifying(false);
    }
  };

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

  const handleDownload = async (fileId: number) => {
    const file = recentFiles.find(f => f.id === fileId);
    if (!file) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    const stopProgress = simulateProgress();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      stopProgress();
      setDownloadProgress(100);
      toastSuccess("File downloaded successfully");
    } catch (error) {
      toastError("Download failed", {
        description: "There was an error downloading your file",
      });
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 500);
    }
  };

  const handleAcceptFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPendingFile || !acceptPassword) {
      toastError("Please enter password");
      return;
    }

    try {
      setIsAccepting(true);
      await fileService.acceptFile(
        selectedPendingFile.id, 
        selectedPendingFile.accessCode, 
        acceptPassword
      );
      setPendingFiles(prev => 
        prev.filter(file => file.id !== selectedPendingFile.id)
      );
      await loadRecentFiles();
      toastSuccess("File accepted successfully");
      setShowAcceptDialog(false);
      setAcceptPassword("");
    } catch (error) {
      toastError("Could not accept file", {
        description: "Invalid password"
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const openAcceptDialog = (file: any) => {
    setSelectedPendingFile(file);
    setShowAcceptDialog(true);
  };

  const getFileTypeIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return <FileText size={16} />;
      case "doc":
      case "docx":
        return <FileText size={16} />;
      default:
        return <File size={16} />;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 w-full">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Receive Files
              </h1>
              <p className="text-blue-100 max-w-lg">
                Access and download files that have been shared with you securely
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white/10 p-4 rounded-full backdrop-blur-sm">
              <Download className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Lock className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Password Protected</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Calendar className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Limited Time Access</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Mail className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Email Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Files Section */}
      {pendingFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Files</CardTitle>
            <CardDescription>
              Files shared with you that need to be accepted
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingPending ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date Shared</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="p-2 bg-amber-50 rounded mr-2">
                            <Shield size={16} className="text-amber-600" />
                          </div>
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell>{file.from}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.sharedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAcceptDialog(file)}
                        >
                          Accept
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {/* Accept File Dialog */}
      <Dialog 
        open={showAcceptDialog} 
        onOpenChange={(open) => {
          if (!open) {
            setAcceptPassword("");
          }
          setShowAcceptDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
          <DialogHeader>
            <DialogTitle>Accept Shared File</DialogTitle>
            <DialogDescription>
              Enter the password to access {selectedPendingFile?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAcceptFile}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <Input
                    id="accept-password"
                    type="password"
                    placeholder="Password"
                    value={acceptPassword}
                    onChange={(e) => setAcceptPassword(e.target.value)}
                    className="w-full"
                    required
                    disabled={isAccepting}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAcceptDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isAccepting}>
                {isAccepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accepting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Accept File
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Recent Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Received Files</CardTitle>
          <CardDescription>Access your previously received files</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentFiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/5 rounded mr-2">
                          {getFileTypeIcon(file.name)}
                        </div>
                        {file.name}
                      </div>
                    </TableCell>
                    <TableCell>{file.from}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={file.status === "available" ? "outline" : "secondary"}
                        className={
                          file.status === "available"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-500"
                        }
                      >
                        {file.status === "available" ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : null}
                        {file.status === "available" ? "Available" : "Expired"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (file.status === "available") {
                            handleDownload(file.id);
                          } else {
                            toastError("This file has expired and is no longer available");
                          }
                        }}
                        disabled={file.status !== "available" || isDownloading}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No files have been received yet
            </div>
          )}
        </CardContent>
        {recentFiles.length > 0 && (
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, totalFiles)} of{" "}
              {totalFiles} files
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}