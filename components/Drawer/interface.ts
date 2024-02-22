import { Drawer as DrawerPrimitive } from "vaul"

export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {

}

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
    
}

export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    
}

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
    
}

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement> & {
    
}

export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
    
}

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
    
}