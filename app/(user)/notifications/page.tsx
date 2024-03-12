
import psx from "@/styles/page.module.scss"

const Page = async ({ params }: { params: { courseId: string } }) => {

    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <h1>Notifications</h1>
                </div>
            </section>
        </div>
    )
}

export default Page;