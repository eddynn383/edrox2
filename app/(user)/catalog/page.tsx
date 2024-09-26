import { Suspense } from "react";
import { ScrollArea, ScrollBar, SkeletonCard } from "@/components";
import { getAllCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import CatalogToolbar from "@/module/CatalogToolbar";
import Category from "@/module/Category";
import psx from "@/styles/page.module.scss"
import csx from "@/styles/module.module.scss"

interface CatalogPageProps {
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

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
    const courses = await getPublishdedCourses({...searchParams});  
    const categories = await getAllCategories()
    // console.log(searchParams.viewport)
    // console.log("CATALOG COURSES: ", courses)

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <CatalogToolbar pageTitle="Catalog" />
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={"loading categories..."}>
                        <Category data={categories} current={searchParams.categoryId} />
                    </Suspense>
                    <Suspense fallback={<SkeletonCatalog />}>
                        <Catalog courses={courses} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default CatalogPage;