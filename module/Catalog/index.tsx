"use server"

import { CourseCard, ScrollArea } from "@/components";
import { CatalogProps } from "./interface";
import sx from "@/styles/module.module.scss"


const Catalog = async ({ courses }: CatalogProps) => {
    console.log("Courses in Catalog: ", courses)
    
    return (
        <div className={sx["catalog"]}>
            {
                courses && (
                    <ScrollArea>
                        <ul className={sx["catalog-list"]}>
                            {
                                courses.map((item: any) => (
                                    <li key={item.id}>
                                        <CourseCard cardId={item?.id} data={item} variant="primary" shade="100" />
                                    </li>
                                ))
                            }
                        </ul>
                    </ScrollArea>
                )
            }
        </div>
    )
}

export default Catalog;