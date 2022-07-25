import type { FunctionComponent } from 'react';

// NEXT Import
import { useRouter } from 'next/router';

interface ShopPaginationProps {
    pages: number;
}

const ShopPagination: FunctionComponent<ShopPaginationProps> = ({ pages }) => {
    const router = useRouter();

    let page = '',
        url = '/shop',
        params = '?';

    if (router.query.page && typeof router.query.page == 'string') {
        page = router.query.page;
        if (+page > pages || +page < 0) return null;
    } else page = '1';

    for (const key in router.query)
        if (key !== 'page') params += `${key}=${router.query[key]}&&`;

    const previousPage = () => router.push(`${url}${params}page=${+page - 1}`);

    const nextPage = () => router.push(`${url}${params}page=${+page + 1}`);

    return (
        <div className="btn-group justify-end my-10">
            <button
                className={`btn btn-outline btn-primary ${
                    +page <= 1 && 'hidden'
                }`}
                onClick={previousPage}
            >
                «
            </button>
            <button className="btn btn-primary cursor-default">{page}</button>
            <button
                className={`btn btn-outline btn-primary ${
                    +page >= pages && 'hidden'
                }`}
                onClick={nextPage}
            >
                »
            </button>
        </div>
    );
};

export default ShopPagination;
