import { useEffect, useState } from "react"
import { Button, Input } from "@/components"
import { DataTableToolbarProps } from "./interface"
import { PageTitle } from "../../components/PageTitle"
import { DataTableViewOptions } from "../DataTableViewOptions"
import { DataTableFilters } from "../DataTableFilters"
import { Trash2 } from "lucide-react"
import { deleteManyCourses } from "@/actions/delete-course"
import sx from "@/styles/module.module.scss"
import toast from "react-hot-toast"
import { ConfirmModal } from "../ConfirmationModal"

export function DataTableToolbar<TData>({ table, pageTitle, toolbarExtraActions, showTableColumnsEdit, showFilterToggle }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const model = table.getSelectedRowModel()
    const rows = model.rows
    const isAnyRowSelected = rows.length > 0

    useEffect(() => {
        const ids = rows.map((row: any) => row.original.id); // Extract IDs assuming they're in the 'id' property
        setSelectedRows(ids)
    }, [rows])
    
        console.log(selectedRows)

    const clickHandler = () => {
        try {
            setIsLoading(true)
            deleteManyCourses(selectedRows)
            table.toggleAllPageRowsSelected(false)
            toast.success("Course deleted");
        } catch (error) {
            toast.error("Something went wrong");
            
        } finally {
            setIsLoading(false)
        }
    }

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
                        { isAnyRowSelected && 
                        <ConfirmModal onConfirm={clickHandler}>
                            <Button variant="accent" status="fail" disabled={isLoading}><Trash2 /> Delete</Button>
                        </ConfirmModal>
                        }
                        {toolbarExtraActions}
                        {showTableColumnsEdit && <DataTableViewOptions table={table} />}
                        {showFilterToggle && <DataTableFilters table={table} />}
                    </div>
                }
            </div>
        </div>
    )
}