"use client"

import { Suspense, useState } from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { DataToolbar } from "../DataToolbar";
import { coursesColsDesktop, coursesColsDesktopSmall, coursesColsMobile, coursesColsTablet } from "@/lib/table-headers";
import { CoursesManagerProps } from "./interface";
import { DataPagination } from "../DataPagination";
import useScreenSize from "@/hooks/useScreenSize";
import msx from "@/styles/module.module.scss"

export const CoursesManager = ({ courses, categories, device }: CoursesManagerProps) => {
    const [open, setOpen] = useState(false)

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const desktop = deviceWidth >= 1024 ? true : false

    // console.log("IS DESKTOP: ", desktop)

    let tableContent;

    switch (true) {
        case deviceWidth <= 1440: tableContent = coursesColsDesktopSmall
            break;
        case deviceWidth <= 1024: tableContent = coursesColsTablet
            break;
        case deviceWidth <= 768: tableContent = coursesColsMobile
            break;
        default: tableContent = coursesColsDesktop
            break;
    }

    // console.log(tableContent)

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data: courses,
        columns: device !== "mobile" ? coursesColsDesktop : coursesColsMobile,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            rowSelection,
            columnFilters
        }
    })

    return (
        <>
            <DataToolbar
                table={table}
                showTableColumnsEdit={true}
                showFilterToggle={true}
            />
            <Suspense fallback={<p>Loading Table...</p>}>
                <DataTable table={table} columns={tableContent} />
            </Suspense>
            {/* {!desktop && <DataTableMobile table={table} columns={coursesColsMobile}/>} */}
            <DataPagination table={table} />
        </>
    );
}