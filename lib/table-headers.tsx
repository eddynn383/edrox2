"use client"

import { Course } from "@/interfaces/course"
import { ColumnDef } from "@tanstack/react-table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Checkbox, Cover, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Icon } from "@/components"
import { FileBarChart, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { deleteCourseById } from "@/data/courses"
import { deleteCourse } from "@/actions/delete-course"
import { Switch } from "@/components/Switch"
import { editCourse } from "@/actions/edit-course"
import csx from "@/styles/component.module.scss"
import { formatDate } from "./utils"


// const clickHandler = () => {
//     try {
//         setIsLoading(true)
//         deleteManyCourses(selectedRows)
//         table.toggleAllPageRowsSelected(false)
//         toast.success("Course deleted");
//     } catch (error) {
//         toast.error("Something went wrong");
        
//     } finally {
//         setIsLoading(false)
//     }
// }

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
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                mode="outline"
                shade="200"
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                }}
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
            const image: React.ReactNode = row.original.image
            const cover = image ? image : "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            const title: string = row.getValue("title")
            console.log(title)
            const localStyle = {
                "display": "grid", 
                "gridTemplateColumns": "min-content auto", 
                "gap": "var(--gap-200, 8px)"
            }
            // const cover = image.find((image) => image.value === row.original.image)
            console.log(cover)
            return (
                <div style={localStyle}>  
                    <Cover src={cover} alt={title} width={50} height={28} />
                    <span>{title}</span>
                </div> 
            )
        }
    },
    {
        accessorKey: "isPublished",
        header: "Is Publish?",
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <div>
                <Switch 
                    checked={published}
                    onCheckedChange={() => editCourse(row.original.id, {isPublished: !published})}
                />
            </div>
        }
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
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))

            const newDate = formatDate({dateValue: date, dateFormat: "dd/MMM/yyyy - HH:mm"})

            return (
                <>
                    {newDate}
                </>
            )
        }
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                console.log(course.id)
                deleteCourse(course.id)
            }
            // console.log("course details: ", course)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="primary" shade="100" size="S" content="icon">
                            <MoreHorizontal className={csx["icon"]} />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <AlertDialog>
                        {/* Start Dropdowon Definition */}
                        <DropdownMenuContent shade="100" align="end">
                            <DropdownMenuItem>
                                <Button mode="text" variant="accent" status="default">
                                    <Pencil /> Edit
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileBarChart /> Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <AlertDialogTrigger asChild >
                                    <Button mode="text" variant="accent" status="fail">
                                        <Trash2 /> Delete
                                    </Button>
                                </AlertDialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        {/* End Dropdowon Definition */}
                        {/* Start Dialog Definition */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <div>
                                        <Button cn={csx["button"]} shade="200">Cancel</Button>
                                    </div>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <div>
                                        <Button cn={csx["button"]} variant="accent" status="fail" onClick={deleteConf}>Delete</Button>
                                    </div>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        {/* End Dialog Definition */}
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
]