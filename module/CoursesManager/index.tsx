"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable, DataTableMobile } from "../DataTable";
import { DataToolbar } from "../DataToolbar";
import { coursesColsDesktop, coursesColsDesktopSmall, coursesColsMobile, coursesColsTablet } from "@/lib/table-headers";
import { CoursesManagerProps } from "./interface";
import { DataPaginationDesktop } from "../DataPagination";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "@/components";
import { CourseCreationForm } from "../CourseCreationForm";
import useScreenSize from "@/hooks/useScreenSize";
import msx from "@/styles/module.module.scss"

const CoursesManager = ({courses, categories, device}: CoursesManagerProps) => {
    const [open, setOpen] = useState(false)

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const desktop = deviceWidth >= 1024 ? true : false

    console.log("IS DESKTOP: ", desktop)

    console.log(courses)

    let tableContent;

    switch (true) {
        case deviceWidth <= 1440 : tableContent = coursesColsDesktopSmall
            break;
        case deviceWidth <= 1024 : tableContent = coursesColsTablet
            break;
        case deviceWidth <= 768 : tableContent = coursesColsMobile
            break;
        default: tableContent = coursesColsDesktop
            break; 
    }

    console.log(tableContent)

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
                pageTitle="Courses"
                showTableColumnsEdit={true} 
                showFilterToggle={true} 
                toolbarExtraActions={ 
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
                    // <>
                    //     {
                    //         (desktop && device !== "mobile") && (
                    //             <Dialog open={open} onOpenChange={setOpen}>
                    //                 <DialogTrigger asChild>
                    //                     <Button mode="solid" variant="accent" status="default" size="M" >
                    //                         <Plus /> New
                    //                     </Button>
                    //                 </DialogTrigger>
                    //                 <DialogContent>
                    //                     <DialogHeader>
                    //                         <DialogTitle>New Course</DialogTitle>
                    //                         <DialogDescription>Use the fields below to create a new course</DialogDescription>
                    //                     </DialogHeader>
                    //                     <DialogBody>
                    //                         <CourseCreationForm 
                    //                             categories={categories} 
                    //                             actions={
                    //                                 <DialogFooter>
                    //                                     <DialogClose asChild>
                    //                                         <Button shade="200" >Cancel</Button>
                    //                                     </DialogClose>
                    //                                     <Button variant="accent" type="submit">Create</Button>
                    //                                 </DialogFooter>
                    //                             } 
                    //                             onOpen={setOpen}
                    //                         />
                    //                     </DialogBody>
                    //                 </DialogContent>
                    //             </Dialog>
                    //         )
                    //     }
                    //     {
                    //         (!desktop && device === "mobile") && (
                    //             <Drawer open={open} onOpenChange={setOpen}>
                    //                 <DrawerTrigger asChild>
                    //                     <Button mode="solid" variant="accent" status="default" size="M" >
                    //                         <Plus /> New
                    //                     </Button>
                    //                 </DrawerTrigger>
                    //                 <DrawerContent>
                    //                     <DrawerHeader className="text-left">
                    //                         <DrawerTitle>Edit profile</DrawerTitle>
                    //                         <DrawerDescription>
                    //                             Make changes to your profile here. Click save when you&apos;re done.
                    //                         </DrawerDescription>
                    //                     </DrawerHeader>
                    //                     <CourseCreationForm 
                    //                             categories={categories} 
                    //                             actions={
                    //                                 <DrawerFooter className="pt-2">
                    //                                     <DrawerClose asChild>
                    //                                         <Button shade="200" >Cancel</Button>
                    //                                     </DrawerClose>
                    //                                     <Button variant="accent" type="submit">Create</Button>
                    //                                 </DrawerFooter>
                    //                             } 
                    //                             onOpen={setOpen}
                    //                         />
                    //                 </DrawerContent>
                    //             </Drawer>
                    //         )
                    //     }
                    // </>                       
                }    
            />
            {desktop && <DataTable table={table} columns={tableContent} />}
            {!desktop && <DataTableMobile table={table} columns={coursesColsMobile}/>}
            {desktop && <DataPaginationDesktop table={table} />}
        </>
    );
}
 
export default CoursesManager;