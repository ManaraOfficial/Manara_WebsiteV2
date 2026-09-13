import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '7f8ual58', // Replace with your actual projectId
  dataset: 'production',               // Replace with your dataset if different
  useCdn: true,                       // 'true' for fast response times, 'false' for fresh data
  apiVersion: '2024-01-01',           // Use current date or ISO format
})

// Helper function to build image URLs from Sanity image objects
const builder = imageUrlBuilder(client)

/**
 * @param {any} source
 */
export function urlFor(source) {
  return builder.image(source)
}