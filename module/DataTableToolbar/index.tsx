import { useEffect, useState } from "react"
import { Button, Input } from "@/components"
import { DataTableToolbarProps } from "./interface"
import { PageTitle } from "../../components/PageTitle"
import { DataTableViewOptions } from "../DataTableViewOptions"
import { DataTableFilters } from "../DataTableFilters"
import { Trash2 } from "lucide-react"
import sx from "@/styles/module.module.scss"
import { deleteManyCourses } from "@/actions/delete-course"

export function DataTableToolbar<TData>({ table, pageTitle, toolbarExtraActions, showTableColumnsEdit, showFilterToggle }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const model = table.getSelectedRowModel()
    const rows = model.rows
    const isAnyRowSelected = rows.length > 0

    useEffect(() => {
        const ids = rows.map((row: any) => row.original.id); // Extract IDs assuming they're in the 'id' property
        setSelectedRows(ids)
    }, [rows])
    
        console.log(selectedRows)

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
                {
                    toolbarExtraActions && 
                    <div className={sx["data-table-toolbar-right"]}>
                        { isAnyRowSelected && <Button variant="accent" status="fail" onClick={() => deleteManyCourses(selectedRows)}><Trash2 /> Delete</Button>}
                        {toolbarExtraActions}
                        {showTableColumnsEdit && <DataTableViewOptions table={table} />}
                        {showFilterToggle && <DataTableFilters table={table} />}
                    </div>
                }
            </div>
        </div>
    )
}