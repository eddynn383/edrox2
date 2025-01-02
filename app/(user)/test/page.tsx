import { Button, PageTitle, ScrollArea, SkeletonCard } from "@/components";
import psx from "@/styles/page.module.scss"
import msx from "@/styles/module.module.scss"

const sizeOptions = ["M"];
const modeOptions = ["solid", "outline", "text"];
const variantOptions = ["primary", "accent"];
const shadeOptions = ["100", "200"];
const statusOptions = ["default", "success", "fail", "warning", "info"];

// Generate all combinations

const Page = async () => {

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <PageTitle title="Test" />
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <ScrollArea>
                        <div className={msx["catalog"]}>
                            <ul className={msx["catalog-list"]}>
                                {
                                    [...Array(12)].map((item, idx) => (
                                        <li key={idx}>
                                            <SkeletonCard />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </ScrollArea>
                </div>
            </section>
        </>
    )
}

export default Page;