const publicRoutes = [
    "/login",
    "/refresh",
    "/signup",
    "/posts",
    "/api/auth/login",
    "/api/auth/refresh",
    "/api/auth/signup",
    "/api/posts",
    "/",
]

export const isPublicRoute = (route : string) => publicRoutes.includes(route);