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

export const convertDuration = (durationInMiliseconds: number, shortFormat=true) => {
    const seconds = durationInMiliseconds > 1000 ? Math.floor(durationInMiliseconds / 1000) : 0
    const remainingSeconds = seconds % 60
    const minutes = seconds > 60 ? Math.floor(seconds / 60) : 0
    const remainingMinutes = minutes % 60
    const hours = minutes > 60 ? Math.floor(minutes / 60) : 0
    const remainingHours = hours % 60

    const s = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    const m = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes
    const h = remainingHours < 10 ? `0${remainingHours}` : remainingHours

    const duration = shortFormat ? `${remainingHours > 0 ? `${h}h` : ``} ${m}m ${s}s` : `${remainingHours > 0 ? `${h} h<span className="sr-only">ours -</span>` : ``} ${m} m<span className="sr-only">inutes -</span> ${s} s<span className="sr-only">econds</span>`
    
    return duration;
};

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));

    return `${formattedSize} ${sizes[i]}`;
}