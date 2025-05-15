import React from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { uploadImageToS3 } from "@/rest/api";
import { notifyError, notifySuccess } from "@/lib/notification";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categories } from "./CourseDashboard";
import { cn } from "@/lib/utils";
import Image from "next/image";

const IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
};

const AddCourseForm = () => {
  const { control, setValue } = useFormContext();
  const [checked, setChecked] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress] = React.useState(0);

  const [imagePreview, setImagePreview] = React.useState<string>("");

  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to S3
      const uploadUrl = await uploadImageToS3(file);

      setValue("thumbnail", uploadUrl);
      setValue("file", file);

      notifySuccess("Thumbnail uploaded successfully!");
    } catch {
      notifyError("Failed to upload image. Please try again.");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setValue("thumbnail", "");
    setValue("file", null);

    setImagePreview("");
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: IMAGE_TYPES,
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5MB max
      disabled: uploading,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          handleUpload(acceptedFiles[0]);
        }
      },
    });

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="courseName"
        rules={{ required: "Course name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Title *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter course title" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(categories).map((term) => (
                  <SelectItem key={term} value={term}>
                    {term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="target"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Audience *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter target audience" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="brief"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brief *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter course brief" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="overview"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Overview</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter course overview"
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Image Upload with Dropzone */}
      <FormField
        control={control}
        name="file"
        rules={{ required: "Course display image is required" }}
        render={() => (
          <FormItem>
            <FormLabel>Course Display Image *</FormLabel>
            <FormControl>
              <div>
                {!imagePreview ? (
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
                        <p className="text-sm text-muted-foreground">
                          Uploading...
                        </p>
                        <Progress
                          value={uploadProgress}
                          className="max-w-xs mx-auto"
                        />
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <p className="font-medium mb-1">
                          {isDragActive
                            ? "Drop the image here..."
                            : "Drag and drop an image here, or click to browse"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Accepted formats: JPG, PNG, GIF, WEBP (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <div className="relative mb-2">
                      <Image
                        height={300}
                        src={imagePreview}
                        alt="Course thumbnail preview"
                        className="w-full max-h-[300px] object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={removeImage}
                        disabled={uploading}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-green-600 text-center">
                      Thumbnail uploaded successfully
                    </p>
                  </div>
                )}

                {fileRejections.length > 0 && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {fileRejections[0].errors[0].code === "file-too-large"
                        ? "File size must be less than 5MB"
                        : "Please upload a valid image file"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <div className="flex items-center space-x-2">
        <Switch
          id="paid-course"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="paid-course">Paid course?</Label>
      </div>

      {checked && (
        <>
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price *</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., USD, EUR, GBP" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default AddCourseForm;
