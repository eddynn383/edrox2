import { Button, Icon } from "@/components";
import { DataTableFiltersProps } from "./interface";

export function DataTableFilters <TData>({table}: DataTableFiltersProps<TData>) {
    return ( 
        <Button variant="primary" shade="200" size="M" content="icon"><Icon name="filter" /></Button>
    );
}