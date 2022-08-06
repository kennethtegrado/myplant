import type { FunctionComponent } from 'react';

// NEXT Improt
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Component Import
import { CartIcon } from '@components/project-ui';

// Logo Import
import logo from '@public/logo.svg';

const Navbar: FunctionComponent = () => {
    const router = useRouter();

    const path = router.pathname.replace('/', ' ').trim().split(' ')[0];

    const query = router.query;

    let category =
        query.categories &&
        typeof query.categories == 'string' &&
        query.categories.split(',').length === 1 &&
        query.categories.split(',')[0];

    return (
        <header className="shadow-md w-full bg-base-100">
            <nav className="navbar px-10 container mx-auto z-50">
                <div className="flex-1">
                    <Link passHref href="/">
                        <h3 className="text-xl font-bold capitalize cursor-pointer flex gap-1 items-center flex-row">
                            <div className="hidden md:block md:w-6 md:h-6">
                                <Image
                                    src={logo}
                                    alt="MyLittlePlant - New Beginning"
                                ></Image>
                            </div>
                            <div> MyLittlePlant</div>
                        </h3>
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="flex flex-row gap-6 items-center">
                        <ul className="menu menu-horizontal hidden md:block">
                            <li tabIndex={0}>
                                <Link href="/shop">
                                    <span
                                        className={`font-medium link ${
                                            path === 'shop'
                                                ? 'text-primary'
                                                : 'link-hover'
                                        }`}
                                    >
                                        Shop
                                        <svg
                                            className="fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                        </svg>
                                    </span>
                                </Link>

                                <ul className="z-10 bg-base-200 w-48 shadow-lg">
                                    <li
                                        className={`hover-bordered ${
                                            category === '"herbs"' &&
                                            'bg-primary text-white'
                                        }`}
                                        onClick={() =>
                                            router.push(
                                                '/shop?categories="herbs"'
                                            )
                                        }
                                    >
                                        <a>Herb Plants</a>
                                    </li>
                                    <li
                                        className={`hover-bordered ${
                                            category === '"flowering"' &&
                                            'bg-primary text-white'
                                        }`}
                                        onClick={() =>
                                            router.push(
                                                '/shop?categories="flowering"'
                                            )
                                        }
                                    >
                                        <a>Flowering Plants</a>
                                    </li>
                                    <li
                                        className={`hover-bordered ${
                                            category === '"trees"' &&
                                            'bg-primary text-white'
                                        }`}
                                        onClick={() =>
                                            router.push(
                                                '/shop?categories="trees"'
                                            )
                                        }
                                    >
                                        <a>Tree Plants</a>
                                    </li>
                                    <li
                                        className={`hover-bordered ${
                                            category === '"vines"' &&
                                            'bg-primary text-white'
                                        }`}
                                        onClick={() =>
                                            router.push(
                                                '/shop?categories="vines"'
                                            )
                                        }
                                    >
                                        <a>Vines</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <Link href="/order" passHref>
                            <button
                                className={` btn  hidden md:block font-medium ${
                                    path === 'order'
                                        ? 'btn-primary'
                                        : 'btn-ghost'
                                }`}
                            >
                                Track Order
                            </button>
                        </Link>

                        <CartIcon active={path === 'cart'} />

                        <div className="dropdown dropdown-end md:hidden">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
                            >
                                <li
                                    className={`${
                                        path === 'shop' && !category
                                            ? 'bg-primary text-white'
                                            : 'link-hover'
                                    }`}
                                >
                                    <Link href="/shop">All Products</Link>
                                </li>
                                <li
                                    className={`hover-bordered ${
                                        category === '"herbs"' &&
                                        'bg-primary text-white'
                                    }`}
                                    onClick={() =>
                                        router.push('/shop?categories="herbs"')
                                    }
                                >
                                    <a>Herb Plants</a>
                                </li>
                                <li
                                    className={`hover-bordered ${
                                        category === '"flowering"' &&
                                        'bg-primary text-white'
                                    }`}
                                    onClick={() =>
                                        router.push(
                                            '/shop?categories="flowering"'
                                        )
                                    }
                                >
                                    <a>Flowering Plants</a>
                                </li>
                                <li
                                    className={`hover-bordered ${
                                        category === '"trees"' &&
                                        'bg-primary text-white'
                                    }`}
                                    onClick={() =>
                                        router.push('/shop?categories="trees"')
                                    }
                                >
                                    <a>Tree Plants</a>
                                </li>
                                <li
                                    className={`hover-bordered ${
                                        category === '"vines"' &&
                                        'bg-primary text-white'
                                    }`}
                                    onClick={() =>
                                        router.push('/shop?categories="vines"')
                                    }
                                >
                                    <a>Vines</a>
                                </li>
                                <li>
                                    <Link href="/order" passHref>
                                        <a className="text-primary active:text-white">
                                            Track Order
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
