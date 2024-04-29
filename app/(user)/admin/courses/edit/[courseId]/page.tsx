import { Home } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components";
import { getCourseById } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import { CourseImage } from "@/module/CourseImage";
import { CourseHeader } from "@/module/CourseHeader";
import psx from "@/styles/page.module.scss"
import { CourseSummary } from "@/module/CourseSummary";

interface NewCoursePageProps {
    params: {
        courseId: string;
        // step?: number;
    }
}

const Page = async ({ params }: NewCoursePageProps) => {
    const categories = await getAllCategories();
    const course = await getCourseById(params.courseId)

    if (!course) {
        console.log("The course does not exist")
        return false
    }

    const cover = course.image ? course.image : ""
    // redirect(`/admin/courses/edit/${params.courseId}/details`)
    // const course = await getCourseById(params.courseId)
    // const categories = await getAllCategories()

    // const defaultValues = {
    //     description: course ? course.description : "",
    //     // price: course ? course.price : 0,
    //     // discountPrice: course ? course.discountPrice : 0,
    // }
    return (
        // <EditCourseForm courseId={params.courseId} categories={categories} defaultValues={defaultValues}/>
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/courses" title="Courses">Courses</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Course Creation</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                            <CourseHeader course={course} categories={categories} edit={true} />
                            {/* <div style={{"display": "flex", "flexDirection": "column", "alignItems": "flex-start", "gap": "12px"}}>
                                <PageTitle title={course.title}/>
                                <Badge size="M">{course.category.name}</Badge>
                            </div> */}
                        </div>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <CourseSummary course={course} edit={true} /> 
                        {/* <Dialog
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
                        </Dialog> */}
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                {/* {children} */}
            </section>
            {/* <section className={psx["body-controls"]}>
                <CourseCreationControls />
            </section> */}
        </div>
    )
}

export default Page;