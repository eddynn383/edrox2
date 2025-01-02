"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker } from "react-day-picker"

import calendar from "./calendar.module.css"
import { Button } from "../Button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

type ExtCalendarProps = CalendarProps & {
    type: "single" | "multiple" | "range"; // Replace `string` with your desired type
};

const Calendar = ({
    className,
    classNames,
    type = "single",
    showOutsideDays = true,
    startMonth,
    endMonth,
    ...props
}: ExtCalendarProps) => {
    // const [selected, setSelected] = React.useState<Date | undefined>();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            startMonth={startMonth}
            endMonth={endMonth}
            className={className}
            mode={type}
            classNames={{
                months: calendar.months,
                month: calendar.month,
                month_caption: calendar.caption,
                caption_label: calendar["caption_label"],
                nav: calendar.nav,
                button_previous: calendar["nav_button_previous"],
                button_next: calendar["nav_button_next"],
                month_grid: calendar.table,
                weekdays: calendar["head_row"],
                weekday: calendar["head_cell"],
                week: calendar.row,
                day: calendar.day,
                day_button: calendar["day_button"],
                focused: calendar["day_focused"],
                range_start: calendar["day_range_start"],
                range_end: calendar["day_range_end"],
                selected: calendar["day_selected"],
                today: calendar["day_today"],
                outside: calendar["day_outside"],
                disabled: calendar["day_disabled"],
                range_middle: calendar["day_range_middle"],
                hidden: calendar["day_hidden"],
                ...classNames,
            }}
            components={{
                Nav: ({ ...props }) => {
                    const {
                        components,
                        classNames,
                        labels: { labelPrevious, labelNext }
                    } = useDayPicker();
                    return (
                        <nav className={calendar.nav}>
                            <ul className={calendar.nav_buttons}>
                                <components.PreviousMonthButton
                                    type="button"
                                    tabIndex={props.previousMonth ? undefined : -1}
                                    disabled={props.previousMonth ? undefined : true}
                                    aria-label={labelPrevious(props.previousMonth)}
                                    onClick={props.onPreviousClick}
                                />
                                <components.NextMonthButton
                                    type="button"
                                    tabIndex={props.nextMonth ? undefined : -1}
                                    disabled={props.nextMonth ? undefined : true}
                                    aria-label={labelNext(props.nextMonth)}
                                    onClick={props.onNextClick}
                                />
                            </ul>
                        </nav>
                    )
                },
                PreviousMonthButton: ({ ...props }) => <li className={calendar["nav_button_previous"]}><Button size="S" mode="solid" content="icon" disabled={props.disabled} onClick={props.onClick}><ChevronLeft size="16px" /></Button></li>,
                NextMonthButton: ({ ...props }) => <li className={calendar["nav_button_next"]}><Button size="S" mode="solid" content="icon" disabled={props.disabled} onClick={props.onClick}><ChevronRight size="16px" /></Button></li>,
            }}
            {...props}
        />
    )
}

Calendar.displayName = "Calendar"

export { Calendar }
