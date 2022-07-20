import '@styles/tailwind.css';
import type { AppProps } from 'next/app';

// Layout import
import { ShopLayout } from '@components/layout';

// Nprogress
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextNProgress color="#529b03" height={3} />
            <ShopLayout>
                <Component {...pageProps} />
            </ShopLayout>
        </>
    );
}

export default MyApp;
