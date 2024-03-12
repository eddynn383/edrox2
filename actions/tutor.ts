import { getTutorById } from "@/data/tutors";

export const getTutor = async (tutorId: string) => {

    const tutor = await getTutorById(tutorId);


    // console.log("Tutor Data Json", tutor)

    return { 
        data: tutor,
        success: "The course was successfully created!" 
    };
};