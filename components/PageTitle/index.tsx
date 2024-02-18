import { PageTitleProps } from "./interface";
import sx from "@/styles/component.module.scss"

const PageTitle = ({ title }: PageTitleProps) => {

    return (
        <h1 className={sx["page-title"]}>{title}</h1>
    );
}

export { PageTitle };