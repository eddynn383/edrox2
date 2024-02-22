import { Table } from "@tanstack/react-table";

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    pageTitle: string;
    toolbarExtraActions?: React.ReactNode | React.ReactNode[] | string;
    showTableColumnsEdit?: boolean;
    showFilterToggle?: boolean;
}