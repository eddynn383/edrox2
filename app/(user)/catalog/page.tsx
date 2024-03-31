import { Suspense } from "react";
import { ScrollArea, ScrollBar, SkeletonCard } from "@/components";
import { getAllCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import CatalogToolbar from "@/module/CatalogToolbar";
import Category from "@/module/Category";
import psx from "@/styles/page.module.scss"

interface CatalogPageProps {
    searchParams: {
        title: string;
        categoryId: string;
        viewport: string;
    }
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
    const courses = await getPublishdedCourses({...searchParams});  
    const categories = await getAllCategories()
    console.log(searchParams.viewport)
    console.log("CATALOG COURSES: ", courses)

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <CatalogToolbar pageTitle="Catalog" />
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={"loading categories..."}>
                        <Category data={categories} current={searchParams.categoryId} />
                    </Suspense>
                    <Suspense fallback={<SkeletonCard />}>
                        <Catalog courses={courses} />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}

export default CatalogPage;