
import { Preview } from "@/module/ActionButtons";
import { PageHeader } from "@/module/PageHeader";
import { Home } from "lucide-react";
import { PageBody } from "@/module/PageBody";
import page from "@/styles/page.module.css"

interface TestLayoutProps {
    children: React.ReactNode,
    params: {
        courseId: string
    }
}

const TestLayout = async ({ children, params }: TestLayoutProps) => {

    const PageActions = [{
        id: "a1",
        element: <Preview />
    }]

    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "false"
    }]

    return (
        <div className={page["course-edit"]}>
            <PageHeader title="Tests" breadcrumb={PageBreadcrumb} actions={PageActions} />
            <PageBody>
                {children}
            </PageBody>
        </div>
    );
}

export default TestLayout;