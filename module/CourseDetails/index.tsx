// "use client"

import { Cover } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import msx from "@/styles/module.module.scss";
import ChaptersViewList from "../ChapterViewList";
import TutorsViewList from "../TutorsViewList";
import { getTutor } from "@/actions/tutor";

type Tutor = {
    tutorId: string;
    // name: string;
    // image: string | null;
}

type Chapter = {
    id: string;
    title: string;
    description: string | null;
    isPublished: boolean;
    videoUrl: string | null;
    status: string;
    duration: number;
    isFree: boolean;
}

interface CourseDetailsProps {
    tutors?: Tutor[];
    chapters?: Chapter[];
}

const CourseDetails = ({ tutors, chapters }: CourseDetailsProps) => {
    console.log("TUTORS: ", tutors);
    console.log("CHAPTERS: ", chapters)
    return ( 
        <div className={msx["course-details-body"]}>
            <section className={msx["tutors-view"]}>
                <h2>Tutors</h2>
                {
                    tutors && <TutorsViewList tutors={tutors}/>
                }
            </section>
            <section className={msx["chapters-view"]}>
                <h2>Chapters</h2>
                { 
                    chapters && <ChaptersViewList chapters={chapters} />
                }
            </section>
        </div>
    );
}
 
export { CourseDetails };