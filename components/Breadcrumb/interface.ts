export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
    separator?: React.ReactNode
}

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {

}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {

}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
    asChild?: boolean
}

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {

}

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {

}

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {

}