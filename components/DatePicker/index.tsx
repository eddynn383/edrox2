"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components"
import { Calendar } from "@/components"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components"
import { DateRange } from "react-day-picker"
import { DatePickerProps } from "./interface"

const DatePicker = ({ type = "single", size = "M" }: DatePickerProps) => {
    const [date, setDate] = React.useState<DateRange | undefined>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    mode="outline"
                    size={size}
                // className={cn(
                //     "w-[280px] justify-start text-left font-normal",
                //     !date && "text-muted-foreground"
                // )}
                >
                    <CalendarIcon />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent style={{ width: "auto" }}>
                <Calendar
                    type={type}
                    // defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    // numberOfMonths={2}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker }