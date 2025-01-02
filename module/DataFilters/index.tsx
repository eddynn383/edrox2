import { Button, Icon } from "@/components";
import { DataFiltersProps } from "./interface";

export function DataFilters<TData>({ table }: DataFiltersProps<TData>) {
    return (
        <Button mode="outline" variant="primary" size="M" content="icon"><Icon name="filter" /></Button>
    );
}