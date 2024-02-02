export const isAdmin = (userId?: string | null) => {
    return userId === process.env.NEXT_SUPER_USER_ID;
}