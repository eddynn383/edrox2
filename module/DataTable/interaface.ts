import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageTitle: string;
    toolbarButtons?: React.ReactNode | React.ReactNode[] | string
}