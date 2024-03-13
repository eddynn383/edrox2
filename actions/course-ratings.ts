import { getCourseRatingAvg } from "@/data/ratings";

export const courseRatings = async (courseId: string) => { 
    const courseRating = await getCourseRatingAvg(courseId)

    return courseRating
};