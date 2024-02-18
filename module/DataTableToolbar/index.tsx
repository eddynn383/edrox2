import { Button, Icon, Input } from "@/components"
import { DataTableToolbarProps } from "./interface"
import { PageTitle } from "../../components/PageTitle"
import sx from "@/styles/module.module.scss"

export function DataTableToolbar<TData>({ table, pageTitle }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className={sx["data-table-toolbar"]}>
            {
                pageTitle &&
                <div className={sx["data-table-toolbar-row"]}>
                    <PageTitle title={pageTitle} />
                </div>
            }
            <div className={sx["data-table-toolbar-row"]}>
                <div className={sx["data-table-toolbar-left"]}>
                    <Input
                        type="text"
                        shade="200"
                        placeholder="Search..."
                        iconBefore="search"
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className={sx["data-table-toolbar-right"]}>
                    <Button variant="accent" size="M" content="icon-text"><Icon name="plus" /> New</Button>
                    <Button variant="primary" shade="200" size="M" content="icon"><Icon name="columns-3" /></Button>
                    <Button variant="primary" shade="200" size="M" content="icon"><Icon name="filter" /></Button>
                </div>
            </div>
        </div>
    )
}