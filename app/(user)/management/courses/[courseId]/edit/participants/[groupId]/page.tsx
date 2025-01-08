import { Avatar, Button, Card, CardContent, CardFooter, CardHeader, ScrollArea, Text } from "@/components";
import { getAllUsers, getAllUsersByRole, getUsersByCourseGroupId } from "@/data/users";
import { CourseParticipantsSelection } from "@/module/CourseParticipantsSelection";
import { CourseSelectedUsers } from "@/module/CourseSelectedUsers";
import page from "@/styles/page.module.css"
import { Trash2 } from "lucide-react";

interface GroupPageProps {
    params: {
        courseId: string;
        groupId: string;
    },
}

const GroupPage = async ({ params }: GroupPageProps) => {
    const { courseId, groupId } = params
    // const chapters = await getAllGroupsByCourseId(courseId)
    const users = await getAllUsersByRole("LEARNER", courseId)
    const groupUsers = await getUsersByCourseGroupId(groupId)

    // console.log("groupUsers: ", groupUsers)
    // console.log("users to add: ", users)

    return (
        <div className={page["courses-groups-users"]}>
            {/* <div className={page["section-header"]}>
                <ChapterSelection courseId={courseId} chapters={chapters} />
                <Button content="icon" size="S"><PanelRightOpen /></Button>
            </div> */}
            {
                (groupUsers?.length === 0) ? (
                    <div className={page.empty}>
                        <p>This group it seems to be empty</p>
                        <div className={page["empty-actions"]}>
                            {/* <CourseChapterCreation courseId={courseId}> */}
                            <CourseParticipantsSelection courseId={courseId} groupId={groupId} users={users}>
                                <Button variant="accent" status="brand">Add participants</Button>
                            </CourseParticipantsSelection>
                            {/* </CourseChapterCreation> */}
                        </div>
                    </div>
                ) : (
                    <CourseSelectedUsers courseId={courseId} groupId={groupId} groupUsers={groupUsers} users={users} />
                )
            }
            {/* <div className={page.inner}>
                <div className={page["section-body"]}>
                </div>
            </div> */}
        </div>
    )
}

export default GroupPage;