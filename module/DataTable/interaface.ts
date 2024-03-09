import { ColumnDef, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    table: Table<TData>;
}