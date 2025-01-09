
export interface DataEditModalProps {
    title: string;
    trigger?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: () => void;
}   