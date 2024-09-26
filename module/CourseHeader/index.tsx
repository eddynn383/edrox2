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

export const CourseHeader = async ({course, categories, allowRating=true, ratingType="Overall", rating, edit=false}: CourseHeaderProps) => {
    const {id, title, description, category} = course

    // console.log("COURSE HEADER DETAILS: ", course)

    const ratingScore = rating?.score ? rating?.score : 0

    return ( 
        <div className={courseSx.container}>
            {
                !edit &&
                <>
                    <div className={courseSx.title} data-state="view">
                        <PageTitle title={title}/>
                    </div>
                    <div className={courseSx.metadata} data-state="view">
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
                        <div className={courseSx.description} data-state="view">
                            <p>{description}</p>
                        </div>
                    }
                </>
            }
            {
                edit && 
                <>
                    <div className={courseSx.title} data-state="edit">
                        <PageTitle title={title}/>
                        <div className={courseSx.edit}>
                            <CourseTitleModal id={id} value={{course, categories}} />
                        </div>
                    </div>
                    <div className={courseSx.metadata} data-state="edit">
                        <Badge size="M">{category.name}</Badge>
                    </div>
                    <div className={courseSx.description} data-state="edit">
                        {
                            description && 
                            <>
                                <p>{description}</p>
                                <div className={courseSx.edit}>
                                    <CourseDescriptionModal id={id} value={description} />
                                </div>
                            </>
                        }
                        {
                            !description && 
                            <div className={courseSx.add}>
                                <CourseDescriptionModal id={id} />
                            </div>
                            
                        }
                    </div>
                </>
            }
        </div>
    );
}
