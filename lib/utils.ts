export function delayData(data: any, milliseconds: any) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, milliseconds);
    });
}