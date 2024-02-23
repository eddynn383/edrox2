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

function delayData(data: any, milliseconds: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, milliseconds);
    });
  }

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
    const courses = await getPublishdedCourses({...searchParams});
    const delayedCourses = await delayData(courses, 50000)

    console.log("Delayed Courses:", delayedCourses);    

    const categories = await getCategories()

    // console.log("courses: ", courses)
    // console.log("categories: ", categories)
    // console.log("searchParams: ", searchParams)

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <Suspense fallback={<SkeletonCard />}>
                    <Catalog courses={delayedCourses} categories={categories} selectedCategory={searchParams.categoryId} pageTitle="Catalog" />
                </Suspense>
            </section>
        </div>
    );
}

export default CatalogPage;