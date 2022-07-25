import type {
    FunctionComponent,
    ChangeEventHandler,
    FormEventHandler,
} from 'react';

// NEXT Import
import { useRouter } from 'next/router';

// React
import { useState } from 'react';

const SearchProduct: FunctionComponent = () => {
    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');

    const changeSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchInput(event.target.value);
    };

    const submitSearch: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!searchInput) return router.push('/shop');
        return router.push(`/shop?search=${searchInput}`);
    };

    return (
        <div className="form-control">
            <form className="input-group" onSubmit={submitSearch}>
                <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered w-24 md:w-full"
                    onChange={changeSearch}
                    value={searchInput}
                />
                <button className="btn p-2 btn-primary">
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default SearchProduct;
