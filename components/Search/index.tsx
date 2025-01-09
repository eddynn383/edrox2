"use client"

import qs from "query-string";
import React, { useEffect, useState } from "react"
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input, Label } from "@/components"
import { useDebounce } from "@/hooks/useDebounce"
import { SearchProps } from "./interface"
import search from "./search.module.css"
import icon from "@/components/Icon/icon.module.css"

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ className = search.container, containerId = "search", value, onChange, ...props }, ref) => {
    const [innerValue, setInnerValue] = useState("")
    const debouncedValue = useDebounce(innerValue);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                name: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname])

    return (
        <div className={className}>
            <Label htmlFor={containerId} className="sr-only">Search</Label>
            <Input id={containerId} type="search" placeholder="Search..." mode="outline" shade="200" iconBefore={<SearchIcon className={icon.container} data-size="M" />} onChange={onChange ? onChange : (e) => setInnerValue(e.target.value)} value={value ? value : innerValue} {...props} ref={ref} />
        </div>
    )
})

Search.displayName = "Search"

export { Search }