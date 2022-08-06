import type { FunctionComponent } from 'react';

interface OrderStepsProps {
    status: 'to pack' | 'packed' | 'for delivery' | 'delivered';
}

const OrderSteps: FunctionComponent<OrderStepsProps> = ({ status }) => {
    const statusProgression = [
        'to pack',
        'packed',
        'for delivery',
        'delivered',
    ];

    const currentStatusIndex = statusProgression.indexOf(status);

    return (
        <ul className="steps steps-horizontal w-full">
            {statusProgression.map((item, index) => (
                <li
                    key={index}
                    className={`step ${
                        currentStatusIndex > index && 'step-secondary'
                    } ${
                        currentStatusIndex === index && 'step-primary'
                    } capitalize`}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default OrderSteps;
