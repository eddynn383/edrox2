"use client";

import { useCallback, useRef, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Button, Cover, Progress } from "@/components";
import { deleteFileUpload } from "@/actions/upload-file";
import { Trash2, Upload, UploadIcon } from "lucide-react";
import toast from "react-hot-toast";
import csx from "@/styles/component.module.scss"
import { formatFileSize } from "@/lib/utils";

interface UploadImageProps {
    currentImage?: string;
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};
  

export const UploadImage = ({ currentImage, onChange, endpoint }: UploadImageProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [uploadComplete, setUploadComplete] = useState<boolean>(false)
    const [fileUrl, setFileUrl] = useState("")
    const [fileKey, setFileKey] = useState("")
    const [uploadedFiles, setUploadFiles] = useState<any>()

    const labelRef = useRef<HTMLLabelElement>(null);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, isUploading, permittedFileInfo } = useUploadThing(endpoint, {

            onClientUploadComplete: (res) => {
                onChange(res?.[0].url);
                setFileUrl(res?.[0].url)
                setFileKey(res?.[0].key)
                setUploadFiles(res)
                setUploadComplete(true)
                setUploadProgress(0)
            },
            onUploadError: (error: Error) => {
                toast.error(`${error?.message}`, { position: "bottom-center" });
            },
            onUploadBegin: () => {
                console.log("Upload gas begun")
            },
            onUploadProgress: (p: number) => {
                setUploadProgress(p)
                console.log(`Upload progress is on: ${uploadProgress}`)
            },  
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div className={csx["upload-image"]} {...getRootProps()}>
            <Cover src={currentImage} alt="cover-image" width={400} height={200} style={{"width": "280px"}} />
            {
                uploadProgress === 0 &&
                <label className={csx["upload-image-label"]} ref={labelRef} >
                    <input 
                        {...getInputProps()} 
                        className="sr-only"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (!e.target.files) return;
                            const selectedFiles = Array.from(e.target.files);
                            void startUpload(selectedFiles);
                        }}
                    />
                    <Button variant="accent" size="S" type="button"><UploadIcon /> <span>Choose Image</span></Button>
                </label>
            }
            {
                (uploadProgress > 0 && !uploadComplete) &&
                <div className={csx["upload-image-progress"]}>
                    <Progress value={uploadProgress} style={{ "width": "100%", "height": "2px" }} data-status={"success"} />
                </div>
            }
        </div>
    );
}