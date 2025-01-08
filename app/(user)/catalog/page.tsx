import { Suspense } from "react";
import { ScrollArea, ScrollBar, SkeletonCard } from "@/components";
import { getAllCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import CatalogToolbar from "@/module/CatalogToolbar";
import Category from "@/module/Category";
import psx from "@/styles/page.module.scss"
import csx from "@/styles/module.module.scss"
import { auth } from "@/auth";

type SearchParams = Promise<{
    name: string;
    categoryId: string;
    viewport: string;
    view: "grid" | "list";
}>

interface CatalogPageProps {
    searchParams: SearchParams;
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

const CatalogPage = async (props: CatalogPageProps) => {

    const searchParams = await props.searchParams;

    const courses = await getPublishdedCourses({ ...searchParams });
    const categories = await getAllCategories()

    const session = await auth();
    const user = session?.user;
    const role = user?.role;
    // console.log(searchParams.viewport)
    // console.log("CATALOG COURSES: ", courses)

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <CatalogToolbar pageTitle="Catalog" role={role} />
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={"loading categories..."}>
                        <Category data={categories} current={searchParams.categoryId} />
                    </Suspense>
                    <Suspense fallback={<SkeletonCatalog />}>
                        <Catalog courses={courses} layout={searchParams.view} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default CatalogPage;