import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

// NEXT Import
import Head from 'next/head';
import Link from 'next/link';

// Sanity
import { getClient, imageBuilder } from '@utils/sanity';
import { groq } from 'next-sanity';
import { IOrderItem } from '@interface/sanity';

// Component Import
import { OrderSteps } from '@components/project-ui';
import Image from 'next/image';

interface TrackOrder {
    order: IOrderItem;
}

const TrackOrder: NextPage<TrackOrder> = ({ order }) => {
    return (
        <>
            <Head>
                <title>{`Order by ${
                    order.name.split(' ')[0]
                } - MyLittlePlant`}</title>
            </Head>
            <div className="text-sm breadcrumbs mt-10">
                <ul>
                    <li className="flex flex-row gap-2 text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <Link href="/shop">
                            <span className="font-medium link link-hover cursor-pointer ">
                                Shop
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="alert alert-success my-2 lg:my-8">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 hidden lg:block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span>
                        Your transaction number is{' '}
                        <span className="font-bold text-secondary-content">
                            {order._id}
                        </span>
                        . Please never lose this transaction number because this
                        is the only way to check the status of your order.
                    </span>
                </div>
            </div>
            <section className="flex flex-col mb-8 lg:flex-row justify-between min-h-3/4 gap-10">
                <div className="flex-1 py-5 lg:p-5">
                    {!order.processing ? (
                        <div className="badge badge-warning">
                            Order is being processed
                        </div>
                    ) : (
                        order.status?.status && (
                            <OrderSteps status={order.status?.status} />
                        )
                    )}
                    <h2 className="text-3xl font-bold mt-5">
                        Personal Details
                    </h2>
                    <p className="mt-5 flex flex-row gap-2 items-center font-bold text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Customer Name:
                    </p>
                    <p>
                        <span className="text-lg capitalize">{order.name}</span>
                    </p>
                    <p className="mt-5 flex flex-row gap-2 items-center font-bold text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Customer Address:
                    </p>
                    <p>
                        <span className="text-lg">{order.address}</span>
                    </p>
                    <p className="mt-5 flex flex-row gap-2 items-center font-bold text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Customer Number:
                    </p>
                    <p>
                        <span className="text-lg capitalize">
                            {order.number}
                        </span>
                    </p>
                </div>
                <div className="flex-1">
                    <div className="border-2 px-2 py-5 lg:p-5 rounded-md">
                        <h3 className="text-xl font-bold">Order Summary</h3>
                        {order.orders.map((item, index) => (
                            <div className="flex flex-row gap-2" key={index}>
                                <Link href={`/product/${item.product.slug}`}>
                                    <figure className="cursor-pointer">
                                        <Image
                                            src={imageBuilder(
                                                item.product.image
                                            ).toString()}
                                            alt={`Ordered ${item.product.name}`}
                                            width={100}
                                            height={100}
                                        />
                                    </figure>
                                </Link>
                                <div className="flex flex-col justify-center">
                                    <Link
                                        href={`/product/${item.product.slug}`}
                                    >
                                        <h4 className="text-lg font-medium link link-hover hover:text-primary">
                                            {item.product.name}
                                        </h4>
                                    </Link>
                                    <p className="font-bold text-sm text-primary">
                                        ₱ {item.product.price}
                                    </p>
                                    <p className="">
                                        <small>
                                            Quantity Ordered: {item.items} items
                                        </small>
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="divider"></div>
                        <div className="px-5 flex flex-row justify-between items-center my-3">
                            <p>Total Price:</p>
                            <p className="text-lg font-bold">₱ {order.price}</p>
                        </div>
                        <div className="px-5 flex flex-row justify-between items-center">
                            <p>Total Items:</p>
                            <p className="text-lg font-bold">{order.items}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const OrderQuery = groq`
*[_type == "order" && _id == $orderId][0] {
    _id,
    name,
    address,
    number,
    orders[] {
      items,
      product->{
       name,
       price, 
       "image": images[0],
       "slug": slug.current
      }
    }, 
    items,
    processing,
    price,
    status->{
        status
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async ({
    params,
    preview = false,
}) => {
    const orderId = params?.id || '';

    const order: IOrderItem = await getClient(preview).fetch(OrderQuery, {
        orderId,
    });

    if (!order)
        return {
            redirect: {
                destination: '/order/notfound',
                permanent: false,
            },
        };

    return {
        props: { order },
    };
};

export default TrackOrder;
