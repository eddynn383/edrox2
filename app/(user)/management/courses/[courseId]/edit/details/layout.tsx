import { goToCourseContent, goToCourseDetails } from "@/actions/edit-course";
import { Button, Playlist, ScrollArea, Stepper } from "@/components";
import { Preview } from "@/module/ActionButtons";
import { PageHeader } from "@/module/PageHeader";

import page from "@/styles/page.module.css"
import { PageBody } from "@/module/PageBody";
import { getAllChaptersByCourseId } from "@/data/chapters";

interface DetailsEditLayoutPropsp {
    children: React.ReactNode,
    settings: React.ReactNode,
    params: {
        courseId: string
    }
}

const DetailsEditLayout = async ({ children, settings, params }: DetailsEditLayoutPropsp) => {

    return (
        <>
            <div className={page["section-left"]}>
                <div className={page["section-body"]}>
                    {children}
                </div>
            </div>
            <div className={page["section-right"]}>
                {settings}
            </div>
        </>
    );
}

export default DetailsEditLayout;