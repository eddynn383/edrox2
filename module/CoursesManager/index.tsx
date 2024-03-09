"use client"

import { useState } from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { DataToolbar } from "../DataToolbar";
import { coursesCols } from "@/lib/table-headers";
import { CoursesManagerProps } from "./interface";
import { DataPagination } from "../DataPagination";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { Plus } from "lucide-react";
import CourseCreationForm from "../CourseCreationForm";

const CoursesManager = ({courses, categories}: CoursesManagerProps) => {
    const [open, setOpen] = useState(false)
    console.log(courses)

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data: courses,
        columns: coursesCols,
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
                pageTitle="Courses"
                showTableColumnsEdit={true} 
                showFilterToggle={true} 
                toolbarExtraActions={
                    <>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button mode="solid" variant="accent" status="default" size="M" >
                                    <Plus /> New
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>New Course</DialogTitle>
                                    <DialogDescription>Use the fields below to create a new course</DialogDescription>
                                </DialogHeader>
                                <DialogBody>
                                    <CourseCreationForm 
                                        categories={categories} 
                                        actions={
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button shade="200" >Cancel</Button>
                                                </DialogClose>
                                                <Button variant="accent" type="submit">Create</Button>
                                            </DialogFooter>
                                        } 
                                        onOpen={setOpen}
                                    />
                                </DialogBody>
                            </DialogContent>
                        </Dialog>
                    </>
                }    
            />
            <DataTable table={table} columns={coursesCols} />
            <DataPagination table={table} />
        </>
    );
}
 
export default CoursesManager;