
import { Filter, Home } from "lucide-react";
import { Suspense } from "react";
import { getAllCategories } from "@/data/categories";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, PageTitle, ScrollArea } from "@/components";
import { CategoryManager } from "@/module/CategoryManager";
import { CategoryCreation } from "@/module/CategoryCreation";
import psx from "@/styles/page.module.scss";

type SearchParams = Promise<{ [key: string]: string }>

interface CategoriesPageProps {
    searchParams: SearchParams
}

const Page = async (props: CategoriesPageProps) => {
    const searchParams = await props.searchParams
    const categories = await getAllCategories();

    console.log(categories)
    // const categories: any = []

    // const PageActions = [{
    //     id: "a1",
    //     element: <Filter />
    // }]

    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        title: "Admin",
        children: "Admin",
        separator: "false"
    }]

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-row"]}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Management</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <PageTitle title="Categories" />
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <CategoryCreation />
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={<p>Loading category table...</p>}>
                        <CategoryManager categories={categories || []} device={searchParams.viewport} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;