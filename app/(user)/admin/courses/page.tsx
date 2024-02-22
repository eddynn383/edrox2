import Link from "next/link";
import { DataTable } from "@/module/DataTable";
import { getAllCourses } from "@/data/courses";
import { coursesCols } from "@/lib/table-headers";
import { Plus } from "lucide-react";
import sxc from "@/styles/component.module.scss"
import sxm from "@/styles/module.module.scss";

const Page = async () => {
    const courses = await getAllCourses();

    return (
        <div className={sxm["page-body"]}>
            <section className={sxm["page-content"]}>
                <DataTable columns={coursesCols} data={courses} pageTitle="Courses" toolbarButtons={
                    <Link className={sxc["button"]} data-mode="solid" data-variant="accent" data-status="default" data-size="M" data-content="text" href="courses/new/details">
                        <Plus /> New
                    </Link>
                } />
            </section>
        </div>
    );
}

export default Page;