/**
 An array of public routes that do not require authentication.
 These routes can be accessed without being logged in.
 @type {string[]} 
 **/
export const publicRoutes = [
    "/",
    "/auth/new-verification"
];
/**
 * An array of authenticated routes that require authentication.
 * These routes can only be accessed by logged-in users.
 * also these routes will redirect logged in users to pages
 @type {string[]} 
 **/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "auth/error",
    "/auth/reset",
    "/auth/new-password"
];
/**
 * The prefix for API authentication routes.
 * This prefix is used to group all authentication-related API endpoints.
 * @type {string} 
 **/
export const apiAuthPrefix = "/api/auth";

//Default redirect path after login
//@type { string }
export const DEFAULT_LOGIN_REDIRECT = "/settings";