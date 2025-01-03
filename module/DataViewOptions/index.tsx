import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components"
import { DataViewOptionsProps } from "./interface"
import { Columns } from "lucide-react"
import useScreenSize from "@/hooks/useScreenSize"

export function DataViewOptions<TData>({ table }: DataViewOptionsProps<TData>) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button mode="outline" size="M" content="icon" >
                    <Columns />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" shade="200">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)} >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}