import { Badge, PageTitle, Rating } from "@/components";
import { Category, Course } from "@/interfaces/global";
import { CourseDescriptionModal } from "../CourseDescriptionModal";
import { CourseTitleModal } from "../CourseTitleModal";
import courseSx from "./course-header.module.css"

type Rating = {
    score: number;
    reviews?: number;
}

type RatingType = "Overall" | "User"

interface CourseHeaderProps {
    course: Course;
    categories?: Category[] | null;
    allowRating?: boolean;
    ratingType?: RatingType;
    rating?: Rating;
    edit?: boolean;
}

export const CourseHeader = async ({ course, categories, allowRating = true, ratingType = "Overall", rating, edit = false }: CourseHeaderProps) => {
    const { id, title, description, category } = course

    // console.log("COURSE HEADER DETAILS: ", course)

    const ratingScore = rating?.score ? rating?.score : 0

    return (
        <div className={courseSx.container}>
            <div className={courseSx.title}>
                <PageTitle title={title} />
            </div>
            <div className={courseSx.metadata}>
                {
                    category &&
                    <Badge size="M">{category.name}</Badge>
                }
                {
                    rating &&
                    <>
                        {
                            ratingType === "Overall" &&
                            <Rating containerId={id} score={ratingScore} reviews={rating?.reviews} minified={true} />
                        }
                    </>
                }
            </div>
            {
                description &&
                <div className={courseSx.description}>
                    <p>{description}</p>
                </div>
            }
        </div>
    );
}
