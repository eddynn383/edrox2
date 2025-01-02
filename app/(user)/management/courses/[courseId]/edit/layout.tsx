import { goToCourseContent, goToCourseDetails } from "@/actions/edit-course";
import { Button, ScrollArea, Stepper } from "@/components";
import { Preview, SidePanelToggle } from "@/module/ActionButtons";
import { PageHeader } from "@/module/PageHeader";
import { Award, BookOpenText, Eye, Home, LayoutList, ListPlus, Medal, ScanEye, UsersRound } from "lucide-react";
import page from "@/styles/page.module.css"
import { PageBody } from "@/module/PageBody";
import { getCourseById } from "@/data/courses";

const testhandler = () => {
    "use client"
    console.log("test handler")
}

interface CourseEditLayoutProps {
    children: React.ReactNode,
    params: {
        courseId: string
    }
}

const CourseEditLayout = async ({ children, params }: CourseEditLayoutProps) => {

    const { courseId } = params

    console.log("CourseEditLayout COURSE ID: ", courseId)

    const currentCourse = await getCourseById(courseId)

    const PageActions = [{
        id: "a1",
        element: <Preview />
    },
    {
        id: "a2",
        element: <SidePanelToggle />
    }]

    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        href: "/management/courses",
        title: "Courses Manager",
        children: "Courses Manager",
        separator: "true"
    }, {
        id: "b3",
        title: "Course Edit",
        children: "Course Edit",
        separator: "false"
    }]

    const PageStepper = [{
        id: "s1",
        icon: <LayoutList />,
        name: "Course details",
        complete: true,
        separator: true,
        href: "details"
        // onAction: async () => await goToCourseDetails()
    },
    {
        id: "s2",
        icon: <ListPlus />,
        name: "Course content",
        complete: false,
        separator: true,
        href: "content"
        // onAction: async () => await goToCourseContent()
    },
    {
        id: "s3",
        icon: <UsersRound />,
        name: "Course participants",
        complete: false,
        separator: true,
        href: "participants"
        // onAction: async () => await goToCourseContent()
    },
    {
        id: "s4",
        icon: <Medal />,
        name: "Course rewards",
        complete: false,
        separator: true,
        href: "rewards"
        // onAction: async () => await goToCourseContent()
    }]

    return (
        <div className={page["course-edit"]}>
            <PageHeader title={currentCourse?.title || ""} breadcrumb={PageBreadcrumb} actions={PageActions} />
            <PageBody orientation="vertical">
                <div className={page.toolbar}>
                    <div className={page.inner}>
                        <Stepper steps={PageStepper} orientation="horizontal" />
                    </div>
                </div>
                <div className={page.content}>
                    {children}
                </div>
                <div className={page.actions}>
                    <div className={page["section-left"]}>
                        <div className={page["section-inner"]}>
                            <Button mode="text">Back</Button>
                        </div>
                    </div>
                    <div className={page["section-right"]}>
                        <div className={page["section-inner"]}>
                            <Button variant="accent" status="brand" style={{ minWidth: "140px" }}>Next</Button>
                        </div>
                    </div>
                </div>
            </PageBody>
        </div>
    );
}

export default CourseEditLayout;