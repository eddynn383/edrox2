// "use client"

import { Cover } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import msx from "@/styles/module.module.scss";
import ChaptersViewList from "../ChapterViewList";
import TutorsViewList from "../TutorsViewList";
import { getTutor } from "@/actions/tutor";
import { convertDuration } from "@/lib/utils";
import { BarChart, Clock, FileBadge, ListChecks } from "lucide-react";

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

type ChapterData = {
    chapters: Chapter[];
    countChapters: number;
    sumOfChaptersDuration: number;
}

interface CourseDetailsProps {
    tutors?: Tutor[];
    chaptersData: ChapterData;
}

const CourseDetails = ({ tutors, chaptersData }: CourseDetailsProps) => {
    console.log("TUTORS: ", tutors);
    console.log("CHAPTERS: ", chaptersData)

    const {
        chapters,
        countChapters,
        sumOfChaptersDuration
    } = chaptersData

    return ( 
        <div className={msx["course-details-body"]}>
            <section className={msx["course-details-card-metadata"]}>
                <ul className={msx["course-details-card-metadata-list"]}>
                    <li className={msx["course-details-card-metadata-list-item"]}>
                        <div className={msx["course-details-card-metadata-left"]}>
                            <BarChart />
                        </div>
                        <div className={msx["course-details-card-metadata-right"]}>
                            <span className={msx["course-details-card-metadata-label"]}>Skill</span>
                            <span className={msx["course-details-card-metadata-value"]}>Advanced</span>
                        </div>
                    </li>
                    <li className={msx["course-details-card-metadata-list-item"]}>
                        <div className={msx["course-details-card-metadata-left"]}>
                            <Clock />
                        </div>
                        <div className={msx["course-details-card-metadata-right"]}>
                            <span className={msx["course-details-card-metadata-label"]}>Duration</span>
                            <span className={msx["course-details-card-metadata-value"]}>15 Hours</span>
                        </div>
                    </li>
                    <li className={msx["course-details-card-metadata-list-item"]}>
                        <div className={msx["course-details-card-metadata-left"]}>
                            <FileBadge />
                        </div>
                        <div className={msx["course-details-card-metadata-right"]}>
                            <span className={msx["course-details-card-metadata-label"]}>Certificate</span>
                            <span className={msx["course-details-card-metadata-value"]}>Digital</span>
                        </div>
                    </li>
                    <li className={msx["course-details-card-metadata-list-item"]}>
                        <div className={msx["course-details-card-metadata-left"]}>
                            <ListChecks />
                        </div>
                        <div className={msx["course-details-card-metadata-right"]}>
                            <span className={msx["course-details-card-metadata-label"]}>Prerequisites</span>
                            <span className={msx["course-details-card-metadata-value"]}>None</span>
                        </div>
                    </li>
                </ul>
            </section>
            <section className={msx["chapters-view"]}>
                <div className={msx["chapters-view-top"]}>
                    <h2>Chapters</h2>
                    <span className={msx["chapters-view-meta"]}>
                        <span className={msx["chapters-view-meta-item"]}>{countChapters} {countChapters === 1 ? "Chapter" : "Chapters"}</span>
                        <span className={msx["chapters-view-meta-item"]}>{convertDuration(sumOfChaptersDuration)}</span>
                    </span>
                </div>
                <div className={msx["chapters-view-bottom"]}>
                    { 
                        chaptersData && <ChaptersViewList chapters={chapters} />
                    }
                </div>
            </section>
            <section className={msx["tutors-view"]}>
                <h2>Tutors</h2> 
                {
                    tutors && <TutorsViewList tutors={tutors}/>
                }
            </section>
        </div>
    );
}
 
export { CourseDetails };