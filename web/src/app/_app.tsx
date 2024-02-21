import React from 'react';
import { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
function CustomApp({ Component, pageProps }: AppProps) {
    // Add any global context providers or layout components here
    return (
        <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default CustomApp;