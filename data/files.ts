"use server"

import { UTApi } from "uploadthing/server";
 
const utapi = new UTApi();


export const deleteFileById = async (id: string) => {
    try {

        console.log("deleted id: ", id)

        const file = await utapi.deleteFiles(id)
        console.log("File successfully deleted!")

        return file

    } catch (error) {
        console.log(error)
        return null
    }
}