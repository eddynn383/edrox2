import { Pen, PlusCircle } from "lucide-react";
import { Badge, Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, PageTitle, Rating } from "@/components";
import { CourseCreationForm } from "../CourseCreationForm";
import { CourseDescriptionForm } from "../CourseDescriptionForm";
import { Category, Course } from "@/interfaces/global";
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

    console.log("COURSE HEADER DETAILS: ", course)

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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                                        {/* <Pen /> */}
                                        Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Course</DialogTitle>
                                        <DialogDescription>Use the fields below to edit the course</DialogDescription>
                                    </DialogHeader>
                                    <DialogBody>
                                        <CourseCreationForm 
                                            course={course}
                                            categories={categories} 
                                            actions={
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button shade="200" >Cancel</Button>
                                                    </DialogClose>
                                                    <Button variant="accent" type="submit">Update</Button>
                                                </DialogFooter>
                                            }
                                        />
                                    </DialogBody>
                                </DialogContent>
                            </Dialog>
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                                                {/* <Pen /> */}
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Course</DialogTitle>
                                                <DialogDescription>Use the fields below to edit the course</DialogDescription>
                                            </DialogHeader>
                                            <DialogBody>
                                                <CourseDescriptionForm 
                                                    courseId={id}
                                                    description={description} 
                                                    actions={
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button shade="200" >Cancel</Button>
                                                            </DialogClose>
                                                            <Button variant="accent" type="submit">Update</Button>
                                                        </DialogFooter>
                                                    }
                                                />
                                            </DialogBody>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </>
                        }
                        {
                            !description && 
                            <>
                                <div className={msx["course-header-description-add"]}>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                                                <PlusCircle />
                                                Add description
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add description</DialogTitle>
                                                <DialogDescription>Use the field below to add a course description</DialogDescription>
                                            </DialogHeader>
                                            <DialogBody>
                                                <CourseDescriptionForm 
                                                    courseId={id}
                                                    actions={
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button shade="200" >Cancel</Button>
                                                            </DialogClose>
                                                            <Button variant="accent" type="submit">Add</Button>
                                                        </DialogFooter>
                                                    }
                                                />
                                            </DialogBody>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    );
}
