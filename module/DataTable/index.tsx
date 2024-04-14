"use client"

import { flexRender } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, ScrollArea, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components";
import { DataTableProps } from "./interaface";
import msx from "@/styles/module.module.scss"



const DataTable = <TData, TValue>({ columns, table }: DataTableProps<TData, TValue>) => {

    return (
        <div className={msx["data-table"]} data-device="desktop">
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                                    {
                                        row.getVisibleCells().map((cell) => {

                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>No results.</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

const DataTableMobile = <TData, TValue>({ columns, table }: DataTableProps<TData, TValue>) => {

    return (
        <div className={msx["data-table"]} data-device="mobile">
            <div className={msx["data-table-selection-label"]}>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <ScrollArea>
                <ul className={msx["data-table-list"]}>
                    {/* <TableHeader>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} >
                                    {
                                        headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {
                                                        header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                    }
                                                </TableHead>
                                            )
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader> */}

                    {
                        table.getRowModel().rows?.length && (
                            table.getRowModel().rows.map((row) => (
                                <li key={row.id}>
                                    <Card data-state={row.getIsSelected() && "selected"} >
                                        {
                                            row.getVisibleCells().map((cell) => {

                                                return (
                                                    <div key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Card>
                                </li>
                            ))
                        ) 
                        // : (
                        //     <Card>
                        //         <CardDescription>No results.</CardDescription>
                        //     </Card>
                        // )
                    }
                </ul>
            </ScrollArea>
        </div>
    );
}

export { DataTable, DataTableMobile };