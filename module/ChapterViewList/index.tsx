import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { Switch } from "@/components/Switch";
import { GripVertical } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ChapterProps {
    id: string;
    title: string;
}

const Chapter = ({ id, title }: ChapterProps) => {
    const pathname = usePathname()
    const router = useRouter()
    // console.log(router)
    console.log(pathname)

    const isActive = pathname.includes(id)

    console.log(isActive)

    return ( 
        <Link href={id} className={csx["chapter-view"]} data-active={isActive}>
            <div className={csx["chapter-view-left"]}>
                <h3 className={csx["chapter-view-title"]}>
                    {title}
                </h3>
            </div>
            <div className={csx["chapter-view-right"]}>
                
            </div>
        </Link>
    );
}



interface ChaptersViewListProps {
    chapters: any;
}

const ChaptersViewList = ({ chapters }: ChaptersViewListProps) => {
    return ( 
        <ul className={msx["chapters-view-list"]}>
            {
                chapters.map((item: any) => (
                    <li className={msx["chapters-view-list-item"]} key={item.id}>
                        <Chapter id={item.id} title={item.title} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default ChaptersViewList;