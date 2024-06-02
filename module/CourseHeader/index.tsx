import { Badge, PageTitle, Rating } from "@/components";
import { Category, Course } from "@/interfaces/global";
import { CourseDescriptionModal } from "../CourseDescriptionModal";
import { CourseTitleModal } from "../CourseTitleModal";
import msx from "@/styles/module.module.scss"

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
        <div className={msx["course-header"]}>
            {
                !edit &&
                <>
                    <div className={msx["course-header-title"]}>
                        <PageTitle title={title}/>
                    </div>
                    <div className={msx["course-header-metadata"]}>
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
                        <div className={msx["course-header-description"]}>
                            <p>{description}</p>
                        </div>
                    }
                </>
            }
            {
                edit && 
                <>
                    <div className={msx["course-header-title"]}>
                        <PageTitle title={title}/>
                        <div className={msx["course-header-title-edit"]}>
                            <CourseTitleModal id={id} value={{course, categories}} />
                        </div>
                    </div>
                    <div className={msx["course-header-metadata"]}>
                        <Badge size="M">{category.name}</Badge>
                    </div>
                    <div className={msx["course-header-description"]}>
                        {
                            description && 
                            <>
                                <p>{description}</p>
                                <div className={msx["course-header-description-edit"]}>
                                    <CourseDescriptionModal id={id} value={description} />
                                </div>
                            </>
                        }
                        {
                            !description && 
                            <>
                                <div className={msx["course-header-description-add"]}>
                                    <CourseDescriptionModal id={id} />
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    );
}
