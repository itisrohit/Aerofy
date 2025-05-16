"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  File,
  FileText,
  UploadCloud,
  X,
  Check,
  Loader2,
  Share2,
  Calendar,
  Mail,
  Lock,
} from "lucide-react";
// Add import for custom toast functions
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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useSend, SendFormData } from "@/hooks/useSend";

const ITEMS_PER_PAGE = 5;

export default function SendPage() {
  const {
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
    handleSendFiles,
    resetForm,
    handlePageChange,
    validateEmail
  } = useSend(ITEMS_PER_PAGE);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [filePassword, setFilePassword] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [emailValidationResult, setEmailValidationResult] = useState<{isValid: boolean, message?: string} | null>(null);
  const [isValidatingEmailUI, setIsValidatingEmailUI] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Email validation on blur
  const handleEmailBlur = async () => {
    if (recipientEmail) {
      setIsValidatingEmailUI(true);
      const result = await validateEmail(recipientEmail);
      setEmailValidationResult(result);
      setIsValidatingEmailUI(false);
    } else {
      setEmailValidationResult(null);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setExpiryDate(date);
    setCalendarOpen(false);
  };

  const handleSend = async () => {
    const formData: SendFormData = {
      files,
      recipientEmail,
      password: filePassword,
      expiryDate: expiryDate as Date,
    };

    const success = await handleSendFiles(formData);

    if (success) {
      setShowShareDialog(false);
      toastSuccess(`Files shared with ${recipientEmail}`);
      
      // Reset form state
      setFiles([]);
      setRecipientEmail("");
      setFilePassword("");
      setExpiryDate(undefined);
      setEmailValidationResult(null);
    } else if (error) {
      toastError("Upload Failed", {
        description: error || "There was an error uploading your files"
      });
    }
  };

  const resetFormState = () => {
    resetForm();
    setEmailValidationResult(null);
  };

  const getFileTypeIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
      case "doc":
      case "docx":
        return <FileText size={16} />;
      default:
        return <File size={16} />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  return (
    <div className="container mx-auto p-4 space-y-6 w-full">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Send Files
              </h1>
              <p className="text-blue-100 max-w-lg">
                Securely share your files with anyone using password protection and expiration dates
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white/10 p-4 rounded-full backdrop-blur-sm">
              <UploadCloud className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Lock className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Password Protected</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Calendar className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Set Expiration</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
              <Mail className="h-4 w-4 text-blue-100 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm text-blue-100">Email Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Drag and drop your files or browse to upload
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">
              Drag and drop files here
            </h3>
            <p className="mt-2 text-sm text-gray-500">or</p>
            <div className="mt-4">
              <label htmlFor="file-upload">
                <Button asChild disabled={isUploading}>
                  <span>Browse Files</span>
                </Button>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Supported file types: PDF, DOC, DOCX, JPG, PNG, etc.
            </p>
          </div>

          {/* Selected files */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Selected Files</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded mr-3">
                        {getFileTypeIcon(file.name)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Sending...</span>
                <span className="text-sm">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        {files.length > 0 && (
          <CardFooter className="flex justify-end">
            <Button onClick={() => setShowShareDialog(true)} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" /> Share File
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Share Dialog */}
      <Dialog 
        open={showShareDialog} 
        onOpenChange={(open) => {
          if (!open) {
            resetFormState();
          }
          setShowShareDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
          <DialogHeader>
            <DialogTitle>Share Files</DialogTitle>
            <DialogDescription>
              Enter recipient details to share your files securely.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="col-span-3">
                <div className="relative">
                  <Input
                    id="recipient"
                    placeholder="Recipient email *"
                    className={`w-full ${
                      formSubmitAttempted && !recipientEmail 
                        ? "border-red-300 focus:border-red-300" 
                        : emailValidationResult && !emailValidationResult.isValid
                        ? "border-red-300 focus:border-red-300"
                        : emailValidationResult && emailValidationResult.isValid
                        ? "border-green-300 focus:border-green-300"
                        : ""
                    }`}
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    required
                  />
                  {isValidatingEmailUI && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  {!isValidatingEmailUI && emailValidationResult && emailValidationResult.isValid && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                  {!isValidatingEmailUI && emailValidationResult && !emailValidationResult.isValid && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <X className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
                {formSubmitAttempted && !recipientEmail ? (
                  <p className="text-xs text-red-500 mt-1">Email is required</p>
                ) : emailValidationResult && !emailValidationResult.isValid ? (
                  <p className="text-xs text-red-500 mt-1">{emailValidationResult.message}</p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <div className="col-span-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password *"
                  className={`w-full ${formSubmitAttempted && !filePassword ? "border-red-300" : ""}`}
                  value={filePassword}
                  onChange={(e) => setFilePassword(e.target.value)}
                  required
                />
                {formSubmitAttempted && !filePassword && (
                  <p className="text-xs text-red-500 mt-1">Password is required</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="col-span-3">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        formSubmitAttempted && !expiryDate ? "border-red-300" : ""
                      }`}
                    >
                      {expiryDate ? format(expiryDate, "PPP") : "Set expiration date *"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={expiryDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {formSubmitAttempted && !expiryDate && (
                  <p className="text-xs text-red-500 mt-1">Expiration date is required</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                resetFormState();  // Reset before closing dialog
                setShowShareDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={isUploading || isValidatingEmail}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send File"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recent Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Sent Files</CardTitle>
          <CardDescription>View your file transfer history</CardDescription>
        </CardHeader>
        <CardContent>
          {isUploading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentFiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentFiles.map((file) => (
                  <TableRow key={file.file_id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="p-2 bg-muted rounded mr-3">
                          {getFileTypeIcon(file.file_name)}
                        </div>
                        <span>{file.file_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {file.recipient_email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(file.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(file.expiration_date) > new Date() ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {new Date(file.expiration_date).toLocaleDateString()}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          Expired
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No files have been sent yet
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
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
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
