import * as React from "react"
import sx from "@/styles/component.module.scss"
import { TableBodyProps, TableCaptionProps, TableFooterProps, TableHeaderProps, TableProps, TableRowProps, TableTdProps, TableThProps } from "./interface"
import table from "./table.module.css"

const Table = React.forwardRef<HTMLTableElement, TableProps>(({className=table.container, ...props }, ref) => (
    <div className={table.wrapper}>
        <table ref={ref} className={className} {...props} />
    </div>
))

Table.displayName = "Table"



const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className=table.header, ...props }, ref) => (
    <thead ref={ref} className={className} {...props} />
))

TableHeader.displayName = "TableHeader"



const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className=table.body, ...props }, ref) => (
    <tbody ref={ref} className={className} {...props} />
))

TableBody.displayName = "TableBody"



const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className=table.footer, ...props }, ref) => (
    <tfoot ref={ref} className={className} {...props} />
))

TableFooter.displayName = "TableFooter"



const TableTr = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className=table.tr, ...props }, ref) => (
    <tr ref={ref} className={className} {...props} />
))

TableTr.displayName = "TableTr"



const TableTh = React.forwardRef<HTMLTableCellElement, TableThProps>(({ className=table.th, ...props }, ref) => (
    <th ref={ref} className={className} {...props} />
))

TableTh.displayName = "TableTh"



const TableTd = React.forwardRef<HTMLTableCellElement, TableTdProps>(({ className=table.td, ...props }, ref) => (
    <td ref={ref} className={className} {...props} />
))

TableTd.displayName = "TableTd"



const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className=table.caption, ...props }, ref) => (
    <caption ref={ref} className={className} {...props} />
))

TableCaption.displayName = "TableCaption"


export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableTh,
    TableTr,
    TableTd,
    TableCaption,
}
