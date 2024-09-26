
import psx from "@/styles/page.module.scss"

const Page = async ({ params }: { params: { courseId: string } }) => {

    return (
        <>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <h1>Notifications</h1>
                </div>
            </section>
        </>
    )
}

export default Page;