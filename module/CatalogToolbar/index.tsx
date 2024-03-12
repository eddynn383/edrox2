"use client"

import { Button, Icon, PageTitle, Search } from "@/components";
import { CatalogToolbarProps } from "./interaface";
import useScreenSize from "@/hooks/useScreenSize";
import sx from "@/styles/module.module.scss"

const CatalogToolbar = ({ pageTitle }: CatalogToolbarProps) => {
    const screen = useScreenSize()
    const w = screen.width
    const mobile = w < 769 ? true : false
    return (

        <div className={sx["catalog-toolbar"]}>
            {
                pageTitle &&
                <div className={sx["catalog-toolbar-row"]}>
                    <div className={sx["catalog-toolbar-left"]}>
                        <PageTitle title={pageTitle} />
                    </div>
                </div>
            }
            <div className={sx["catalog-toolbar-row"]}>
                <div className={sx["catalog-toolbar-left"]}>
                    <Search />
                    {
                        mobile && <Button variant="primary" shade="200" size="M" content="icon"><Icon name="filter" /></Button>
                    }
                    {/* {
                        mobile && <Button variant="primary" shade="200" size="M" content="icon"><Icon name="columns-3" /></Button>
                    } */}
                </div>
                {
                    !mobile &&
                    <div className={sx["catalog-toolbar-right"]}>    
                        <Button variant="primary" shade="200" size="M" content="icon"><Icon name="columns-3" /></Button>
                        <Button variant="primary" shade="200" size="M" content="icon"><Icon name="filter" /></Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CatalogToolbar;