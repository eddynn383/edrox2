import { Suspense } from "react";
import { ScrollArea, ScrollBar, SkeletonCard } from "@/components";
import { getAllCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import CatalogToolbar from "@/module/CatalogToolbar";
import Category from "@/module/Category";
import psx from "@/styles/page.module.scss"
import csx from "@/styles/module.module.scss"
import { getAllUserEnrolments } from "@/data/enrolment";
import MyLearning from "@/module/MyLearning";

interface LearningAreaProps {
    searchParams: {
        title: string;
        categoryId: string;
        viewport: string;
    }
};

const SkeletonCatalog = () => {

    return (

        <div className={csx["catalog"]}>
            <ul className={csx["catalog-list"]}>
                {
                    [...Array(12)].map((item, idx) => (
                        <li key={idx}>
                            <SkeletonCard />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const LearningArea = async ({ searchParams }: LearningAreaProps) => {
    // const courses = await getPublishdedCourses({...searchParams});  
    const courses = await getAllUserEnrolments()
    const categories = await getAllCategories()

    console.log("My courses: ", courses)
    // console.log(searchParams.viewport)
    // console.log("CATALOG COURSES: ", courses)

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <CatalogToolbar pageTitle="Learning area" />
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={"loading categories..."}>
                        <Category data={categories} current={searchParams.categoryId} />
                    </Suspense>
                    <Suspense fallback={<SkeletonCatalog />}>
                        <MyLearning courses={courses} />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}

export default LearningArea;