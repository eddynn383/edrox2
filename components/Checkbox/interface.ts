import { Mode, Shade } from "@/interfaces/global";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    mode?: Mode;
    shade?: Shade;
}