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
import { TableManagerProps } from "./interface";
import { DataPagination } from "../DataPagination";

export const TableManager = ({ data, columns, target }: TableManagerProps) => {

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
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
                target={target}
            />
            <Suspense fallback={<p>Loading Table...</p>}>
                <DataTable table={table} columns={columns} />
            </Suspense>
            {/* {!desktop && <DataTableMobile table={table} columns={coursesColsMobile}/>} */}
            <DataPagination table={table} />
        </>
    );
}