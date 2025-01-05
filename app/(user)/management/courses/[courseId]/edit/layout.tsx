import { Stepper } from "@/components";
import { Preview, SidePanelToggle } from "@/module/ActionButtons";
import { PageHeader } from "@/module/PageHeader";
import { Award, BookOpenText, Eye, Home, LayoutList, ListPlus, Medal, ScanEye, UsersRound } from "lucide-react";
import { PageBody } from "@/module/PageBody";
import { getCourseById } from "@/data/courses";
import { getAllCreationStepsByFor, getAllCreationStepsByUrl } from "@/data/creationSteps";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import page from "@/styles/page.module.css"
import { StepperControls } from "@/components/Stepper";

interface CourseEditLayoutProps {
    children: React.ReactNode,
    params: {
        courseId: string
    },
    req: NextRequest
}

const CourseEditLayout = async ({ children, params }: CourseEditLayoutProps) => {

    const { courseId } = params

    console.log("CourseEditLayout COURSE ID: ", courseId)

    const currentCourse = await getCourseById(courseId)
    const creationSteps = await getAllCreationStepsByFor("courses")

    function getCurrentPath() {
        const headersList = headers()
        const referer = headersList.get('referer')
        if (referer) {
            const url = new URL(referer);
            const paths = url.pathname.split("/")
            return paths[paths.length - 1]
        }
    }
    console.log("pathname:: ", getCurrentPath())  // Extract the pathname

    const currentStep = await getAllCreationStepsByUrl(getCurrentPath() || "")

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
                        <Stepper steps={creationSteps} />
                    </div>
                </div>
                <div className={page.content}>
                    {children}
                </div>
                <div className={page.actions}>
                    <StepperControls steps={creationSteps} />
                </div>
            </PageBody>
        </div>
    );
}

export default CourseEditLayout;