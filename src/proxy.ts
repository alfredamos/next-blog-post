import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {validateCredential} from "@/utils/validateCredential.util";
import {isPublicRoute} from "@/utils/publicRoute.util";

export async function proxy(request: NextRequest) {
    //----> Exclude public routes.
    if (isPublicRoute(request?.nextUrl?.pathname)) {
        return NextResponse.next();
    }

    //----> Authenticate user.
    const userResponse = await validateCredential();

    //----> Check for unauthenticated user.
    if (!userResponse?.isLoggedIn) {
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
