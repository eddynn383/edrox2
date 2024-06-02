import { ourFileRouter } from "@/app/api/uploadthing/core";

export interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};