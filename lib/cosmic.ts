import { createBucketClient } from '@cosmicjs/sdk';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'gemini-test-production',
  readKey: process.env.COSMIC_READ_KEY || 'OH8BzZvCM2qTMrseXTVTX7rxR95iLjoRt0B3yQMd9OO8ACVwje',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
  apiEnvironment: "staging"
});

// Helper to check for errors
export function isCosmicError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}