import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { LucideProps } from 'lucide-react';
import { Size } from '@/interfaces/global';

export type Name = keyof typeof dynamicIconImports;

export interface IconProps extends LucideProps {
    name: Name;
    size?: Size;
    strokeWidth?: number
}