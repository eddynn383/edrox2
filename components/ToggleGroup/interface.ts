import { Content, Mode, Size, Status, Variant } from "@/interfaces/global";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    size?: Size;
    mode?: Mode;
    variant?: Variant;
    status?: Status;
    content?: Content;
}

export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
    size?: Size;
    mode?: Mode;
    variant?: Variant;
    status?: Status;
    content?: Content;
}