import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { covertDuration } from "@/lib/utils";

interface ChapterProps {
    id: string;
    title: string;
    duration: number;
}

const Chapter = ({ id, title, duration }: ChapterProps) => {


    const newDuration = covertDuration(duration)

    return ( 
        <div className={csx["chapter-view"]}>
            <div className={csx["chapter-view-left"]}>
                <h3 className={csx["chapter-view-title"]}>
                    {title}
                </h3>
            </div>
            <div className={csx["chapter-view-right"]}>
                <span className={csx["chapter-view-duration"]}>{newDuration}</span>
            </div>
        </div>
    );
}


type Chapter = {
    id: string;
    title: string;
    duration: number;

}


interface ChaptersViewListProps {
    chapters: Chapter[];
}

const ChaptersViewList = ({ chapters }: ChaptersViewListProps) => {
    return ( 
        <ul className={msx["chapters-view-list"]}>
            {
                chapters.map((item: any) => (
                    <li className={msx["chapters-view-list-item"]} key={item.id}>
                        <Chapter id={item.id} title={item.title} duration={item.duration} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default ChaptersViewList;