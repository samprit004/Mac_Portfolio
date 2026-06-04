import { achievements, education, experience } from '#constants/index.js'

const timelineContentByType = {
  experience: {
    title: 'Work Experience',
    eyebrow: 'Career path',
    summary: 'A concise timeline of roles, impact, and the environments I have worked in.',
    accent: '#0a84ff',
    items: experience.map((item, index) => ({
      id: `experience-${index}`,
      title: item.role,
      subtitle: item.company,
      meta: item.location,
      period: item.duration,
      description: item.description,
    })),
  },
  education: {
    title: 'Education',
    eyebrow: 'Academic foundation',
    summary: 'My academic journey, key milestones, and the results that shaped my technical growth.',
    accent: '#30b0c7',
    items: education.map((item, index) => ({
      id: `education-${index}`,
      title: item.degree,
      subtitle: item.institute,
      meta: item.score,
      period: item.year,
      description: `Completed ${item.degree} at ${item.institute}.`,
    })),
  },
  achievements: {
    title: 'Achievements',
    eyebrow: 'Highlights',
    summary: 'Selected awards, recognitions, and milestones that reflect my growth and consistency.',
    accent: '#f59e0b',
    items: achievements.map((item, index) => ({
      id: `achievement-${index}`,
      title: item.title,
      subtitle: item.organization,
      meta: 'Recognition',
      period: item.year,
      description: item.description,
    })),
  },
}

const getTimelineContent = (type) => timelineContentByType[type] ?? null

export { getTimelineContent }
