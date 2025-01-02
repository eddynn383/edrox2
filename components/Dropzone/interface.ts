import { ourFileRouter } from "@/app/api/uploadthing/core";

export interface FileUploadProps {
    onChange: (image?: Image) => void;
    endpoint: keyof typeof ourFileRouter;
    currentImage?: string;
};

type Image = {
    name?: string;
    url?: string;
    key?: string;
    type?: string;
    size?: number;
}