import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { Switch } from "@/components/Switch";
import { GripVertical } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ChapterProps {
    id: string;
    title: string;
    isPublished: boolean;
}

const Chapter = ({ id, title, isPublished }: ChapterProps) => {
    const pathname = usePathname()
    const router = useRouter()
    // console.log(router)
    console.log(pathname)

    const isActive = pathname.includes(id)

    console.log(isActive)

    return ( 
        <Link href={id} className={csx["chapter-edit"]} data-active={isActive}>
            <GripVertical className={csx["chapter-edit-grip"]}/>
            <div className={csx["chapter-edit-left"]}>
                <h3 className={csx["chapter-edit-title"]}>
                    {title}
                </h3>
            </div>
            <div className={csx["chapter-edit-right"]}>
                <Switch 
                    checked={isPublished}
                    onCheckedChange={() => false
                        // editCourse(row.original.id, {isPublished: !published})
                        
                    }
                />
            </div>
        </Link>
    );
}

interface ChaptersEditListProps {
    data: any;
}

const ChaptersEditList = ({ data }: ChaptersEditListProps) => {
    return ( 
        <ul className={msx["chapters-edit-list"]}>
            {
                data.map((item: any) => (
                    <li className={msx["chapters-edit-list-item"]} key={item.id}>
                        <Chapter id={item.id} title={item.title} isPublished={true} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default ChaptersEditList;