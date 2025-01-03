import { Heading, Playlist } from "@/components";
import { TutorsList } from "../TutorsList";
import { getTutor } from "@/actions/tutor";
import { convertDuration } from "@/lib/utils";
import { ChapterModal } from "../ChapterModal";
import { Suspense } from "react";
import { TutorsModal } from "../TutorsModal";
import { MetadataList } from "../MetadataList";
import { MetadataModal } from "../MetadataModal";
import { Chapter } from "@/interfaces/global";
import courseSx from "./course-details.module.css"

type Tutor = {
    tutorId: string;
    // name: string;
    // image: string | null;
}

// type Chapter = {
//     id: string;
//     title: string;
//     description: string | null;
//     isPublished: boolean;
//     status: string;
//     duration: number;
//     isFree: boolean;
// }

type Chapters = {
    chaptersData: Chapter[];
    countChapters: number;
    sumOfChaptersDuration: number;
}

interface CourseDetailsProps {
    courseId: string;
    tutors: Tutor[];
    chapters: Chapters;
    metadata: any;
    edit?: boolean;
}

interface CourseChaptersProps {
    data: Chapters;
    courseId: string;
    edit?: boolean;
}

interface CourseTutorsProps {
    data: Tutor[];
    courseId: string;
    edit?: boolean;
}

interface CourseMetadataProps {
    data: any[];
    courseId: string;
    edit?: boolean;
}

const CourseDetails = ({ courseId, tutors, chapters, metadata, edit = false }: CourseDetailsProps) => {
    // console.log("TUTORS: ", tutors);
    // console.log("CHAPTERS: ", chapters)



    return (
        <div className={courseSx.body}>
            <CourseMetadata courseId={courseId} data={metadata} edit={edit} />
            <CourseChapters courseId={courseId} data={chapters} edit={edit} />
            <CourseTutors courseId={courseId} data={tutors} edit={edit} />
        </div>
    );
}


const CourseChapters = ({ data, courseId, edit = false }: CourseChaptersProps) => {
    const {
        chaptersData,
        countChapters,
        sumOfChaptersDuration
    } = data

    return (

        <section className={courseSx.chapters} data-state={edit ? "edit" : "view"}>
            <div className={courseSx.top}>
                <Heading rank={2}>Course content</Heading>
                <span className={courseSx.counter}>
                    <span className={courseSx.label}>{countChapters} {countChapters === 1 ? "Chapter" : "Chapters"}</span>
                    <span className={courseSx.value}>{convertDuration(sumOfChaptersDuration)}</span>
                </span>

            </div>
            <div className={courseSx.bottom}>
                <Suspense fallback={<p>Loading playlist...</p>}>
                    {
                        data &&
                        <div className={courseSx.playlist}>
                            <Playlist items={chaptersData} courseId={courseId} currentPath={`${courseId}/chapter`} />
                        </div>
                    }
                </Suspense>
            </div>
        </section>
    );
}

const CourseTutors = ({ data, courseId, edit = false }: CourseTutorsProps) => {
    return (
        <section className={courseSx.tutors} data-state={edit ? "edit" : "view"} >
            <div className={courseSx.top}>
                <h2 className={courseSx.title}>Tutors</h2>
                <Heading rank={2}>Course content</Heading>
            </div>
            <div className={courseSx.bottom}>
                {
                    data &&
                    <TutorsList tutors={data} />
                }
                {
                    !data &&
                    <p>Tutors are not available!</p>
                }
            </div>
        </section>
    );
}

const CourseMetadata = ({ data, courseId, edit = false }: CourseMetadataProps) => {
    return (
        <section className={courseSx.metadata} data-state={edit ? "edit" : "view"}>
            <div className={courseSx.top}>
                <h2 className={courseSx.title}>Metadata</h2>
                {edit && <MetadataModal id={courseId} />}
            </div>
            <div className={courseSx.bottom}>
                {
                    data &&
                    <MetadataList data={data} edit={edit} />
                }
            </div>
        </section>
    );
}

export { CourseDetails, CourseChapters, CourseTutors, CourseMetadata };