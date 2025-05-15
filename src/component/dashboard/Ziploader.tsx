"use client";
import React, { useState } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ZipLoaderProps {
  onUpload?: (file: File) => Promise<void>;
  maxFileSize?: number; // in MB
  accept?: string[];
}

const Ziploader: React.FC<ZipLoaderProps> = ({
  onUpload,
  maxFileSize = 100, // Default 100MB
  accept = [".zip", ".rar", ".7z"],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    setError(null);
    setUploadComplete(false);

    // Validate file type
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!accept.includes(`.${fileExtension}`)) {
      setError(`Only ${accept.join(", ")} files are allowed`);
      return;
    }

    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !onUpload) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate upload progress (replace with actual upload logic)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      await onUpload(file);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
    setUploadComplete(false);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              "hover:border-primary hover:bg-secondary/10",
              isDragging && "border-primary bg-secondary/10"
            )}
          >
            <input
              type="file"
              id="zip-upload"
              className="hidden"
              accept={accept.join(",")}
              onChange={handleFileSelect}
            />
            <label htmlFor="zip-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">
                {isDragging ? "Drop your zip file here" : "Upload ZIP Folder"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Accepted formats: {accept.join(", ")} (Max {maxFileSize}MB)
              </p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            {!uploading && !uploadComplete && (
              <Button
                onClick={handleUpload}
                className="w-full"
                disabled={!onUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            )}

            {uploadComplete && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>File uploaded successfully!</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default Ziploader;
