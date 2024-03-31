"use client";

import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Button, Cover, Progress } from "@/components";
import { deleteFileUpload } from "@/actions/upload-file";
import { Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import csx from "@/styles/component.module.scss"
import { formatFileSize } from "@/lib/utils";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};
  

export const Dropzone = ({ onChange, endpoint }: FileUploadProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [uploadComplete, setUploadComplete] = useState<boolean>(false)
    const [fileUrl, setFileUrl] = useState("")
    const [fileKey, setFileKey] = useState("")
    const [uploadedFiles, setUploadFiles] = useState<any>()


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    // onClientUploadComplete={(res) => {
    //     onChange(res?.[0].url);
    // }}

    const { startUpload, isUploading, permittedFileInfo } = useUploadThing(endpoint, {

            onClientUploadComplete: (res) => {
                onChange(res?.[0].url);
                setFileUrl(res?.[0].url)
                setFileKey(res?.[0].key)
                setUploadFiles(res)
                setUploadComplete(true)
                setUploadProgress(0)
                console.log("res: ", res)
                console.log("files: ", files)
                console.log("fileKey: ", fileKey)
                // toast.success("uploaded successfully!", { position: "bottom-center" });
            },
            onUploadError: (error: Error) => {
                toast.error(`${error?.message}`, { position: "bottom-center" });
            },
            onUploadBegin: () => {
                // alert("upload has begun");
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

    const deleteFileHandler = (e: any, key: string) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("its clicked!")
        deleteFileUpload(key);
    }

    return (
        <div className={csx["dropzone"]} {...getRootProps()}>
            <input 
                {...getInputProps()} 
                // onChange={(e) => {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     if (!files) return;
                //     void startUpload(files);
                // }}
            />
            <div className={csx["dropzone-icon"]}>
                <Upload />
            </div>
            <div className={csx["dropzone-message"]}>
                Drop your image here, or <span>browse</span>
            </div>
            <div className={csx["dropzone-support"]}>
                {/* {fileTypes && fileTypes} */}
                Supports PNG, JPG, JPEG, WEBP
            </div>
            {(files.length > 0 && !uploadComplete) && (
                <div>
                    <Button variant="accent" size="S" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!files) return;
            
                            void startUpload(files);
                        }
                    }>
                        Upload {files.length} files
                    </Button>
                    {/* Upload {files.length} files */}
                </div>
            )}
            {
                (fileUrl && uploadComplete) && (
                    uploadedFiles.map((item: any) => {
                        console.log("files item: ", item)   
                        return (
                        <div key={item.key} className={csx["dropzone-preview-file"]}>        
                            <div className={csx["dropzone-preview-file-left"]}>
                                <Cover src={item.url} alt={item.name} width={100} height={50}/>
                            </div>
                            <div className={csx["dropzone-preview-file-right"]}>
                                <h4 className={csx["dropzone-preview-file-name"]}>{item.name}</h4>
                                <span>{formatFileSize(item.size)}</span>
                                <Button variant="accent" status="fail" size="S" content="icon" onClick={(e) => deleteFileHandler(e, item.key)}><Trash2 /></Button>
                            </div>
                        </div>
                    )})
                )
            }
            {
                (uploadProgress > 0 && !uploadComplete) &&
                <div className={csx["dropzone-progress"]}>
                    <Progress value={uploadProgress} style={{ "height": "4px" }} data-status={"success"} />
                </div>
            }
        </div>
    );

    // return (
    //     <UploadDropzone className={csx["file-upload-dropzone"]}
    //         endpoint={endpoint}
    //         onClientUploadComplete={(res) => {
    //             onChange(res?.[0].url);
    //         }}
    //         onUploadError={(error: Error) => {
    //             toast.error(`${error?.message}`);
    //         }}
    //     />
    // )
}