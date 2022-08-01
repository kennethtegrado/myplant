import type { FunctionComponent } from 'react';

// State Management Import
import { useCartStore } from '@store/product';

// Component Import
import OrderModal from '../OrderModal';

const OrderSummary: FunctionComponent = () => {
    const totalPrice = useCartStore((state) => state.totalPrice);

    return (
        <>
            <div className="card bg-gray-100 w-64 md:w-80">
                <div className="card-body text-base-content">
                    <h5 className="card-title font-bold text-primary">
                        Order Summary
                    </h5>
                    <div className="flex space-between text-sm">
                        <p>Subtotal</p>
                        <p className="text-end font-bold">₱ {totalPrice}</p>
                    </div>
                    <div className="divider -my-1"></div>
                    <div className="flex space-between text-sm">
                        <p>Delivery Fee</p>
                        <p className="text-end font-bold">₱0</p>
                    </div>
                    <div className="divider -my-1"></div>
                    <div className="flex space-between text-sm">
                        <p className="text-lg font-bold">Total Amount</p>
                        <p className="text-end font-bold text-primary text-lg">
                            ₱ {totalPrice}
                        </p>
                    </div>
                    <div className="card-action">
                        <label
                            htmlFor="order-modal"
                            className="btn w-full my-2 btn-outline btn-primary modal-button"
                        >
                            Checkout Order
                        </label>
                    </div>
                </div>
            </div>
            <OrderModal />
        </>
    );
};

export default OrderSummary;
