import { getFirstGroupByCourseId } from "@/data/groups"
import { redirect } from "next/navigation"

export interface ParticipantsPageProps {
    params: {
        courseId: string,
    }
}

export default async function ParticipantsPage({ params }: ParticipantsPageProps) {

    const { courseId } = params

    const firstGroup = await getFirstGroupByCourseId(courseId)

    redirect(`/management/courses/${courseId}/edit/participants/${firstGroup?.id}`)

}