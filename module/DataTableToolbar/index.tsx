import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Input } from "@/components"
import { DataTableToolbarProps } from "./interface"
import { PageTitle } from "../../components/PageTitle"
import { DataTableViewOptions } from "../DataTableViewOptions"
import { DataTableFilters } from "../DataTableFilters"
import { Trash2 } from "lucide-react"
import { deleteManyCourses } from "@/actions/delete-course"
import toast from "react-hot-toast"
import sx from "@/styles/module.module.scss"

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
                            (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="accent" status="fail" disabled={isLoading} ><Trash2 /> Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className={sx["button"]} data-mode="solid" data-variant="primary" data-shade="200" data-status="default" data-size="M" data-content="text">Cancel</AlertDialogCancel>
                                            <AlertDialogAction className={sx["button"]} data-mode="solid" data-variant="accent" data-status="fail" data-size="M" data-content="text" onClick={clickHandler}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )
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