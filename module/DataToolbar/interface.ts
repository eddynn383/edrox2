import { Table } from "@tanstack/react-table";

export interface DataToolbarProps<TData> {
    table: Table<TData>;
    showTableColumnsEdit?: boolean;
    showFilterToggle?: boolean;
}