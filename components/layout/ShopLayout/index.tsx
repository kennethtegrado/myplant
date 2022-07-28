import type { FunctionComponent, ReactNode } from 'react';

// Component Import
import { Navbar, Footer, Alert } from '@components/ui';

// Zustand
import { useCartStore } from '@store/product';

interface ShopLayoutProps {
    children: ReactNode;
}

const ShopLayout: FunctionComponent<ShopLayoutProps> = ({ children }) => {
    const alert = useCartStore((state) => state.alert);

    return (
        <>
            <Navbar />
            <main className="px-10 container mx-auto z-0">{children}</main>
            <Footer />
            {alert.message && (
                <Alert success={alert.success} message={alert.message} />
            )}
        </>
    );
};

export default ShopLayout;
