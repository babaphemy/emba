"use client";
import Ziploader from "@/component/dashboard/Ziploader";
import React from "react";

const UploadPage = () => {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("zipFile", file);

    const response = await fetch("/api/upload-zip", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }
    const data = await response.json();
    console.log("Upload successful:", data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload ZIP Folder</h1>
      <Ziploader
        onUpload={handleUpload}
        maxFileSize={50} // 50MB limit
        accept={[".zip"]} // Only accept .zip files
      />
    </div>
  );
};

export default UploadPage;
