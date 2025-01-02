export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, React.AnchorHTMLAttributes<HTMLAnchorElement> {
//     href?: string;
//     onClick?: React.MouseEventHandler<HTMLButtonElement>;
// }