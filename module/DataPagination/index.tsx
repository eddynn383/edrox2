import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { DataPaginationProps } from "./interface";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import sx from "@/styles/module.module.scss"

const DataPagination = <TData, TValue>({ table }: DataPaginationProps<TData>) => {
    return (
        <div className={sx["data-pagination"]}>
            <div className={sx["data-pagination-left"]}>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className={sx["data-pagination-right"]}>
                <div className={sx["data-pagination-rows-per-page"]}>
                    <p>Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger mode="outline" size="S">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top" shade="200">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className={sx["data-pagination-controls"]}>
                    <Button variant="primary" content="icon" size="S" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button variant="primary" content="icon" size="S" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button variant="primary" content="icon" size="S" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button variant="primary" content="icon" size="S" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { DataPagination }