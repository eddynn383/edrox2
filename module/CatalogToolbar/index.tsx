"use client"

import { Button, Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Icon, PageTitle, Search, Text } from "@/components";
import { CatalogToolbarProps } from "./interaface";
import useScreenSize from "@/hooks/useScreenSize";
import sx from "@/styles/module.module.scss"
import { Toggle } from "@/components/Toggle";
import { Italic, LayoutGrid, Plus, Rows3 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ToggleGroup";
import { Anchor as Link } from "@/components/Link";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const CatalogToolbar = ({ pageTitle }: CatalogToolbarProps) => {
    const screen = useScreenSize()
    const w = screen.width
    const mobile = w < 769 ? true : false

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

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
                    <Search containerId="catalog-search" />
                    {
                        mobile && <Button variant="primary" size="M" content="icon"><Icon name="filter" /></Button>
                    }
                    {/* {
                        mobile && <Button variant="primary" size="M" content="icon"><Icon name="columns-3" /></Button>
                    } */}
                </div>
                {
                    !mobile &&
                    <div className={sx["catalog-toolbar-right"]}>
                        {/* <Toggle size="S" mode="solid" variant="primary" status="brand" content="icon" aria-label="Toggle View">
                            <Italic />
                        </Toggle> */}
                        <ToggleGroup content="icon" status="brand" mode="outline" size="S" type="single" defaultValue="Grid View">
                            <ToggleGroupItem value="Grid View" aria-label="Grid View" mode="text" onClick={() => {
                                router.push(pathname + '?' + createQueryString('view', "grid"))
                            }}>
                                <LayoutGrid />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="List View" aria-label="List View" mode="text" onClick={() => {
                                router.push(pathname + '?' + createQueryString('view', "list"))
                            }}>
                                <Rows3 />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <Button mode="outline" variant="primary" size="M" content="icon" aria-label="Change Layout"><Icon name="columns-3" /></Button>
                        <Button mode="outline" variant="primary" size="M" content="icon" aria-label="Filters Toggle"><Icon name="filter" /></Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CatalogToolbar;