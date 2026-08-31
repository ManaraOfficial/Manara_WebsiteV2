// Build-time LQIP registry: maps each processed image URL to a tiny (24px,
// blurred) inline WebP data-URI, so BlurImage can show a blurred preview of the
// *actual* photo while the full file downloads.

const full = import.meta.glob('../assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  import: 'default',
  eager: true,
})

const tiny = import.meta.glob('../assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  query: { w: 24, blur: 8, format: 'webp', inline: true },
  import: 'default',
  eager: true,
})

const registry = new Map()
for (const key in full) {
  if (tiny[key]) registry.set(full[key], tiny[key])
}

export function blurFor(url) {
  return registry.get(url)
}
