import type {
    FormEventHandler,
    FormHTMLAttributes,
    FunctionComponent,
} from 'react';

import { useRef } from 'react';
import { useRouter } from 'next/router';

const FilterModal: FunctionComponent = () => {
    const router = useRouter();
    const labelRef = useRef<HTMLLabelElement>(null);

    const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const checkBox = [
            event.currentTarget.flowering,
            event.currentTarget.herbs,
            event.currentTarget.trees,
            event.currentTarget.vines,
        ];
        const categories: string[] = [];
        const minPrice = event.currentTarget.minPrice.value;
        const maxPrice = event.currentTarget.maxPrice.value;
        const maxPriceQuery = maxPrice ? `maxprice=${maxPrice}` : '';
        const minPriceQuery = minPrice ? `minprice=${minPrice}` : '';
        let categoryQuery: string;

        for (const item of checkBox)
            if (item.checked) categories.push(`"${item.name}"`);

        if (!categories.length) categoryQuery = '';
        else categoryQuery = `categories=${categories.join(',')}`;

        const queryString = [maxPriceQuery, minPriceQuery, categoryQuery]
            .filter((query) => query && query)
            .join('&&');
        const path = router.asPath.match(/\/shop(\?search=[a-zA-z0-9]*)?/)?.[0];

        if (!queryString) return router.push('/shop');

        if (path)
            return router.push(
                `${path}${path.includes('?') ? '&&' : '?'}${queryString}`
            );
    };

    return (
        <>
            <label
                htmlFor="filter-modal"
                className="link modal-button link-hover hover:text-primary active:text-primary"
            >
                Filter
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                </svg>
            </label>
            <input type="checkbox" id="filter-modal" className="modal-toggle" />
            <div className="modal">
                <form className="modal-box" onSubmit={submitHandler}>
                    <div className="flex justify-end">
                        <label
                            htmlFor="filter-modal"
                            className="btn btn-circle btn-outline btn-primary btn-sm"
                            ref={labelRef}
                        >
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
                        </label>
                    </div>
                    <h3 className="text-xl font-bold">Filter</h3>
                    <div className="divider -my-1"></div>
                    <div className="pt-5">
                        <p>Price</p>
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <label className="label">
                                    <span className="label-text-alt">Min</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered input-primary h-10"
                                    name="minPrice"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text-alt">Max</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered input-primary h-10"
                                    name="maxPrice"
                                />
                            </div>
                        </div>
                        <p className="mt-3">Categories</p>
                        <div className="grid grid-cols-2">
                            <div>
                                <label className="label justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        name="herbs"
                                    />
                                    <span className="label-text">Herbs</span>
                                </label>
                            </div>
                            <div>
                                <label className="label justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        name="flowering"
                                    />
                                    <span className="label-text">
                                        Flowering Plant
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className="label justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        name="trees"
                                    />
                                    <span className="label-text">Trees</span>
                                </label>
                            </div>
                            <div>
                                <label className="label justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        name="vines"
                                    />
                                    <span className="label-text">Vines</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="filter-modal" className="block">
                            <button
                                className="btn btn-primary"
                                onClick={() => labelRef?.current?.click()}
                            >
                                Apply
                            </button>
                        </label>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FilterModal;
