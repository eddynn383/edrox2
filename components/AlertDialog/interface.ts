import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"


export interface AlertDialogProps extends AlertDialogPrimitive.AlertDialogPortalProps {
    className?: string
}

export interface AlertDialogOverlayProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {

}

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {

}

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {

}

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {

}

export interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {

}

export interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {

}

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {

}

export interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {

}