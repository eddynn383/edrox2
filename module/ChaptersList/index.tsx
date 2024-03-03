import sxm from "@/styles/module.module.scss"
import sxc from "@/styles/component.module.scss"
import { Switch } from "@/components/Switch";
import { GripVertical } from "lucide-react";

interface ChapterProps {
    title: string;
    isPublished: boolean;
}

const Chapter = ({ title, isPublished }: ChapterProps) => {
    return ( 
        <div className={sxc["chapter"]}>
            <GripVertical className={sxc["chapter-grip"]}/>
            <div className={sxc["chapter-left"]}>
                <h3 className={sxc["chapter-title"]}>
                    {title}
                </h3>
            </div>
            <div className={sxc["chapter-right"]}>
                <Switch 
                    checked={isPublished}
                    onCheckedChange={() => false
                        // editCourse(row.original.id, {isPublished: !published})
                        
                    }
                />
            </div>
        </div>
    );
}

interface ChaptersListProps {
    data: any;
}

const ChaptersList = ({ data }: ChaptersListProps) => {
    return ( 
        <ul className={sxm["chapters-list"]}>
            {
                data.map((item: any) => (
                    <li className={sxm["chapters-list-item"]} key={item.id}>
                        <Chapter title={item.title} isPublished={true} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default ChaptersList;