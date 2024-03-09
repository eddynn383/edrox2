import { format } from "date-fns";


export const delayData = (data: any, milliseconds: any) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, milliseconds);
    });
}

export const convertToURL = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};


interface DateFormatOptions {
    dateValue: Date;
    dateFormat: string;
}

export const formatDate = ({ dateValue, dateFormat }: DateFormatOptions): string => {
    return format(dateValue, dateFormat);
};