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

const MobileSkills = () => (
  <div className="mob-skills">
    {groupedSkills.map(({ key, label, items }) => (
      <section key={key} className="mob-skills-section">
        <h3 className="mob-skills-section-title">{label}</h3>
        <div className="mob-skills-divider" />
        <div className="mob-skills-chips">
          {items.map((item) => (
            <div key={item.id} className="mob-skill-chip">
              <img src={item.icon} alt={item.name} className="mob-skill-chip-icon" />
              <span className="mob-skill-chip-name">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
)

export default MobileSkills
