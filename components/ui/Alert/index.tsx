import type { FunctionComponent } from 'react';

import { useEffect } from 'react';

// Zustand
import { useCartStore } from '@store/product';

interface AlertProps {
    success: boolean;
    message: string;
}

const Alert: FunctionComponent<AlertProps> = ({ success, message }) => {
    const setAlert = useCartStore((state) => state.setAlert);

    const close = () => setAlert(false, '');

    useEffect(() => {
        setTimeout(close, 6500);
    }, []);

    return (
        <div
            className={`alert ${
                success ? 'alert-success' : 'alert-error'
            } shadow-lg fixed container bottom-5 z-10 left-1/2 -translate-x-1/2`}
        >
            <div>
                {success ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                )}
                {message}
            </div>
            <div className="flex-none" onClick={close}>
                <button className="btn btn-circle btn-outline btn-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Alert;
