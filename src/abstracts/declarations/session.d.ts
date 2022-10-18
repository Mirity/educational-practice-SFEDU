import 'express-session'

declare module 'express-session' {
    export interface SessionData {
        isLoggedIn: boolean | undefined,
        csrfToken: string | undefined,
        userId: number | undefined
    }
}