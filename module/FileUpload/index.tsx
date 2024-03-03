"use client";

import toast from "react-hot-toast";

import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import sx from "@/styles/component.module.scss"
import { Label } from "@/components";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <div className={sx["form-item"]}>
            <Label>Upload Image</Label>
            <UploadDropzone className={sx["upload-file"]}
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    toast.error(`${error?.message}`);
                }}
            />
        </div>
    )
}