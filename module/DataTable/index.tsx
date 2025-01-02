"use client"

import { flexRender } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, ScrollArea, Table, TableBody, TableTd, TableTh, TableHeader, TableTr } from "@/components";
import { DataTableProps } from "./interaface";
import msx from "@/styles/module.module.scss"



const DataTable = <TData, TValue>({ columns, table }: DataTableProps<TData, TValue>) => {

    return (
        <div className={msx["data-table"]} data-device="desktop">
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableTr key={headerGroup.id} >
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableTh key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </TableTh>
                                        )
                                    })
                                }
                            </TableTr>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableTr key={row.id} data-state={row.getIsSelected() && "selected"} >
                                    {
                                        row.getVisibleCells().map((cell) => {

                                            return (
                                                <TableTd key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableTd>
                                            )
                                        })
                                    }
                                </TableTr>
                            ))
                        ) : (
                            <TableTr>
                                <TableTd colSpan={columns.length}>No results.</TableTd>
                            </TableTr>
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
            <div className={msx["data-toolbar"]}>
                <div className={msx["data-toolbar-row"]}>
                    <div className={msx["data-toolbar-left"]}>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <div key={headerGroup.id} >
                                    {
                                        headerGroup.headers.map((header) => {
                                            if (header.id === "select") {
                                                return (
                                                    <div key={header.id}>
                                                        {
                                                            header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )
                                                        }
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className={msx["data-toolbar-right"]}>
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                </div>
            </div>
            <ScrollArea>
                <ul className={msx["data-table-list"]}>
                    {
                        table.getRowModel().rows?.length && (
                            table.getRowModel().rows.map((row) => (
                                <li key={row.id}>
                                    <Card padding="400" gap="200" data-state={row.getIsSelected() && "selected"} mode="solid" >
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
                    }
                </ul>
            </ScrollArea>
        </div>
    );
}

export { DataTable, DataTableMobile };