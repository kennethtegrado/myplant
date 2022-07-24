import type { FunctionComponent } from 'react';

import Link from 'next/link';

import { CartIcon } from '@components/project-ui';

const Navbar: FunctionComponent = () => {
    return (
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
                                <Link href="/shop">
                                    <span className="font-medium text-primary link link-hover">
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

                                <ul className="z-10 bg-base-100 w-48">
                                    <li className="hover-bordered">
                                        <a>Herb Plants</a>
                                    </li>
                                    <li className="hover-bordered">
                                        <a>Flowering Plants</a>
                                    </li>
                                    <li className="hover-bordered">
                                        <a>Tree Plants</a>
                                    </li>
                                    <li className="hover-bordered">
                                        <a>Vines</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <button className="btn btn-ghost text-primary hidden md:block">
                            Track Order
                        </button>

                        <CartIcon />

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
    );
};

export default Navbar;
