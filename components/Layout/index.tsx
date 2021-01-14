import Head from 'next/head';

type PropTypes = {
    children: React.ReactNode
}

export default function Layout({ children }: PropTypes) {
    return (
        <>
            <Head>
                <title>BDI 475</title>
            </Head>

            {children}
        </>
    )
}