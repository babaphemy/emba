import React from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { LESSONTYPE } from "@/types/types";
import { uploadImageToS3, uploadVideoToS3 } from "@/rest/api";
import { notifyError, notifySuccess } from "@/lib/notification";
import { FileVideo, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type FileUploadProps = {
  lessonIndex: number;
  topicIndex: number;
  lessonType: string;
  currentFile?: string;
};

const VIDEO_TYPES = {
  "video/mp4": [".mp4"],
  "video/mpeg": [".mpeg"],
  "video/quicktime": [".mov"],
  "video/x-msvideo": [".avi"],
  "video/webm": [".webm"],
};

const DOCUMENT_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
};

const FileUploadZone: React.FC<FileUploadProps> = ({
  lessonIndex,
  topicIndex,
  lessonType,
  currentFile,
}) => {
  const { setValue, setError, clearErrors } = useFormContext();
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadedFile, setUploadedFile] = React.useState<string>(
    currentFile || ""
  );

  const acceptedTypes =
    lessonType === LESSONTYPE.video ? VIDEO_TYPES : DOCUMENT_TYPES;

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadFunction =
        lessonType === LESSONTYPE.video ? uploadVideoToS3 : uploadImageToS3;

      const filePath: string = await uploadFunction(file);

      // Set the appropriate field based on lesson type
      const fieldName =
        lessonType === LESSONTYPE.video
          ? `topics.${topicIndex}.lessons.${lessonIndex}.video`
          : `topics.${topicIndex}.lessons.${lessonIndex}.content`;

      setValue(fieldName, filePath);
      setUploadedFile(filePath);
      clearErrors(fieldName);
      notifySuccess(`${lessonType} uploaded successfully!`);
    } catch (error) {
      notifyError(`Failed to upload ${lessonType.toLowerCase()}`);
      setError(`topics.${topicIndex}.lessons.${lessonIndex}.content`, {
        type: "manual",
        message: "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: acceptedTypes,
      maxFiles: 1,
      disabled: uploading,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          handleFileUpload(acceptedFiles[0]);
        }
      },
    });

  const removeFile = () => {
    const fieldName =
      lessonType === LESSONTYPE.video
        ? `topics.${topicIndex}.lessons.${lessonIndex}.video`
        : `topics.${topicIndex}.lessons.${lessonIndex}.content`;

    setValue(fieldName, "");
    setUploadedFile("");
    // TODO: Call API to delete file from S3 if needed
  };

  const IconComponent = lessonType === LESSONTYPE.video ? FileVideo : FileText;

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Upload {lessonType}</h3>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
            "hover:border-primary hover:bg-secondary/10",
            isDragActive && "border-primary bg-secondary/10",
            uploading && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Uploading...</p>
              <Progress value={uploadProgress} className="max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground">
                {uploadProgress}% Complete
              </p>
            </div>
          ) : (
            <>
              <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />

              <p className="font-medium mb-1">
                {isDragActive
                  ? `Drop the ${lessonType.toLowerCase()} here...`
                  : `Drag and drop ${lessonType.toLowerCase()} here, or click to browse`}
              </p>

              <p className="text-sm text-muted-foreground">
                Accepted formats:{" "}
                {Object.values(acceptedTypes).flat().join(", ")}
              </p>
            </>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <IconComponent className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  {uploadedFile.split("/").pop()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lessonType} uploaded successfully
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={removeFile}
              disabled={uploading}
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </CardContent>
        </Card>
      )}

      {fileRejections.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            {fileRejections[0].errors[0].message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploadZone;
