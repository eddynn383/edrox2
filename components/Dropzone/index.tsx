"use client";

import { Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button, Cover, Progress, Text } from "@/components";
import { formatFileSize } from "@/lib/utils";
import { deleteFileUpload } from "@/actions/upload-file";
import { editCourseById } from "@/data/courses";
import { FileUploadProps } from "./interface";

import dropzone from "./dropzone.module.css";
import { getImageById } from "@/data/image";
import { getImage } from "@/actions/image";



export const Dropzone = ({ onChange, endpoint, currentImage }: FileUploadProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [uploadComplete, setUploadComplete] = useState<boolean>(false)
    const [uploadedFiles, setUploadFiles] = useState<any>()

    useEffect(() => {
        if (currentImage) {

            getImage(currentImage).then((data) => {
                console.log("CURRENT IMAGE (DROPZONE): ", data)
                setUploadFiles([data])
                setUploadComplete(true)
            })


        }
    }, [currentImage]);


    console.log("uploadedFiles (DROPZONE): ", uploadedFiles)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, routeConfig } = useUploadThing(endpoint, {

        onClientUploadComplete: (res) => {

            console.log("RESSSSS: ", res)

            onChange({
                name: res?.[0].name,
                url: res?.[0].url,
                key: res?.[0].key,
                type: res?.[0].type,
                size: res?.[0].size
            });
            setUploadFiles(res)
            setUploadComplete(true)
            setUploadProgress(0)
        },

        onUploadError: (error: Error) => {
            toast.error(`${error?.message}`, { position: "bottom-center" });
        },
        onUploadProgress: (p: number) => {
            setUploadProgress(p)
        },
    });

    const fileType = Object.keys(routeConfig || {})

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(Object.keys(routeConfig || {})),
    });

    const deleteFileHandler = async (e: any, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteFileUpload(key);
    }

    return (
        <div className={dropzone.container} {...getRootProps()}>

            {(!uploadedFiles && !uploadComplete) && (
                <>
                    <input {...getInputProps()} />
                    <div className={dropzone.inner}>
                        <div className={dropzone.icon}>
                            <Upload />
                        </div>
                        <div className={dropzone.message}>
                            Drop your image here, or <span>browse</span>
                        </div>
                        <div className={dropzone.support}>Supports PNG, JPG, JPEG, WEBP</div>
                        {(files.length > 0 && !uploadComplete) && (
                            <Button
                                variant="accent"
                                size="S"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!files) return;
                                    startUpload(files);

                                }}
                            >
                                Upload {files.length} files
                            </Button>
                        )}
                    </div>
                </>
            )}
            {(uploadedFiles?.length === 1 && uploadComplete) && (
                <div className={dropzone["preview-file"]}>
                    <div className={dropzone["preview-file-top"]}>
                        {uploadedFiles[0].type.includes("image") && <Cover src={uploadedFiles[0].url} alt="Uploaded Image" width={400} height={224} />}
                        {
                            uploadedFiles[0].type.includes("pdf") && <iframe src={uploadedFiles[0].url} />
                        }
                    </div>
                    <div className={dropzone["preview-file-bottom"]}>
                        <Text className={dropzone["preview-file-name"]}>{uploadedFiles[0]?.name.split(".")[0]}</Text>
                        <Text className={dropzone["preview-file-size"]}>
                            {formatFileSize(uploadedFiles[0]?.size)} • {uploadedFiles[0]?.name.split(".")[1]}
                        </Text>
                        <div className={dropzone["preview-file-close"]}>
                            <Button
                                variant="accent"
                                status="fail"
                                size="S"
                                content="icon"
                                onClick={(e) => {
                                    deleteFileHandler(e, "fileKey")
                                }}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {(uploadedFiles?.length > 1 && uploadComplete) && (
                <div className={dropzone["preview-files"]}>
                    {

                        uploadedFiles.map((file: any) => {
                            const name = file.name.split(".")[0]
                            const ext = file.name.split(".")[1]

                            return (
                                <div className={dropzone["preview-file"]} key={file.key}>
                                    <div className={dropzone["preview-file-left"]}>
                                        {file.type.includes("image") && <Cover src={file.url} alt="Uploaded Image" width={200} height={112} />}
                                        {/* {
                                            file.type.includes("pdf") && <iframe src={file.url} />
                                        } */}
                                    </div>
                                    <div className={dropzone["preview-file-center"]}>
                                        <Text className={dropzone["preview-file-name"]}>{name}</Text>
                                        <Text className={dropzone["preview-file-size"]}>
                                            {formatFileSize(file?.size)} • {ext}
                                        </Text>
                                    </div>
                                    <div className={dropzone["preview-file-right"]}>
                                        <Button
                                            variant="accent"
                                            status="fail"
                                            size="S"
                                            content="icon"
                                            onClick={(e) => {
                                                deleteFileHandler(e, "fileKey")
                                            }}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            {(uploadProgress > 0 && !uploadComplete) && (
                <div className={dropzone.progress}>
                    <Progress value={uploadProgress} style={{ height: "4px" }} data-status={"success"} />
                </div>
            )}
        </div>
    );
}