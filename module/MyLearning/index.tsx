"use server"

import { CourseCard, ScrollArea } from "@/components";
import { MyLearningProps } from "./interface";
import sx from "@/styles/module.module.scss"


const MyLearning = async ({ courses }: MyLearningProps) => {

    return (
        <div className={sx["catalog"]}>
            {
                courses && (
                    <ScrollArea>
                        <ul className={sx["catalog-list"]}>
                            {
                                courses.map((item: any) => (
                                    <li key={item.id}>
                                        <CourseCard cardId={item?.id} data={item.course} variant="primary" shade="100" mode="solid" />
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

export default MyLearning;