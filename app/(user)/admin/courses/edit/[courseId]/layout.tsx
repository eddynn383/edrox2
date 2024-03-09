import { Badge, Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, PageTitle, Progress } from "@/components";
import CourseCreationControls from "@/module/CourseCreationControls";
import { getCourseById } from "@/data/courses";
import psx from "@/styles/page.module.scss"
import { Eraser, Pen } from "lucide-react";
import CourseCreationForm from "@/module/CourseCreationForm";
import { getAllCategories, getCategoryById } from "@/data/categories";


interface NewCourseLayoutProps { 
    children: React.ReactNode;
    params: {
        courseId: string;
        // step?: number;
    }
}

const NewCourseLayout = async ({ children, params }: NewCourseLayoutProps) => {
    console.log("Params from Layout: ", params.courseId)
    const categories = await getAllCategories();
    const course = await getCourseById(params.courseId)

    if (!course) {
        console.log("The course does not exist")
        return false
    }

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-left"]}>
                    <div style={{"display": "flex", "flexDirection": "column", "alignItems": "flex-start", "gap": "4px"}}>
                        <PageTitle title={course.title}/>
                        <Badge size="L">{course.category.name}</Badge>
                    </div>
                </div>
                <div className={psx["body-toolbar-right"]}>
                    <Dialog
                    // open={open} onOpenChange={setOpen}
                    
                    >
                        <DialogTrigger asChild>
                            <Button mode="solid" variant="primary" shade="200" status="default" size="S" content="icon">
                                <Pen />
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
                                    // onOpen={setOpen}
                                />
                            </DialogBody>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
            <section className={psx["body-content"]}>
                {children}
            </section>
            <section>
                <Progress value={25} style={{ "height": "2px" }} data-status={"success"}/>
            </section>
            <section className={psx["body-controls"]}>
                <CourseCreationControls />
            </section>
        </div>
    )
}

export default NewCourseLayout;