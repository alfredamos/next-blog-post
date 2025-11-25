import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {isPublicRoute} from "@/utils/publicRoute.util";
import {getSession} from "@/lib/getSession";
import {validateCredential} from "@/utils/validateCredential.util";

export async function proxy(request: NextRequest) {
    //----> Exclude public routes.
    if (isPublicRoute(request?.nextUrl?.pathname)) {
        console.log("In proxy, url : ", `${request?.nextUrl?.pathname}`);
        return NextResponse.next();
    }

    //----> Authenticate user.
    const session = await validateCredential();
    console.log("In proxy, session: ", session);
    //----> Check for unauthenticated user.
    if (!session?.isLoggedIn) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    //----> Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Any other static assets that might be directly served (e.g., .css, .js, .png)
         */
        '/((?!_next/static|_next/image|favicon.ico|.+\\.(?:css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|otf|eot)).*)',


    ],
};
