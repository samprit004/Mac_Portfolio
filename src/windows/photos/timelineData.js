import { gallery, locations } from '#constants/index.js'

const TIMELINE_BLUEPRINT = [
  { year: '2025', date: 'December 28', count: 3, label: 'Winter highlights' },
  { year: '2025', date: 'September 02', count: 2, label: 'Product snapshots' },
  { year: '2024', date: 'October 11', count: 3, label: 'Projects and portraits' },
  { year: '2024', date: 'June 17', count: 2, label: 'Behind the scenes' },
  { year: '2023', date: 'February 24', count: 2, label: 'Archived moments' },
]

const collectWorkImages = () =>
  (locations.work.children ?? []).flatMap((project) =>
    (project.children ?? [])
      .filter((item) => item.fileType === 'img' && item.imageUrl)
      .map((item) => ({
        id: `work-${project.id}-${item.id}`,
        name: item.name,
        imageUrl: item.imageUrl,
        source: project.name,
      }))
  )

const collectLocationImages = (locationKey, prefix, source) =>
  (locations[locationKey]?.children ?? [])
    .filter((item) => item.fileType === 'img' && item.imageUrl)
    .map((item) => ({
      id: `${prefix}-${item.id}`,
      name: item.name,
      imageUrl: item.imageUrl,
      source,
    }))

const buildTimelineImages = () => {
  const galleryImages = gallery.map((item, index) => ({
    id: `gallery-${item.id}`,
    name: `gallery-${index + 1}.png`,
    imageUrl: item.img,
    source: 'Library',
  }))

  return [
    ...galleryImages,
    ...collectWorkImages(),
    ...collectLocationImages('about', 'about', 'Portraits'),
    ...collectLocationImages('trash', 'archive', 'Archive'),
  ]
}

const buildTimelineGroups = () => {
  const images = buildTimelineImages()
  let cursor = 0

  return TIMELINE_BLUEPRINT.map((group, index) => {
    const items = images.slice(cursor, cursor + group.count)
    cursor += group.count

    return {
      ...group,
      id: `timeline-${index}-${group.year}-${group.date.replace(/\s+/g, '-').toLowerCase()}`,
      items,
    }
  }).filter((group) => group.items.length > 0)
}

const getTimelineRange = (groups) => {
  if (!groups.length) return ''
  const years = [...new Set(groups.map((group) => group.year))]
  return years.length === 1 ? years[0] : `${years.at(-1)} - ${years[0]}`
}

export { buildTimelineGroups, getTimelineRange }
