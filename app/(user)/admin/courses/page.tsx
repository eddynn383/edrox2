import { Button, Icon } from "@/components";
import Link from "next/link";
import { getCourses } from "@/data/courses";
import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/module/DataTable";
import { coursesCols } from "@/lib/table-headers";
import sx from "@/styles/module.module.scss";


const Page = async () => {
    const courses = await getCourses();

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <DataTable columns={coursesCols} data={courses} pageTitle="Courses" />
            </section>
        </div>

        // <>
        //     <h1>ADMIN: COURSES</h1>
        //     <DataTable columns={columns} data={courses} />
        //     <Button variant="accent" size="M" type="button"><Link href="courses/new?step=details">New</Link></Button>
        // </>
    );
}

export default Page;