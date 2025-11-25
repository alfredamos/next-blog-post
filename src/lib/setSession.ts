import {setCookie} from "@/lib/setCookie";
import {CookieParam} from "@/utils/cookieParam.util";

export async function setSession(session: Session) {
    await setCookie(CookieParam.sessionTokenName, JSON.stringify(session), CookieParam.sessionTokenPath, CookieParam.sessionTokenExpireIn)
}