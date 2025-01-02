"use server"

import { CourseCard, ScrollArea } from "@/components";
import { CatalogProps } from "./interface";
import sx from "@/styles/module.module.scss"


const Catalog = async ({ courses }: CatalogProps) => {
    console.log("Courses in Catalog: ", courses)

    return (
        <div className={sx["catalog"]}>
            {
                courses.length > 0 && (
                    <ScrollArea>
                        <ul className={sx["catalog-list"]}>
                            {
                                courses.map((item: any) => (
                                    <li key={item.id}>
                                        <CourseCard cardId={item?.id} data={item} mode="solid" variant="primary" shade="100" />
                                    </li>
                                ))
                            }
                        </ul>
                    </ScrollArea>
                )
            }

            {
                !courses.length && (
                    <div className={sx["empty"]}>
                        <p>No courses found.</p>
                    </div>
                )
            }
        </div>
    )
}

export default Catalog;