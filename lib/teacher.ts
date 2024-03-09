

export const isSuperUser = (userId?: string | null) => {

    return userId === process.env.APP_SUPERUSER_ID;
}