import { Button, Icon, PageTitle, Search } from "@/components";
import { CatalogToolbarProps } from "./interaface";
import sx from "@/styles/module.module.scss"

const CatalogToolbar = ({ pageTitle }: CatalogToolbarProps) => {
    return (

        <div className={sx["catalog-toolbar"]}>
            {
                pageTitle &&
                <div className={sx["catalog-toolbar-row"]}>
                    <PageTitle title={pageTitle} />
                </div>
            }
            <div className={sx["catalog-toolbar-row"]}>
                <div className={sx["catalog-toolbar-left"]}>
                    <Search />
                </div>
                <div className={sx["catalog-toolbar-right"]}>
                    <Button variant="primary" shade="200" size="M" content="icon"><Icon name="columns-3" /></Button>
                    <Button variant="primary" shade="200" size="M" content="icon"><Icon name="filter" /></Button>
                </div>
            </div>
        </div>
    );
}

export default CatalogToolbar;