"use client"

import { Course } from "@/interfaces/course"
import { ColumnDef } from "@tanstack/react-table"
import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Icon } from "@/components"
import { FileBarChart, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import sx from "@/styles/component.module.scss"


export const coursesCols: ColumnDef<Course>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                mode="outline"
                shade="200"
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                mode="outline"
                shade="200"
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: () => <span>Title</span>,
        cell: ({ row }) => {

            return <span>{row.getValue("title")}</span>
        }
    },
    {
        accessorKey: "isPublished",
        header: "Is Publish?",
    },
    {
        accessorKey: "chapters",
        header: "Chapters",
        cell: ({ row }) => {
            const chapters: any[] = row.getValue("chapters")

            if (!chapters) {
                return 0
            }
            console.log(chapters)

            return chapters.length
        }
    },
    {
        accessorKey: "price",
        header: () => <div>Price </div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div>{formatted} </div>
        },
    },
    {
        accessorKey: "tutor",
        header: "Tutor",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="primary" shade="100" size="S" content="icon">
                            <MoreHorizontal className={sx["icon"]} />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent shade="100" align="end">
                        <DropdownMenuItem><Pencil /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><FileBarChart /> Report</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Trash2 /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]