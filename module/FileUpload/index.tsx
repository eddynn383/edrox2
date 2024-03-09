"use client";

import toast from "react-hot-toast";

import { Label } from "@/components";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import csx from "@/styles/component.module.scss"

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone className={csx["file-upload-dropzone"]}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    )
}