import { Course } from "@prisma/client";

export interface CoursesManagerProps {
    courses: any;
    categories: any;
    device: string;
}

// import { ColumnDef } from "@tanstack/react-table";

// export interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[];
//     data: TData[];
// }