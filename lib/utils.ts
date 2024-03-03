export function delayData(data: any, milliseconds: any) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, milliseconds);
    });
}

export const convertToURL = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};