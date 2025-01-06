import { Size, Status } from "@/interfaces/global";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    href?: string;
    mode?: "solid" | "text";
    size?: Size;
    variant?: "primary" | "accent";
    underline?: boolean;
    // status?: Status;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, React.AnchorHTMLAttributes<HTMLAnchorElement> {
//     href?: string;
//     onClick?: React.MouseEventHandler<HTMLButtonElement>;
// }