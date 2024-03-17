import psx from "@/styles/page.module.scss"

const Page = async () => {

    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <h1>Settings</h1>
                </div>
            </section>
        </div>
    )
}

export default Page;