import { SkeletonCard } from "@/components";
import { getCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import sx from "@/styles/module.module.scss"
import { Suspense } from "react";

interface CatalogPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
    const courses = await getPublishdedCourses({...searchParams});  
    const categories = await getCategories()

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <Suspense fallback={<SkeletonCard />}>
                    <Catalog courses={courses} categories={categories} selectedCategory={searchParams.categoryId} pageTitle="Catalog" />
                </Suspense>
            </section>
        </div>
    );
}

export default CatalogPage;