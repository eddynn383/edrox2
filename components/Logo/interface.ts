export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    cn?: string;
    src?: any;
    alt: string;
    position?: "left" | "center" | "right";
    width: number;
    height: number;
}