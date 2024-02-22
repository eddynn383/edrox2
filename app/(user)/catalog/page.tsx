import { getCategories } from "@/data/categories";
import { getPublishdedCourses } from "@/data/courses";
import Catalog from "@/module/Catalog";
import sx from "@/styles/module.module.scss"

interface CatalogPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
    const courses = await getPublishdedCourses({...searchParams});
    const categories = await getCategories()

    // console.log("courses: ", courses)
    // console.log("categories: ", categories)
    // console.log("searchParams: ", searchParams)

    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-content"]}>
                <Catalog courses={courses} categories={categories} selectedCategory={searchParams.categoryId} pageTitle="Catalog" />
            </section>
        </div>
    );
}

export default CatalogPage;