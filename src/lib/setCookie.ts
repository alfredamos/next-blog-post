import {cookies} from "next/headers";

export const setCookie = async (cookieName: string, cookieValue: string, cookiePath: string, maxAge: number) => {
    //----> Initialize cookie.
    const cookie = await cookies();

    //----> set cookie.
    cookie.set(cookieName, cookieValue, {
        httpOnly: true,
        secure: false,
        path: cookiePath,
        maxAge
    })
}