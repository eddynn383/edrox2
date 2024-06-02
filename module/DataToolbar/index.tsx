import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { Input, Search } from "@/components"
import { DataToolbarProps } from "./interface"
import { DataViewOptions } from "../DataViewOptions"
import { DataFilters } from "../DataFilters"
import { deleteManyCourses } from "@/actions/delete-course"
import useScreenSize from "@/hooks/useScreenSize"
import csx from "@/styles/module.module.scss"

export function DataToolbar<TData>({ table, showTableColumnsEdit, showFilterToggle }: DataToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const model = table.getSelectedRowModel()
    const rows = model.rows
    const isAnyRowSelected = rows.length > 0

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

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

    const outerStyle = {
        "width": deviceWidth <= 768 ? "100%" : "50%",
        // "minWidth": deviceWidth <= 480 ? "none" : "240px", 
        "maxWidth": "480px"
    }

    return (
        <div className={csx["data-toolbar"]}>
            <div className={csx["data-toolbar-row"]}>
                <div className={csx["data-toolbar-left"]}>
                    <Search 
                        containerId="search" 
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className={csx["data-toolbar-right"]}>
                    {showTableColumnsEdit && <DataViewOptions table={table} />}
                    {showFilterToggle && <DataFilters table={table} />}
                </div>
            </div>
        </div>
    )
}