import { BarChart, Clock, FileBadge, ListChecks, MoreVertical, PlusCircle } from "lucide-react";
import { Button, Cover, Playlist, ScrollArea } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import ChaptersViewList from "../ChapterViewList";
import TutorsViewList from "../TutorsViewList";
import { getTutor } from "@/actions/tutor";
import { convertDuration } from "@/lib/utils";
import msx from "@/styles/module.module.scss";
import csx from "@/styles/component.module.scss"
import { ChapterModal } from "../ChapterModal";
import { Suspense } from "react";
import { TutorsModal } from "../TutorsModal";

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
    status: string;
    duration: number;
    isFree: boolean;
}

type Chapters = {
    chaptersData: Chapter[];
    countChapters: number;
    sumOfChaptersDuration: number;
}

interface CourseDetailsProps {
    courseId: string;
    tutors?: Tutor[];
    chapters: Chapters;
    edit?: boolean;
}

const CourseDetails = ({ courseId, tutors, chapters, edit=false }: CourseDetailsProps) => {
    // console.log("TUTORS: ", tutors);
    // console.log("CHAPTERS: ", chapters)

    const {
        chaptersData,
        countChapters,
        sumOfChaptersDuration
    } = chapters

    return ( 
        <div className={msx["course-details-body"]}>
            {
                !edit &&
                <>
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
                            <Suspense fallback={<p>Loading playlist...</p>}>
                            {
                                chapters && 
                                <div className={msx["chapters-view-list"]}>
                                    <Playlist data={chaptersData} target={`${courseId}/chapter`} />
                                </div>
                            }
                            </Suspense>
                        </div>
                    </section>
                    <section className={msx["tutors-view"]}>
                        <h2>Tutors</h2> 
                        {
                            tutors && 
                            <TutorsViewList tutors={tutors}/>
                        }
                    </section>
                </>
            }
            {
                edit &&
                <>
                    <section className={msx["chapters-view"]}>
                        <div className={msx["chapters-view-top"]}>
                            <h2>Chapters</h2>
                            <ChapterModal id={courseId} />
                        </div>
                        <div className={msx["chapters-view-bottom"]}>
                            <Suspense fallback={<p>Loading playlist...</p>}>
                            {
                                chapters && 
                                <div className={msx["chapters-view-list"]}>
                                    <Playlist courseId={courseId} data={chaptersData} target={`${courseId}/chapter`} edit={edit}/>
                                </div>
                            }
                            </Suspense>
                        </div>
                    </section>
                    <section className={msx["tutors-edit"]}>
                        <div className={msx["tutors-edit-top"]}>
                            <h2>Tutors</h2> 
                            <TutorsModal id={courseId} />
                        </div>
                        <div className={msx["tutors-edit-bottom"]}>
                            <Suspense fallback={<p>Loading tutors...</p>}>
                                {
                                    tutors && 
                                    <TutorsViewList tutors={tutors}/>
                                }
                            </Suspense>
                        </div>
                    </section>
                </>
            }
        </div>
    );
}
 
export { CourseDetails };