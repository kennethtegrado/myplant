import type { FunctionComponent, ReactNode } from 'react';

// Next Import
import Link from 'next/link';

interface ShopLayoutProps {
    children: ReactNode;
}

const ShopLayout: FunctionComponent<ShopLayoutProps> = ({ children }) => {
    return (
        <>
            <header className="shadow-md w-full bg-base-100">
                <nav className="navbar px-10 container mx-auto z-50">
                    <div className="flex-1">
                        <Link passHref href="/">
                            <h3 className="text-xl font-bold capitalize cursor-pointer">
                                MyLittlePlant
                            </h3>
                        </Link>
                    </div>
                    <div className="flex-none">
                        <div className="flex flex-row gap-6 items-center">
                            <ul className="menu menu-horizontal hidden md:block">
                                <li tabIndex={0}>
                                    <span className="font-medium text-primary">
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
                                    <ul className="z-10 bg-base-100 w-48">
                                        <li className="hover-bordered">
                                            <a>All Products</a>
                                        </li>
                                        <li className="hover-bordered">
                                            <a>Plants</a>
                                        </li>
                                        <li className="hover-bordered">
                                            <a>Trees</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <button className="btn btn-ghost text-primary hidden md:block">
                                Track Order
                            </button>

                            <Link passHref href="/cart">
                                <button className="btn btn-circle btn-ghost relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span className="badge badge-ghost absolute top-0 -right-3">
                                        0
                                    </span>
                                </button>
                            </Link>

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
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a>All Products</a>
                                    </li>
                                    <li>
                                        <a>Plants</a>
                                    </li>
                                    <li>
                                        <a>Trees</a>
                                    </li>
                                    <li>
                                        <a className="text-primary active:text-white">
                                            Track Order
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="px-10 container mx-auto z-0">{children}</main>
            <footer className="bg-accent text-base-content">
                <footer className="footer container mx-auto p-10">
                    <div>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current text-primary"
                        >
                            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-primary">
                            MyLittlePlant.co
                        </h3>
                        <p>
                            The start of my dream of building e-commerce
                            applications starting this 2022.
                        </p>
                    </div>
                    <div>
                        <span className="footer-title">Products</span>
                        <a className="link link-hover">Big Plant</a>
                        <a className="link link-hover">Trees</a>
                        <a className="link link-hover">Small Plant</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                    </div>
                </footer>
            </footer>
        </>
    );
};

export default ShopLayout;
