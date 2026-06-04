import React from 'react'
import clsx from 'clsx'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import useLocationStore from '#/store/location'
import { Search } from 'lucide-react'
import { locations } from '#/constants'
import useWindowStore from '#/store/Window'

const skillIconModules = import.meta.glob('../../public/skills/**/*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
});

const SKILL_CATEGORY_META = {
    frontend: { label: 'Front-end' },
    backend: { label: 'Back-end' },
    db: { label: 'Database' },
    devops: { label: 'DevOps' },
};

const SKILL_CATEGORY_ORDER = ['frontend', 'backend', 'db', 'devops'];

const formatSkillName = (rawName = '') =>
    rawName
        .replace(/\.svg$/i, '')
        .split(/[-_]/g)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

const groupedSkills = SKILL_CATEGORY_ORDER.map((category) => {
    const items = Object.entries(skillIconModules)
        .filter(([path]) => path.includes(`/skills/${category}/`))
        .map(([path, icon]) => {
            const fileName = path.split('/').pop() ?? '';
            return {
                id: path,
                name: formatSkillName(fileName),
                icon,
            };
        })
        .sort((left, right) => left.name.localeCompare(right.name));

    return {
        key: category,
        label: SKILL_CATEGORY_META[category].label,
        items,
    };
});

const groupedSkillsMap = Object.fromEntries(groupedSkills.map((group) => [group.key, group]));

const Finder = () => {

    const {openWindow} = useWindowStore();
    const {activeLocation, setActiveLocation} = useLocationStore();
    const favoriteLocations = [
        locations.work,
        locations.about,
        locations.resume,
        locations.skills,
        locations.trash,
    ];

    const isLocationActive = (item) => {
        if (!activeLocation) return false;
        if (item.id === activeLocation.id) return true;

        if (item.type === 'skills' && activeLocation.type === 'skill-category') {
            return true;
        }

        return false;
    };

    const openItem = (item) => {
        if(item.fileType === 'pdf') return openWindow('resume');
        if(item.kind === 'folder') return setActiveLocation(item);
        if(['fig','url'].includes(item.fileType)) return window.open(item.href, '_blank');

        openWindow(`${item.fileType}${item.kind}`, item)
    };

    const renderList = (items) => items.map((item)=>(
        <li 
        key={item.id} 
        onClick={() => setActiveLocation(item)}
        className={clsx(isLocationActive(item) ? 'active' : 'not-active')}>
            <img src={item.icon} alt={item.name} className='w-4 h-4' />
            <p className='text-sm font-medium truncate'>{item.name}</p>

        </li>
    ))

    const renderSkillsSection = (skillCategory) => {
        const group = groupedSkillsMap[skillCategory];

        if (!group) return null;

        return (
            <ul className='content'>
                {group.items.length ? (
                    group.items.map((item) => (
                        <li
                            key={item.id}
                            className="finder-grid-item skill-grid-item"
                        >
                            <div className="skill-grid-icon-wrap">
                                <img src={item.icon} alt={item.name} className="skill-grid-icon" />
                            </div>
                            <p>{item.name}</p>
                        </li>
                    ))
                ) : (
                    <li className="text-sm" style={{ color: 'var(--window-muted)' }}>No skills added yet.</li>
                )}
            </ul>
        )
    }

  return (
    <>
    <div id="window-header">
        <WindowControls target="finder" />
        <Search className='icon' />
    </div>
    <div className="flex h-full" style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}>
        <div className="sidebar">
            <div>
            <h3>Favoriotes</h3>
            <ul>
                {renderList(favoriteLocations)}
            </ul>
            </div>

            <div>
            <h3>Works</h3>
            <ul>
                {renderList(locations.work.children)}
            </ul>
            </div>
        </div>
        {activeLocation?.type === 'skill-category' ? (
            renderSkillsSection(activeLocation.skillCategory)
        ) : (
            <ul className='content'>
                {activeLocation ?.children.map((item)=>(
                    <li 
                    key={item.id}
                    className="finder-grid-item"
                    onClick={() => openItem(item)}>
                        <img src={item.icon} alt={item.name} />
                        <p>{item.name}</p>

                    </li>
                ))}
            </ul>
        )}
    </div>

    
    </>
  )
}

const FinderWindow = WindowWrapper(Finder, 'finder')
export default FinderWindow