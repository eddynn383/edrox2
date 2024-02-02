import React from "react"
import { SearchProps } from "./interface"
import { Input } from "@/components/Input"
import sx from "@/styles/component.module.scss"

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({...props}, ref) => {
    return (
        <div className={sx["search"]}>
            <Input type="search" shade="200" iconBefore="search" {...props} ref={ref} />
        </div>
    )
})

Search.displayName = "Search"

export { Search }