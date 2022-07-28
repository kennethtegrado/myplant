import type { FunctionComponent } from 'react';

// Sanity
import { PortableText } from '@portabletext/react';

interface ProductDescriptionProps {
    description: any;
}

const ProductDescription: FunctionComponent<ProductDescriptionProps> = ({
    description,
}) => {
    return (
        <article className="prose prose-slate max-w-none">
            <PortableText value={description} />
        </article>
    );
};

export default ProductDescription;
