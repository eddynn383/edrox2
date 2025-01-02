import { Mode, Size, Status, Variant } from "@/interfaces/global"
import * as ToastPrimitives from "@radix-ui/react-toast"

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {

}

export interface ToastContainerProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
    mode?: Mode;
    status?: Status;
}

export interface ToastActionsProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {
    mode?: Mode;
    variant?: Variant;
    size?: Size;
    status?: Status;
}

export interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {
    status?: Status;
    variant?: Variant;
}

export interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> { }

export interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> { }