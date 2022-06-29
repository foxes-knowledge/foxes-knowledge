import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta httpEquiv="content-type" content="text/html" />
                    <meta name="description" content="Knowledge database of the Foxes team." />
                    <meta
                        name="keywords"
                        content="foxes, knowledge, knowledge base, database, nix, nix solutions"
                    />
                    <link rel="stylesheet" href="/fonts/Exo/index.css" crossOrigin="" />
                    <link rel="stylesheet" href="/fonts/Exo-2/index.css" crossOrigin="" />
                    <meta name="author" content="Paul Litovka" />
                    <meta name="owner" content="Paul Litovka" />
                    <meta name="copyright" content="Paul Litovka" />
                    <meta name="designer" content="Paul Litovka" />
                    <meta name="distribution" content="global" />
                    <meta name="subject" content="Education" />
                    <meta name="language" content="EN, RU, UK" />
                    <meta name="coverage" content="worldwide" />
                    <meta name="rating" content="general" />
                    <meta name="robots" content="all" />
                    <meta name="googlebot" content="all" />
                    <meta name="googlebot-news" content="all" />
                    <meta name="revisit-after" content="1 day" />
                    <meta httpEquiv="pragma" content="no-cache" />
                    <meta httpEquiv="cache-control" content="no-cache" />
                    <meta name="theme-color" content="#ff791a" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
