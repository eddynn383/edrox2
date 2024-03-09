import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Mode, Shade } from "@/interfaces/global";

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    orientation: "horizontal" | "vertical";
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    mode?: Mode;
    shade?: Shade;
}