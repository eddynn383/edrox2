"use server"

import { getImageById, setImage } from "@/data/image";
// import { revalidateTag } from "next/cache";

export const newImage = async (values: any) => {

    if (!values.url) {
        return { error: "URL is missing" };
    }

    console.log("NEW IMAGE VALUES (ACTION): ", values)

    const imageData = await setImage(values)
    const data = await imageData.json()

    // revalidateTag('courses')

    console.log("NEW IMAGE (ACTION): ", data)

    return {
        data,
        success: "The image was successfully created!"
    };
};

export const getImage = async (imageId: string) => {

    if (!imageId) {
        return { error: "Image ID is missing" };
    }

    const image = await getImageById(imageId)

    console.log("GET IMAGE (ACTION): ", image)

    return image
}