"use server"

import { utapi } from "@/app/api/uploadthing/server"

export const deleteFileUpload = async (key: string) => {
    await utapi.deleteFiles(key)
}