import { PageTitleProps } from "./interface";
import { Heading } from "@/components"
import page from "./page.module.css"


const PageTitle = ({ title }: PageTitleProps) => {

    return (
        <Heading rank={1}>{title}</Heading>
    );
}

export { PageTitle };