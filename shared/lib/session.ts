import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next'

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'iron-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
}

export const withSessionRoute = (handler: NextApiHandler) => {
    return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<P extends { [key: string]: any } = { [key: string]: any }>(
    handler: (
        context: GetServerSidePropsContext
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
    return withIronSessionSsr(handler, sessionOptions)
}
