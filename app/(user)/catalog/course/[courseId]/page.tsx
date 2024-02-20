const Page = ({ params }: { params: { courseId: string } }) => {
    return <span>{params.courseId}</span>
}

export default Page;