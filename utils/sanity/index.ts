import { createClient, createPreviewSubscriptionHook } from 'next-sanity';
import sanityClient from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

import { config } from './config';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

if (!config.projectId) {
    throw Error('The Project ID is not set. Check your environment variables.');
}

const builder = createImageUrlBuilder(config);

export const urlFor = (source: SanityImageSource) => builder.image(source);

export const imageBuilder = (source: SanityImageSource) =>
    builder.image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const client = createClient(config);

export const previewClient = createClient({
    ...config,
    useCdn: false,
});

export const clientSanity = sanityClient(config);

export const getClient = (usePreview?: boolean) =>
    usePreview ? previewClient : client;
export default client;
