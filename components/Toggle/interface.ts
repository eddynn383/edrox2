import { Content, Mode, Size, Status, Variant } from "@/interfaces/global";
import * as TogglePrimitive from "@radix-ui/react-toggle"

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
    size?: Size;
    mode?: Mode;
    variant?: Variant;
    status?: Status;
    content?: Content;
}