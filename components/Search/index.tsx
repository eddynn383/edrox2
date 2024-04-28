"use client"

import qs from "query-string";
import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input, Label } from "@/components"
import { useDebounce } from "@/hooks/useDebounce"
import { SearchProps } from "./interface"
import sx from "@/styles/component.module.scss"

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ containerId="search", ...props }, ref) => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname])

    return (
        <div className={sx["search"]}>
            <Label htmlFor={containerId} className="sr-only">Search</Label>
            <Input id={containerId} type="search" placeholder="Search..." mode="outline" shade="200" iconBefore="search" onChange={(e) => setValue(e.target.value)} value={value} {...props} ref={ref} />
        </div>
    )
})

Search.displayName = "Search"

export { Search }