"use client"

import { Suspense, useState } from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import useScreenSize from "@/hooks/useScreenSize";
import { DataTable } from "../DataTable";
import { DataToolbar } from "../DataToolbar";
import { categoriesColsDesktop, categoriesColsDesktopSmall, categoriesColsMobile, categoriesColsTablet } from "@/lib/table-headers";
import { DataPagination } from "../DataPagination";
import { CategoryManagerProps } from "./interface";

export const CategoryManager = ({ categories, device }: CategoryManagerProps) => {

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    let tableContent;

    switch (true) {
        case deviceWidth <= 1440: tableContent = categoriesColsDesktopSmall
            break;
        case deviceWidth <= 1024: tableContent = categoriesColsTablet
            break;
        case deviceWidth <= 768: tableContent = categoriesColsMobile
            break;
        default: tableContent = categoriesColsDesktop
            break;
    }

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data: categories,
        columns: device !== "mobile" ? categoriesColsDesktop : categoriesColsMobile,
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
            <DataPagination table={table} />
        </>
    );
}