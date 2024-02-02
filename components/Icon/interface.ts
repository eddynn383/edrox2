import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { LucideProps } from 'lucide-react';

export type Name = keyof typeof dynamicIconImports;

export interface IconProps extends LucideProps {
    name: Name;
}