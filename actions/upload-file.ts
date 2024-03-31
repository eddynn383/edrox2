import { deleteFileById } from "@/data/files"

export const deleteFileUpload = async (key: string) => {

    await deleteFileById(key)
    
}