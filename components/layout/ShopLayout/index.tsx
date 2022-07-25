import type { FunctionComponent, ReactNode } from 'react';

// Component Import
import { Navbar, Footer } from '@components/ui';

interface ShopLayoutProps {
    children: ReactNode;
}

const ShopLayout: FunctionComponent<ShopLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="px-10 container mx-auto z-0">{children}</main>
            <Footer />
        </>
    );
};

export default ShopLayout;
