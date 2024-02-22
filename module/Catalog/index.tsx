import { CourseCard } from "@/components";
import CatalogToolbar from "../CatalogToolbar";
import Category from "../Category";
import { CatalogProps } from "./interface";
import sx from "@/styles/module.module.scss"


const Catalog = ({ courses, categories, selectedCategory, pageTitle }: CatalogProps) => {

    return (
        <div className={sx["catalog"]}>
            <CatalogToolbar pageTitle={pageTitle} />
            <div className={sx["catalog-content"]}>
                <Category data={categories} current={selectedCategory} />
                {
                    courses && (
                        <ul className={sx["catalog-list"]}>
                            {
                                courses.map((item: any) => (
                                    <li key={item.id}>
                                        <CourseCard data={item} variant="primary" shade="200" />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Catalog;