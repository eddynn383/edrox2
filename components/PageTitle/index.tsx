import { PageTitleProps } from "./interface";
import page from "./page.module.css"


const PageTitle = ({ title }: PageTitleProps) => {

    return (
        <h1 className={page.title}>{title}</h1>
    );
}

export { PageTitle };