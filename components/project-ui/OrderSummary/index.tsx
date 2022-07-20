import type { FunctionComponent } from 'react';

const OrderSummary: FunctionComponent = () => {
    return (
        <div className="card bg-gray-100 md:w-80">
            <div className="card-body text-base-content">
                <h5 className="card-title font-bold text-primary">
                    Order Summary
                </h5>
                <div className="flex space-between text-sm">
                    <p>Subtotal</p>
                    <p className="text-end font-bold">₱0</p>
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
                        ₱0
                    </p>
                </div>
                <div className="card-action">
                    <button className="btn w-full my-2 btn-outline btn-primary">
                        Checkout Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
