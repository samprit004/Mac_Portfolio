import { useEffect } from 'react'
import useSafariStore from '#/store/safari/safariStore'
import { profileConfig } from '#/data/profiles/profileConfig'
import GitHubLoading from './GitHubLoading'
import GitHubError from './GitHubError'

/* ── Constants ── */
const GH_BG     = '#0d1117'
const GH_CARD   = '#161b22'
const GH_TEXT   = '#e6edf3'
const GH_MUTED  = '#8b949e'
const GH_BORDER = '#30363d'
const GH_BLUE   = '#58a6ff'
const GH_GREEN  = '#238636'

const LANG_COLORS = {
  JavaScript:'#f1e05a', TypeScript:'#3178c6', Python:'#3572A5',
  HTML:'#e34c26', CSS:'#563d7c', Go:'#00ADD8', Rust:'#dea584',
  Java:'#b07219', 'C++':'#f34b7d', Ruby:'#701516', Shell:'#89e051',
}

const LEVEL_COLORS = ['#161b22','#0e4429','#006d32','#26a641','#39d353']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2]

/* ── Build heatmap grid ── */
const buildGrid = (contributions) => {
  if (!contributions?.length) return { weeks: [], monthLabels: [] }
  const weeks = []
  let week = []
  const firstDate = new Date(contributions[0].date + 'T00:00:00')
  for (let i = 0; i < firstDate.getDay(); i++) week.push(null)
  for (const day of contributions) {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length) { while (week.length < 7) week.push(null); weeks.push(week) }
  const monthLabels = []
  let prevMonth = -1
  weeks.forEach((w, wi) => {
    const first = w.find(Boolean)
    if (first) {
      const m = new Date(first.date + 'T00:00:00').getMonth()
      if (m !== prevMonth) { monthLabels.push({ wi, label: MONTHS[m] }); prevMonth = m }
    }
  })
  return { weeks, monthLabels }
}

/* ── Repo card — full-width ── */
const MobileRepoCard = ({ repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      padding: '14px 16px',
      borderRadius: 8,
      border: `1px solid ${GH_BORDER}`,
      background: GH_CARD,
      textDecoration: 'none',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: GH_MUTED, flexShrink: 0 }}>
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
      </svg>
      <span style={{ color: GH_BLUE, fontWeight: 600, fontSize: 14, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {repo.name}
      </span>
      <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 20, border: `1px solid ${GH_BORDER}`, color: GH_MUTED, flexShrink: 0 }}>
        Public
      </span>
    </div>
    {repo.description && (
      <p style={{ fontSize: 12, color: GH_MUTED, lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {repo.description}
      </p>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: GH_MUTED }}>
      {repo.language && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: LANG_COLORS[repo.language] ?? GH_MUTED, display: 'inline-block' }} />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: GH_MUTED }}>
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stargazers_count}
        </span>
      )}
      {repo.forks_count > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: GH_MUTED }}>
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
          </svg>
          {repo.forks_count}
        </span>
      )}
    </div>
  </a>
)

/* ── Contribution heatmap — mobile (horizontally scrollable) ── */
const MobileHeatmap = () => {
  const {
    githubContributionsByYear, selectedContributionYear,
    fetchContributionsForYear, setSelectedContributionYear,
  } = useSafariStore()

  useEffect(() => {
    fetchContributionsForYear(profileConfig.githubUsername, selectedContributionYear)
  }, [selectedContributionYear]) // eslint-disable-line

  const yearData = githubContributionsByYear[String(selectedContributionYear)]
  const contributions = yearData?.contributions ?? []
  const total = yearData?.total ?? {}
  const totalCount = Object.values(total).reduce((a, b) => a + b, 0)
  const { weeks, monthLabels } = buildGrid(contributions)

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: GH_TEXT, fontSize: 13, fontWeight: 600 }}>
          {totalCount.toLocaleString()} contributions in {selectedContributionYear}
        </span>
      </div>

      {/* Year selector - horizontal pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {YEARS.map(yr => {
          const active = yr === selectedContributionYear
          return (
            <button
              key={yr}
              onClick={() => setSelectedContributionYear(yr)}
              style={{
                padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: active ? '#1f6feb' : '#21262d',
                color: active ? '#fff' : GH_MUTED,
                fontSize: 12, fontWeight: active ? 600 : 400,
              }}
            >
              {yr}
            </button>
          )
        })}
      </div>

      {/* Heatmap — scrollable horizontally */}
      <div style={{
        border: `1px solid ${GH_BORDER}`, borderRadius: 6,
        background: GH_CARD, padding: '10px 12px',
        overflowX: 'auto',
      }}>
        {!yearData ? (
          <p style={{ color: GH_MUTED, fontSize: 12, textAlign: 'center', padding: '16px 0' }}>Loading…</p>
        ) : weeks.length === 0 ? (
          <p style={{ color: GH_MUTED, fontSize: 12, textAlign: 'center', padding: '16px 0' }}>No contributions for {selectedContributionYear}.</p>
        ) : (
          <>
            {/* Month labels */}
            <div style={{ display: 'flex', marginLeft: 24, marginBottom: 2 }}>
              {weeks.map((_, wi) => {
                const hit = monthLabels.find(m => m.wi === wi)
                return (
                  <div key={wi} style={{ width: 11, flexShrink: 0, fontSize: 9, color: GH_MUTED }}>
                    {hit ? hit.label : ''}
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 1 }}>
              {/* Day labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginRight: 2, width: 22, flexShrink: 0 }}>
                {['','Mon','','Wed','','Fri',''].map((d, i) => (
                  <div key={i} style={{ height: 9, fontSize: 8, color: GH_MUTED, lineHeight: '9px', textAlign: 'right' }}>{d}</div>
                ))}
              </div>
              {/* Weeks */}
              {weeks.map((w, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {w.map((day, di) => (
                    <div
                      key={di}
                      title={day ? `${day.count} on ${day.date}` : ''}
                      style={{ width: 9, height: 9, borderRadius: 2, flexShrink: 0, background: day ? LEVEL_COLORS[day.level] : LEVEL_COLORS[0] }}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 9, color: GH_MUTED }}>Less</span>
              {LEVEL_COLORS.map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: 2, background: c, border: '1px solid rgba(255,255,255,0.05)' }} />
              ))}
              <span style={{ fontSize: 9, color: GH_MUTED }}>More</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Main mobile profile ── */
const GitHubProfileMobile = () => {
  const {
    githubData, githubRepos, githubAllRepos,
    githubProfileTab, loading, error,
    fetchGitHubProfile, fetchAllRepos, setGitHubProfileTab,
  } = useSafariStore()

  useEffect(() => {
    fetchGitHubProfile(profileConfig.githubUsername)
  }, []) // eslint-disable-line

  const handleTab = (tab) => {
    setGitHubProfileTab(tab)
    if (tab === 'repositories') fetchAllRepos(profileConfig.githubUsername)
  }

  if (loading) return <GitHubLoading />
  if (error)   return <GitHubError message={error} />
  if (!githubData) return null

  const tabs = [
    { id: 'overview',     label: 'Overview' },
    { id: 'repositories', label: 'Repositories', count: githubData.public_repos },
  ]

  return (
    <div style={{ background: GH_BG, color: GH_TEXT, minHeight: '100%', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Profile hero ── */}
      <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid ${GH_BORDER}` }}>
        {/* Row: avatar + info */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
          <img
            src={githubData.avatar_url}
            alt={githubData.login}
            style={{ width: 64, height: 64, borderRadius: '50%', border: `2px solid ${GH_BORDER}`, flexShrink: 0, objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: GH_TEXT, fontSize: 17, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
              {githubData.name || githubData.login}
            </p>
            <p style={{ color: GH_MUTED, fontSize: 14, margin: '2px 0 8px' }}>{githubData.login}</p>
            {/* Followers row */}
            <div style={{ display: 'flex', gap: 10, fontSize: 12, color: GH_MUTED, flexWrap: 'wrap' }}>
              <a href={`${githubData.html_url}?tab=followers`} target="_blank" rel="noopener noreferrer" style={{ color: GH_MUTED, textDecoration: 'none' }}>
                <span style={{ color: GH_TEXT, fontWeight: 600 }}>{githubData.followers}</span> followers
              </a>
              <span>·</span>
              <a href={`${githubData.html_url}?tab=following`} target="_blank" rel="noopener noreferrer" style={{ color: GH_MUTED, textDecoration: 'none' }}>
                <span style={{ color: GH_TEXT, fontWeight: 600 }}>{githubData.following}</span> following
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        {githubData.bio && (
          <p style={{ color: GH_TEXT, fontSize: 14, lineHeight: 1.55, margin: '0 0 12px' }}>{githubData.bio}</p>
        )}

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 13, color: GH_MUTED, marginBottom: 14 }}>
          {githubData.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg viewBox="0 0 16 16" style={{ width: 13, height: 13, fill: GH_MUTED }}>
                <path d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C2.498 5.07 4.572 6.65 6 8l2 2 2-2c1.428-1.35 3.502-2.93 3.058-4.275-.143-.863-.698-1.723-1.464-2.383A5.53 5.53 0 0 0 8 0zm0 9L5.717 6.886C4.205 5.412 3.734 4.458 3.855 3.5 3.95 2.784 4.49 2.084 5.09 1.52 5.874.85 6.914.5 8 .5c1.086 0 2.126.35 2.91 1.02.6.564 1.14 1.264 1.235 1.98.121.958-.35 1.912-1.862 3.386L8 9z" />
                <path d="M8 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              {githubData.location}
            </span>
          )}
          {githubData.blog && (
            <a href={githubData.blog.startsWith('http') ? githubData.blog : `https://${githubData.blog}`} target="_blank" rel="noopener noreferrer" style={{ color: GH_BLUE, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg viewBox="0 0 16 16" style={{ width: 13, height: 13, fill: GH_BLUE }}>
                <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z" />
              </svg>
              {githubData.blog.replace(/^https?:\/\//, '').split('/')[0]}
            </a>
          )}
        </div>

        {/* Buttons row */}
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: 'center', padding: '7px 12px',
              borderRadius: 6, border: `1px solid ${GH_BORDER}`,
              background: '#21262d', color: GH_TEXT,
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}
          >
            Follow
          </a>
          <a
            href={`${githubData.html_url}?tab=repositories&type=source`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: 'center', padding: '7px 12px',
              borderRadius: 6, border: 'none',
              background: GH_GREEN, color: '#fff',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}
          >
            View repos
          </a>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${GH_BORDER}`, padding: '0 16px', overflowX: 'auto' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => handleTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '12px 12px', fontSize: 14, whiteSpace: 'nowrap',
              fontWeight: githubProfileTab === t.id ? 600 : 400,
              color: githubProfileTab === t.id ? GH_TEXT : GH_MUTED,
              background: 'transparent', border: 'none',
              borderBottom: githubProfileTab === t.id ? '2px solid #f78166' : '2px solid transparent',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            {t.label}
            {t.count != null && (
              <span style={{
                padding: '1px 6px', fontSize: 11, borderRadius: 20,
                background: githubProfileTab === t.id ? '#30363d' : '#21262d',
                color: githubProfileTab === t.id ? GH_TEXT : GH_MUTED,
              }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {githubProfileTab === 'overview' && (
          <>
            {/* Popular repos — single column */}
            {githubRepos.length > 0 && (
              <div>
                <p style={{ color: GH_TEXT, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Popular repositories</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {githubRepos.slice(0, 6).map(r => <MobileRepoCard key={r.id} repo={r} />)}
                </div>
              </div>
            )}

            {/* Contribution heatmap */}
            <MobileHeatmap />
          </>
        )}

        {githubProfileTab === 'repositories' && (
          <div>
            {githubAllRepos.length === 0
              ? <p style={{ color: GH_MUTED, fontSize: 13 }}>Loading repositories…</p>
              : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {githubAllRepos.map(r => <MobileRepoCard key={r.id} repo={r} />)}
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default GitHubProfileMobile
