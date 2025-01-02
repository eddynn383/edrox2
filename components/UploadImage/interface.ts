import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Image } from "@/interfaces/global";

export interface UploadImageProps {
    currentImage: Image | null;
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};