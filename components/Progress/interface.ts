import { Shape, Status, Thickness } from "@/interfaces/global";
import * as ProgressPrimitive from "@radix-ui/react-progress"

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    thickness?: Thickness;
    shape?: Shape;
    status?: Status;
    width?: string;
    height?: string;
}