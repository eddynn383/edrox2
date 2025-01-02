import { auth } from "@/auth";
import { getUserById } from "@/data/users";
import FormProfile from "@/module/FormProfile";
import psx from "@/styles/page.module.scss"

const Page = async () => {

    const session = await auth()
    const sessionUser = session?.user
    const userId = sessionUser?.id
    if (!userId) throw new Error("User is not defined");

    const user = await getUserById(userId)

    const defaultValues = {
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.bio || "",
        address: user?.address || "",
        birthdate: user?.birthdate || ""
    }

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-left"]}>
                    <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "gap": "12px" }}>
                        <h1>Profile</h1>
                    </div>
                </div>
                <div className={psx["body-toolbar-right"]}>

                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <FormProfile userId={userId} defaultValues={defaultValues} />
                </div>
            </section>
        </div>
    )
}

export default Page;