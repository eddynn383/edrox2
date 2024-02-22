import Link from "next/link";
import { Button, Icon } from "@/components";
import { DataTable } from "@/module/DataTable";
import { getAllCourses } from "@/data/courses";
import { coursesCols } from "@/lib/table-headers";
import sx from "@/styles/module.module.scss";

const Page = async () => {
    const courses = await getAllCourses();

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <DataTable columns={coursesCols} data={courses} pageTitle="Courses" toolbarButtons={
                    <Link href="courses/new/details">
                        <Button variant="accent" size="M" content="icon-text"><Icon name="plus" /> New</Button>
                    </Link>
                } />
            </section>
        </div>
    );
}

export default Page;