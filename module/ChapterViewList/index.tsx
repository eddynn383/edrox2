import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"

interface ChapterProps {
    id: string;
    title: string;
}

const Chapter = ({ id, title }: ChapterProps) => {


    return ( 
        <div className={csx["chapter-view"]}>
            <div className={csx["chapter-view-left"]}>
                <h3 className={csx["chapter-view-title"]}>
                    {title}
                </h3>
            </div>
            <div className={csx["chapter-view-right"]}>
                
            </div>
        </div>
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