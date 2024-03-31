import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isUserAllowed } from "@/lib/user-check";

const f = createUploadthing();

const handleAuth = async () => {
    const session = await auth();
    const userId = session?.user.id;
    const isAuthorized = isUserAllowed();

    console.log(isAuthorized)

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    profilePicture: f(["image"]) .middleware(() => handleAuth()).onUploadComplete((data) => console.log("file", data)),
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).middleware(() => handleAuth()).onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", metadata.userId);
   
        console.log("file url", file.url);
   
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId };
    }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"]).middleware(() => handleAuth()).onUploadComplete(() => { }),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } }).middleware(() => handleAuth()).onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;