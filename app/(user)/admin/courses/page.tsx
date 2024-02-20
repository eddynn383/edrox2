import { Button, Icon } from "@/components";
import Link from "next/link";
import { getAllCourses } from "@/data/courses";
import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/module/DataTable";
import { coursesCols } from "@/lib/table-headers";
import sx from "@/styles/module.module.scss";


const Page = async () => {
    const courses = await getAllCourses();

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <DataTable columns={coursesCols} data={courses} pageTitle="Courses" />
            </section>
        </div>
    );
}

export default Page;