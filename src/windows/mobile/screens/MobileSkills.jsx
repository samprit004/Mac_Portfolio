import useMobileWindowStore from '#store/mobileWindow.js'

const skillIconModules = import.meta.glob('../../../../public/skills/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const CATEGORY_META = {
  frontend: 'Front-end',
  backend: 'Back-end',
  db: 'Database',
  devops: 'DevOps',
}
const CATEGORY_ORDER = ['frontend', 'backend', 'db', 'devops']

const formatName = (raw = '') =>
  raw.replace(/\.svg$/i, '').split(/[-_]/g).filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')

const groupedSkills = CATEGORY_ORDER.map((cat) => ({
  key: cat,
  label: CATEGORY_META[cat],
  items: Object.entries(skillIconModules)
    .filter(([path]) => path.includes(`/skills/${cat}/`))
    .map(([path, icon]) => ({ id: path, name: formatName(path.split('/').pop()), icon }))
    .sort((a, b) => a.name.localeCompare(b.name)),
}))

const groupedSkillsMap = Object.fromEntries(groupedSkills.map((group) => [group.key, group]))

const MobileSkills = ({ category }) => {
  const { push } = useMobileWindowStore()
  const selectedGroup = category ? groupedSkillsMap[category] : null

  if (!selectedGroup) {
    return (
      <div className="mob-skills">
        <div className="mob-skills-folder-grid">
          {groupedSkills.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className="mob-skills-folder-item"
              onClick={() =>
                push({
                  id: `skills-${key}`,
                  title: label,
                  component: 'skills',
                  props: { category: key },
                })
              }
            >
              <img src="/images/folder.png" alt={label} className="mob-skills-folder-icon" />
              <span className="mob-skills-folder-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mob-skills">
      <section className="mob-skills-section">
        <h3 className="mob-skills-section-title">{selectedGroup.label}</h3>
        <div className="mob-skills-divider" />
        <div className="mob-skills-grid">
          {selectedGroup.items.map((item) => (
            <div key={item.id} className="mob-skill-tile">
              <div className="mob-skill-tile-icon-wrap">
                <img src={item.icon} alt={item.name} className="mob-skill-tile-icon" />
              </div>
              <span className="mob-skill-tile-name">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MobileSkills
