import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Input, Search } from "@/components"
import { DataToolbarProps } from "./interface"
import { PageTitle } from "../../components/PageTitle"
import { DataViewOptions } from "../DataViewOptions"
import { DataFilters } from "../DataFilters"
import { Trash2 } from "lucide-react"
import { deleteManyCourses } from "@/actions/delete-course"
import toast from "react-hot-toast"
import csx from "@/styles/module.module.scss"

export function DataToolbar<TData>({ table, pageTitle, toolbarExtraActions, showTableColumnsEdit, showFilterToggle }: DataToolbarProps<TData>) {
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
        <div className={csx["data-toolbar"]}>
            {
                pageTitle &&
                <div className={csx["data-toolbar-row"]}>
                    <PageTitle title={pageTitle} />
                </div>
            }
            <div className={csx["data-toolbar-row"]}>
                <div className={csx["data-toolbar-left"]}>
                    <Input
                        type="text"
                        mode="outline"
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
                    <div className={csx["data-toolbar-right"]}>
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
                                            <AlertDialogCancel asChild>
                                                <div>
                                                    <Button shade="200">Cancel</Button>
                                                </div>
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <div>
                                                    <Button variant="accent" status="fail" onClick={clickHandler}>Delete</Button>
                                                </div>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )
                        }
                        {toolbarExtraActions}
                        {showTableColumnsEdit && <DataViewOptions table={table} />}
                        {showFilterToggle && <DataFilters table={table} />}
                    </div>
                }
            </div>
        </div>
    )
}