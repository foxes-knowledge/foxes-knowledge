import { ToastProvider } from '#/modules/toaster/Toaster'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nprogress from 'nprogress'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import 'styles/globals.css'
import 'styles/nprogress.css'

nprogress.configure({
    showSpinner: false,
    trickleSpeed: 800,
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    Router.events.on('routeChangeStart', () => nprogress.start())
    Router.events.on('routeChangeComplete', () => nprogress.done())
    Router.events.on('routeChangeError', () => nprogress.done())

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ToastProvider>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ToastProvider>
        </>
    )
}

export default MyApp
