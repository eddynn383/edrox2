import { ourFileRouter } from "@/app/api/uploadthing/core";

export interface UploadImageProps {
    currentImage: string | null;
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};