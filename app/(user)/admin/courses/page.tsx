import { DataTable } from "@/module/DataTable";
import { getAllCourses } from "@/data/courses";
import { coursesCols } from "@/lib/table-headers";
import { Plus } from "lucide-react";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/components";
import { Form } from "@/components/Form";
import CourseInitialCreation from "@/module/CourseInitialCreation";
import { getCategories } from "@/data/categories";
import sxc from "@/styles/component.module.scss"
import sxm from "@/styles/module.module.scss";

const Page = async () => {
    const courses = await getAllCourses();
    const categories = await getCategories();
    
    return (
        <div className={sxm["page-body"]}>
            <section className={sxm["page-content"]}>
                <div className={sxm["page-content-left"]}>
                    <DataTable columns={coursesCols} data={courses} pageTitle="Courses" toolbarButtons={
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button mode="solid" variant="accent" status="default" size="M" >
                                    <Plus /> New
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>New Course</DialogTitle>
                                    {/* <DialogDescription>
                                        Define the course name and category as a first step
                                    </DialogDescription> */}
                                </DialogHeader>
                                <div>
                                    <CourseInitialCreation categories={categories} actions={
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button shade="200" >Cancel</Button>
                                            </DialogClose>
                                            <Button variant="accent" type="submit">Create</Button>
                                        </DialogFooter>
                                    } />
                                </div>
                            </DialogContent>
                        </Dialog>
                    } />
                </div>
            </section>
        </div>
    );
}

export default Page;