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

export const covertDuration = (durationInMiliseconds: number) => {
    const seconds = durationInMiliseconds > 1000 ? Math.floor(durationInMiliseconds / 1000) : 0
    const remainingSeconds = seconds % 60
    const minutes = seconds > 60 ? Math.floor(seconds / 60) : 0
    const remainingMinutes = minutes % 60
    const hours = minutes > 60 ? minutes / 60 : 0
    const duration = `${hours > 0 ? `${hours}h` : ``} ${remainingMinutes}m ${remainingSeconds}s`
    
    return duration;
};