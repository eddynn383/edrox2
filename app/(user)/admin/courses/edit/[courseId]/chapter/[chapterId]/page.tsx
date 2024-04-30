import { getChapterById } from "@/data/chapters";
import msx from "@/styles/module.module.scss"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button } from "@/components";
import { Heading, Type, Image as ImageIcon, Film, Home } from "lucide-react";
import { CourseHeader } from "@/module/CourseHeader";
import psx from "@/styles/page.module.scss"


interface NewCoursePageProps {
    params: {
        courseId: string;
        chapterId: string;
    }
}

// const renderInput = () => {
//     return <input type="file" />
// }

const ChapterContentActions = () => {
    return (
        <div className={msx["chapters-content-actions"]}> 
            <Button content="icon"><Heading /></Button>
            <Button content="icon"><Type /></Button>
            <Button content="icon">
                <ImageIcon />
            </Button>
            <Button content="icon"><Film /></Button>
        </div>
    )
}

const Page = async ({ params }: NewCoursePageProps) => {
    // console.log("COURSE ID: ", params.courseId)
    // console.log("CHAPTER ID: ", params.chapterId)
    
    // const chapters = await getAllChaptersByCourseId(params.courseId)
    const chapter = await getChapterById(params.chapterId)

    return (
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
                            {/* <CourseHeader course={course} categories={categories} edit={true} /> */}
                        </div>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        {/* <CourseSummary course={course} edit={true} />  */}
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    {/* <CourseDetails courseId={params.courseId} tutors={course?.tutors} chapters={chapters} edit={true} /> */}
                </div>
            </section>
        </div>
        // <div className={msx["chapters-content"]}>
        //     <div className={msx["chapters-content-details"]}>
        //         <h2>{chapter?.title}</h2>  
        //         <p>{chapter?.description}</p>
        //     </div>
        //     <ChapterContentActions />
        // </div>

    );
}

export default Page;