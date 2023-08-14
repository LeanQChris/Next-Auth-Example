export const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASEURL;

export const endpoints = {
    auth: {
        login: baseUrl + "/auth/login"
    }
}