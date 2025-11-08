const publicRoutes = [
    "/api/auth/login",
    "/api/auth/refresh",
    "/api/auth/signup",
    "/posts",
    "/"
]

export const isPublicRoute = (route : string) => publicRoutes.includes(route);