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
        className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')}>
            <img src={item.icon} alt={item.name} className='w-4 h-4' />
            <p className='text-sm font-medium truncate'>{item.name}</p>

        </li>
    ))

    const renderSkillsSection = () => (
        <div className="content max-w-none overflow-y-auto">
            <div className="mx-auto flex max-w-4xl flex-col gap-5">
                {groupedSkills.map(({ key, label, items }) => (
                    <section key={key} className="space-y-2">
                        <div className="space-y-1.5">
                            <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-gray-900">{label}</h3>
                            <div className="h-px w-full bg-[rgba(60,60,67,0.08)]" />
                        </div>

                        {items.length ? (
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center gap-1.5 rounded-full border border-[rgba(60,60,67,0.08)] bg-[rgba(246,246,248,0.9)] px-2.5 py-1.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,122,255,0.18)] hover:bg-white hover:shadow-[0_6px_14px_rgba(15,23,42,0.08)]"
                                    >
                                        <img src={item.icon} alt={item.name} className="size-4 shrink-0 object-contain object-center opacity-90 transition-transform duration-200 group-hover:scale-105" />
                                        <p className="text-[12px] font-medium leading-none tracking-[-0.01em] text-gray-700">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[13px] text-gray-400">No skills added yet.</p>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )

  return (
    <>
    <div id="window-header">
        <WindowControls target="finder" />
        <Search className='icon' />
    </div>
    <div className="bg-white flex h-full">
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
        {activeLocation?.type === 'skills' ? (
            renderSkillsSection()
        ) : (
            <ul className='content'>
                {activeLocation ?.children.map((item)=>(
                    <li 
                    key={item.id}
                    className={item.position}
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