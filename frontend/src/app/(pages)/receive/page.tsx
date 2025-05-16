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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReceive } from "@/hooks/useReceive";
import { formatDistanceToNow } from "date-fns";

const ITEMS_PER_PAGE = 5;

export default function ReceivePage() {
  const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false);
  const [selectedPendingFile, setSelectedPendingFile] = useState<any>(null);
  const [acceptPassword, setAcceptPassword] = useState<string>("");

  const {
    // States
    pendingFiles,
    receivedFiles,
    isLoadingPending,
    isLoadingReceived,
    isAccepting,
    isDownloading,
    downloadingFileId, // Add this property
    downloadProgress,
    error,
    
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
    handlePendingPageChange,
    handleReceivedPageChange,
  } = useReceive(ITEMS_PER_PAGE);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPendingFile || !acceptPassword) {
      toastError("Please enter password");
      return;
    }

    try {
      const success = await handleAcceptFile(selectedPendingFile.shared_id, acceptPassword);
      
      if (success) {
        toastSuccess("File accepted successfully");
        setShowAcceptDialog(false);
        setAcceptPassword("");
      } else {
        toastError("Could not accept file", {
          description: "Invalid password"
        });
      }
    } catch (error) {
      toastError("Could not accept file", {
        description: "An error occurred while accepting the file"
      });
    }
  };

  const openAcceptDialog = (file: any) => {
    setSelectedPendingFile(file);
    setShowAcceptDialog(true);
  };

  const handleDownloadClick = async (shared_id: string, fileName: string) => {
    try {
      const success = await handleDownloadFile(shared_id, fileName);
      if (success) {
        toastSuccess("File downloaded successfully");
      }
    } catch (error) {
      toastError("Download failed", {
        description: "There was an error downloading your file",
      });
    }
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

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
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
      <Card>
        <CardHeader>
          <CardTitle>Pending Files</CardTitle>
          <CardDescription>
            Files shared with you that need to be accepted
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingPending ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : pendingFiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Date Shared</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingFiles.map((file) => (
                  <TableRow key={file.file_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="p-2 bg-amber-50 rounded mr-2">
                          <Shield size={16} className="text-amber-600" />
                        </div>
                        {file.file_name || "Unnamed file"}
                      </div>
                    </TableCell>
                    <TableCell>{file.sender_email}</TableCell>
                    <TableCell>{formatDate(file.created_at)}</TableCell>
                    <TableCell>{formatDate(file.expiration_date)}</TableCell>
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No pending files to accept
            </div>
          )}
        </CardContent>
        {pendingFiles.length > 0 && totalPendingPages > 1 && (
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {pendingStartIndex + 1} to{" "}
              {Math.min(pendingStartIndex + ITEMS_PER_PAGE, pendingFiles.length)} of{" "}
              {pendingFiles.length} files
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePendingPageChange(Math.max(currentPendingPage - 1, 1))}
                    className={currentPendingPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPendingPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPendingPage}
                        onClick={() => handlePendingPageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePendingPageChange(Math.min(currentPendingPage + 1, totalPendingPages))}
                    className={currentPendingPage === totalPendingPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>

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
        <DialogContent className="sm:max-w-[425px]" hideCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Accept Shared File</DialogTitle>
            <DialogDescription>
              Enter the password to access {selectedPendingFile?.file_name || "this file"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAccept}>
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

      {/* Received Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Received Files</CardTitle>
          <CardDescription>Access your previously received files</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingReceived ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : receivedFiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Date Received</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivedFiles.map((file) => (
                  <TableRow key={file.file_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/5 rounded mr-2">
                          {getFileTypeIcon(file.file_name || "file")}
                        </div>
                        {file.file_name || "Unnamed file"}
                      </div>
                    </TableCell>
                    <TableCell>{file.sender_email}</TableCell>
                    <TableCell>{formatDate(file.created_at)}</TableCell>
                    <TableCell>{formatDate(file.expiration_date)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadClick(file.shared_id, file.file_name)}
                        disabled={isDownloading && downloadingFileId === file.shared_id}
                      >
                        {isDownloading && downloadingFileId === file.shared_id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
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
        {receivedFiles.length > 0 && totalReceivedPages > 1 && (
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {receivedStartIndex + 1} to{" "}
              {Math.min(receivedStartIndex + ITEMS_PER_PAGE, receivedFiles.length)} of{" "}
              {receivedFiles.length} files
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handleReceivedPageChange(Math.max(currentReceivedPage - 1, 1))}
                    className={
                      currentReceivedPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalReceivedPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentReceivedPage}
                        onClick={() => handleReceivedPageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => 
                      handleReceivedPageChange(Math.min(currentReceivedPage + 1, totalReceivedPages))
                    }
                    className={
                      currentReceivedPage === totalReceivedPages
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