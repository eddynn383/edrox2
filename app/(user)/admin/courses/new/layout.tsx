
import { Button, Icon } from "@/components";
import CourseCreationControls from "@/module/CourseCreationControls";
import PageTitle from "@/components/PageTitle";
import sx from "@/styles/module.module.scss"

const NewCourseLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className={sx["page-body"]}>
            <PageTitle title="New course">
                <Button shade="200" size="M"><Icon name="eraser" /> Reset</Button>
            </PageTitle>
            <section className={sx["page-content"]}>
                {children}
            </section>
            <section className={sx["page-controls"]}>
                <CourseCreationControls />
            </section>
        </div>
    );
}

export default NewCourseLayout;