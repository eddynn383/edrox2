"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { FilePenLine, MoreVertical, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Avatar, Badge, Button, Checkbox, Cover, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Icon, Label, Text } from "@/components"
import { deleteCourse, deleteManyCourses } from "@/actions/delete-course"
import { formatDate } from "./utils"
import { Category, Course } from "@/interfaces/course"
import { Price, TutorsOnCourses } from "@/interfaces/global"
import defaultAvatar from "@/public/assets/images/avatar-placeholder.svg";
import csx from "@/styles/component.module.scss"
import toast from "react-hot-toast"
import { deleteCategory, deleteManyCategories } from "@/actions/categories"

const CourseActions = ({ data, onDelete }: any) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button mode="text" variant="primary" size="S" content="icon">
                    <MoreVertical className={csx["icon"]} />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <AlertDialog>
                {/* Start Dropdowon Definition */}
                <DropdownMenuContent shade="200" align="end">
                    <DropdownMenuItem hasChild>
                        <Link href={`/management/courses/${data.id}/edit`}>
                            <FilePenLine /> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem hasChild>
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
                                <Button>Cancel</Button>
                            </div>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant="accent" status="fail" onClick={onDelete}>Delete</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                {/* End Dialog Definition */}
            </AlertDialog>
        </DropdownMenu>
    )
}

const CategoryActions = ({ data, onDelete }: any) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button mode="text" variant="primary" size="S" content="icon">
                    <MoreVertical className={csx["icon"]} />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <AlertDialog>
                {/* Start Dropdowon Definition */}
                <DropdownMenuContent shade="200" align="end">
                    <DropdownMenuItem hasChild>
                        <Link href={`/management/categories/${data.id}/edit`}>
                            <FilePenLine /> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem hasChild>
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
                                <Button>Cancel</Button>
                            </div>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant="accent" status="fail" onClick={onDelete}>Delete</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                {/* End Dialog Definition */}
            </AlertDialog>
        </DropdownMenu>
    )
}

export const coursesColsDesktop: ColumnDef<Course>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                mode="outline"
                shade="100"
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className={csx["table-body-checkbox"]}>
                <Checkbox
                    checked={row.getIsSelected()}
                    mode="outline"
                    shade="100"
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: () => <span>Title</span>,
        cell: ({ row }) => {
            const image = row.original.image
            const courseId = row.original.id
            const title: string = row.getValue("title")

            return (
                <div className={csx["table-body-title"]}>
                    <Cover src={image?.url} alt={title} width={60} height={36} size="S" defSize />
                    <div>
                        <Link className={csx["link"]} href={`/management/courses/edit/${courseId}`}>{title}</Link>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
        }
    },
    {
        accessorKey: "chapters",
        header: "Chapters",
        cell: ({ row }) => {
            const chapters: any[] = row.getValue("chapters")

            if (!chapters) return 0

            // console.log(chapters)

            return chapters.length
        }
    },
    {
        accessorKey: "price",
        header: () => <div>Price </div>,
        cell: ({ row }) => {
            const price: Price = row.getValue("price")
            if (!price) return "Free"

            const currency = price.currency
            const discount = price.discountedPrice
            const oldPrice = price.fullPrice


            return (

                <div>
                    {
                        discount && <span>{discount} {currency}</span>
                    }
                    {
                        !discount && <span>{oldPrice} {currency}</span>
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "tutors",
        header: "Tutors",
        cell: ({ row }) => {
            const tutors: TutorsOnCourses[] = row.getValue("tutors")
            return (
                <div className={csx["table-body-tutors"]}>
                    {
                        tutors?.map((item) => {
                            const tutor = item?.tutors
                            return (
                                <Avatar key={tutor?.id} src={tutor?.image ? tutor?.image : defaultAvatar} shape="rounded" size="S" title={tutor.name} />
                            )
                        })
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))

            const newDate = formatDate({ dateValue: date, dateFormat: "dd/MMM/yyyy - HH:mm" })

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
        cell: ({ row }) => {
            type User = {
                image: string;
                name: string;
            }

            const user: User = row.getValue("createdBy")

            return (
                <div style={{ "display": "flex", "gap": "var(--gap-200, 8px)", "alignItems": "center" }}>
                    <Avatar src={user?.image ? user?.image : defaultAvatar} shape="rounded" size="S" title={user.name} />
                    <Text size="S">{user?.name}</Text>
                </div>
            )
        }
    },
    {
        id: "actions",
        header: ({ table }) => {
            const selectedRows = table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
            const model = table.getSelectedRowModel()
            const rows = model.rows
            const ids = rows.map((row: any) => row.original.id);
            const selectedRowsLength = ids.length
            console.log(ids)
            console.log(selectedRowsLength)

            const deleteHandler = () => {
                try {
                    deleteManyCourses(ids)
                    table.toggleAllPageRowsSelected(false)
                    toast.success("Course deleted");
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }

            return (
                <div className={csx["table-header-actions"]}>
                    {
                        selectedRows &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="primary" size="S" content="icon">
                                    <MoreVertical className={csx["icon"]} />
                                    <span className="sr-only">Open menu</span>
                                    <div className={csx["table-selection-counter"]}>
                                        <Badge size="S" shape="rounded" status="info">{selectedRowsLength}</Badge>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <AlertDialog>
                                {/* Start Dropdowon Definition */}
                                <DropdownMenuContent shade="100" align="end">
                                    <DropdownMenuItem hasChild>
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
                                                <Button>Cancel</Button>
                                            </div>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <div>
                                                <Button variant="accent" status="fail" onClick={deleteHandler}>Delete</Button>
                                            </div>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                {/* End Dialog Definition */}
                            </AlertDialog>
                        </DropdownMenu>
                    }
                </div>
            )
        },
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const coursesColsDesktopSmall: ColumnDef<Course>[] = [
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
            <div className={csx["table-body-checkbox"]}>
                <Checkbox
                    checked={row.getIsSelected()}
                    mode="outline"
                    shade="200"
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: () => <span>Title</span>,
        cell: ({ row }) => {
            const image = row.original.image
            const title: string = row.getValue("title")
            const courseId = row.original.id

            return (
                <div className={csx["table-body-title"]}>
                    <Cover src={image?.url} alt={title} width={60} height={36} size="S" defSize />
                    <div>
                        <Link className={csx["link"]} href={`/management/courses/edit/${courseId}`}>{title}</Link>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
        }
    },
    {
        accessorKey: "chapters",
        header: "Chapters",
        cell: ({ row }) => {
            const chapters: any[] = row.getValue("chapters")

            if (!chapters) return 0

            // console.log(chapters)

            return chapters.length
        }
    },
    {
        accessorKey: "price",
        header: () => <div>Price </div>,
        cell: ({ row }) => {
            const price: Price = row.getValue("price")
            if (!price) return "Free"

            const currency = price.currency
            const discount = price.discountedPrice
            const oldPrice = price.fullPrice


            return (

                <div>
                    {
                        discount && <span>{discount} {currency}</span>
                    }
                    {
                        !discount && <span>{oldPrice} {currency}</span>
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "tutors",
        header: "Tutors",
        cell: ({ row }) => {
            const tutors: TutorsOnCourses[] = row.getValue("tutors")
            // console.log(tutors)
            return (
                <div className={csx["table-body-tutors"]}>
                    {
                        tutors?.map((item) => {
                            const tutor = item?.tutors
                            return (
                                <Avatar key={tutor?.id} src={tutor?.image ? tutor?.image : defaultAvatar} shape="rounded" size="S" title={tutor.name} />
                            )
                        })
                    }
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                // console.log(course.id)
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>

            )
        }
    }
]

export const coursesColsTablet: ColumnDef<Course>[] = [
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
            const title: string = row.getValue("title")
            return <span className={csx["table-body-title"]}>{title}</span>
        }
    },
    {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
        }
    },
    {
        accessorKey: "chapters",
        header: "Chapters",
        cell: ({ row }) => {
            const chapters: any[] = row.getValue("chapters")

            if (!chapters) return 0

            // console.log(chapters)

            return chapters.length
        }
    },
    {
        accessorKey: "price",
        header: () => <div>Price </div>,
        cell: ({ row }) => {
            const price: Price = row.getValue("price")
            if (!price) return "Free"

            const currency = price.currency
            const discount = price.discountedPrice
            const oldPrice = price.fullPrice


            return (

                <div>
                    {
                        discount && <span>{discount} {currency}</span>
                    }
                    {
                        !discount && <span>{oldPrice} {currency}</span>
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "tutors",
        header: "Tutors",
        cell: ({ row }) => {
            const tutors: TutorsOnCourses[] = row.getValue("tutors")
            // console.log(tutors)
            return (
                <div className={csx["table-body-tutors"]}>
                    {
                        tutors?.map((item) => {
                            const tutor = item?.tutors
                            return (
                                <Avatar key={tutor?.id} src={tutor?.image ? tutor?.image : defaultAvatar} shape="rounded" size="S" title={tutor.name} />
                            )
                        })
                    }
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                // console.log(course.id)
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const coursesColsMobile: ColumnDef<Course>[] = [
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
            const title: string = row.getValue("title")
            const courseId = row.original.id
            return (
                <span className={csx["table-body-title"]}>
                    <div>
                        <Link className={csx["link"]} href={`/management/courses/edit/${courseId}`}>{title}</Link>
                    </div>
                </span>
            )
        }
    },
    {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                // console.log(course.id)
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const coursesColsMobileCard: ColumnDef<Course>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Label htmlFor="select-all-checkbox" style={{ "display": "flex", "alignItems": "center", "gap": "var(--gap-200, 8px)" }}>
                <Checkbox
                    id="select-all-checkbox"
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
                Select all
            </Label>
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
        cell: ({ row }) => {
            const title: string = row.getValue("title")
            return <span className={csx["table-body-title"]}>{title}</span>
        }
    },
    {
        accessorKey: "isPublished",
        header: () => false,
        cell: ({ row }) => {
            const published: boolean = row.getValue("isPublished")

            return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
        }
    },
    {
        accessorKey: "price",
        header: () => false,
        cell: ({ row }) => {
            const price: Price = row.getValue("price")
            if (!price) return "Free"

            const currency = price.currency
            const discount = price.discountedPrice
            const oldPrice = price.fullPrice


            return (

                <div className={csx["table-price"]}>
                    {
                        discount && <span>{discount} {currency}</span>
                    }
                    {
                        !discount && <span>{oldPrice} {currency}</span>
                    }
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                // console.log(course.id)
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>
            )
        }
    }
]





export const categoriesColsDesktop: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                mode="outline"
                shade="100"
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className={csx["table-body-checkbox"]}>
                <Checkbox
                    checked={row.getIsSelected()}
                    mode="outline"
                    shade="100"
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: ({ row }) => {
            const name: string = row.getValue("name")

            return (
                <div className={csx["table-body-name"]}>
                    <Text>{name}</Text>
                </div>
            )
        }
    },
    {
        accessorKey: "courses",
        header: () => <span>Courses</span>,
        cell: ({ row }) => {
            const courses: string = row.getValue("courses")

            return (
                <div className={csx["table-body-courses"]}>
                    <Text>{courses.length}</Text>
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))

            const newDate = formatDate({ dateValue: date, dateFormat: "dd/MMM/yyyy - HH:mm" })

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
        cell: ({ row }) => {
            type User = {
                image: string;
                name: string;
            }

            const user: User = row.getValue("createdBy")

            return (
                <div style={{ "display": "flex", "gap": "var(--gap-200, 8px)", "alignItems": "center" }}>
                    <Avatar src={user?.image ? user?.image : defaultAvatar} shape="rounded" size="S" title={user?.name} />
                    <Text size="S">{user?.name}</Text>
                </div>
            )
        }
    },
    {
        id: "actions",
        header: ({ table }) => {
            const selectedRows = table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
            const model = table.getSelectedRowModel()
            const rows = model.rows
            const ids = rows.map((row: any) => row.original.id);
            const selectedRowsLength = ids.length

            const deleteHandler = async () => {
                try {
                    await deleteManyCategories(ids)
                    table.toggleAllPageRowsSelected(false)
                    toast.success("Category deleted");
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }

            return (
                <div className={csx["table-header-actions"]}>
                    {
                        selectedRows &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="primary" size="S" content="icon">
                                    <MoreVertical className={csx["icon"]} />
                                    <span className="sr-only">Open menu</span>
                                    <div className={csx["table-selection-counter"]}>
                                        <Badge size="S" shape="rounded" status="info">{selectedRowsLength}</Badge>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <AlertDialog>
                                {/* Start Dropdowon Definition */}
                                <DropdownMenuContent shade="100" align="end">
                                    <DropdownMenuItem hasChild>
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
                                                <Button>Cancel</Button>
                                            </div>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <div>
                                                <Button variant="accent" status="fail" onClick={deleteHandler}>Delete</Button>
                                            </div>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                {/* End Dialog Definition */}
                            </AlertDialog>
                        </DropdownMenu>
                    }
                </div>
            )
        },
        cell: ({ row }) => {
            const category = row.original

            const deleteConf = async () => {
                await deleteCategory(category.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CategoryActions data={category} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const categoriesColsDesktopSmall: ColumnDef<Category>[] = [
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
            <div className={csx["table-body-checkbox"]}>
                <Checkbox
                    checked={row.getIsSelected()}
                    mode="outline"
                    shade="200"
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: ({ row }) => {
            const name: string = row.getValue("name")

            return (
                <div className={csx["table-body-name"]}>
                    <Text>{name}</Text>
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original
            const deleteConf = () => {
                deleteCategory(category.id)
            }

            return (
                <div className={csx["table-body-actions"]}>
                    <CategoryActions data={category} onDelete={deleteConf} />
                </div>

            )
        }
    }
]

export const categoriesColsTablet: ColumnDef<Category>[] = [
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
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: ({ row }) => {
            const name: string = row.getValue("name")
            return <Text className={csx["table-body-name"]}>{name}</Text>
        }
    },
    // {
    //     accessorKey: "isPublished",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const published: boolean = row.getValue("isPublished")

    //         return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
    //     }
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original

            const deleteConf = () => {
                // console.log(category.id)
                deleteCategory(category.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={category} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const categoriesColsMobile: ColumnDef<Category>[] = [
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
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: ({ row }) => {
            const name: string = row.getValue("name")
            const courseId = row.original.id
            return (
                <Text>{name}</Text>
            )
        }
    },
    // {
    //     accessorKey: "isPublished",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const published: boolean = row.getValue("isPublished")

    //         return <Badge shape="rounded" status={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Badge>
    //     }
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original

            const deleteConf = () => {
                // console.log(course.id)
                deleteCategory(category.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CategoryActions data={category} onDelete={deleteConf} />
                </div>
            )
        }
    }
]

export const usersCols: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                mode="outline"
                shade="100"
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className={csx["table-body-checkbox"]}>
                <Checkbox
                    checked={row.getIsSelected()}
                    mode="outline"
                    shade="100"
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: ({ row }) => {
            const name: string = row.getValue("name")
            const image = row.original.image
            const email = row.original.email

            const initials = name.split(" ").map(name => name[0]).join('')

            console.log("row: ", row)

            return (
                <div className={csx["table-body-name"]} style={{ display: "flex", gap: "var(--size-200, 8px)", alignItems: "center" }}>
                    <Avatar src={image} text={!image ? initials : ""} alt={name} size="M" shape="rounded" />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ color: "var(--primary-text-100)", lineHeight: "1" }}>
                            <Text type="span" size="S">{name}</Text>
                        </div>
                        <div style={{ color: "var(--primary-text-500)", lineHeight: "1" }}>
                            <Text type="span" size="XS">{email}</Text>
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "role",
        header: () => <span>Role</span>,
        cell: ({ row }) => {
            const role: string = row.getValue("role")

            return (
                <div className={csx["table-body-role"]} style={{ display: "flex", alignItems: "center" }}>
                    <Badge shape="rounded" mode="outline">{role}</Badge>
                </div>
            )
        }
    },
    {
        id: "actions",
        header: ({ table }) => {
            const selectedRows = table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
            const model = table.getSelectedRowModel()
            const rows = model.rows
            const ids = rows.map((row: any) => row.original.id);
            const selectedRowsLength = ids.length
            console.log(ids)
            console.log(selectedRowsLength)

            const deleteHandler = () => {
                try {
                    deleteManyCourses(ids)
                    table.toggleAllPageRowsSelected(false)
                    toast.success("Course deleted");
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }

            return (
                <div className={csx["table-header-actions"]}>
                    {
                        selectedRows &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="primary" size="S" content="icon">
                                    <MoreVertical className={csx["icon"]} />
                                    <span className="sr-only">Open menu</span>
                                    <div className={csx["table-selection-counter"]}>
                                        <Badge size="S" shape="rounded" status="info">{selectedRowsLength}</Badge>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <AlertDialog>
                                {/* Start Dropdowon Definition */}
                                <DropdownMenuContent shade="100" align="end">
                                    <DropdownMenuItem hasChild>
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
                                                <Button>Cancel</Button>
                                            </div>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <div>
                                                <Button variant="accent" status="fail" onClick={deleteHandler}>Delete</Button>
                                            </div>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                {/* End Dialog Definition */}
                            </AlertDialog>
                        </DropdownMenu>
                    }
                </div>
            )
        },
        cell: ({ row }) => {
            const course = row.original

            const deleteConf = () => {
                deleteCourse(course.id)
            }
            return (
                <div className={csx["table-body-actions"]}>
                    <CourseActions data={course} onDelete={deleteConf} />
                </div>
            )
        }
    }
]