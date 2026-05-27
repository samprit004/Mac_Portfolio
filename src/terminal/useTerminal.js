import { useState, useRef, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import useWindowStore from '#store/Window.js';
import useLocationStore from '#store/location.js';
import { COMMANDS, COMMAND_MAP } from '#/terminal/registry.js';
import { parseCommand } from '#/terminal/parser.js';
import {
  blogPosts,
  techStack,
  socials,
  locations,
  dockApps,
  education,
  experience,
  achievements,
} from '#constants/index.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const HISTORY_KEY  = 'portfolio_term_history';
const THEME_KEY    = 'portfolio_term_theme';
const MAX_HISTORY  = 80;

export const THEMES = {
  dark: {
    name: 'dark',
    bg: '#0d1117',
    headerBg: '#161b22',
    text: '#e6edf3',
    prompt: '#58a6ff',
    promptHost: '#7ee787',
    dim: '#8b949e',
    success: '#7ee787',
    error: '#f85149',
    warning: '#d29922',
    info: '#79c0ff',
    border: 'rgba(255,255,255,0.08)',
    selectionBg: '#264f78',
    cursorColor: '#58a6ff',
  },
  dracula: {
    name: 'dracula',
    bg: '#282a36',
    headerBg: '#21222c',
    text: '#f8f8f2',
    prompt: '#bd93f9',
    promptHost: '#50fa7b',
    dim: '#6272a4',
    success: '#50fa7b',
    error: '#ff5555',
    warning: '#f1fa8c',
    info: '#8be9fd',
    border: 'rgba(255,255,255,0.1)',
    selectionBg: '#44475a',
    cursorColor: '#bd93f9',
  },
  nord: {
    name: 'nord',
    bg: '#2e3440',
    headerBg: '#232731',
    text: '#d8dee9',
    prompt: '#81a1c1',
    promptHost: '#a3be8c',
    dim: '#4c566a',
    success: '#a3be8c',
    error: '#bf616a',
    warning: '#ebcb8b',
    info: '#88c0d0',
    border: 'rgba(255,255,255,0.07)',
    selectionBg: '#434c5e',
    cursorColor: '#81a1c1',
  },
  solarized: {
    name: 'solarized',
    bg: '#002b36',
    headerBg: '#073642',
    text: '#839496',
    prompt: '#268bd2',
    promptHost: '#859900',
    dim: '#586e75',
    success: '#859900',
    error: '#dc322f',
    warning: '#b58900',
    info: '#2aa198',
    border: 'rgba(255,255,255,0.07)',
    selectionBg: '#073642',
    cursorColor: '#268bd2',
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

let _lineId = 0;
const mkLine = (type, content, meta = {}) => ({
  id: ++_lineId,
  type,
  content,
  ...meta,
});

const blank  = ()       => mkLine('blank', '');
const out    = (t)      => mkLine('output', t);
const info   = (t)      => mkLine('info', t);
const ok     = (t)      => mkLine('success', t);
const err    = (t)      => mkLine('error', t);
const warn   = (t)      => mkLine('warning', t);
const dim    = (t)      => mkLine('dim', t);
const sep    = ()       => mkLine('separator', '');

// ─── Fuse instance (rebuilt once) ────────────────────────────────────────────

const fuse = new Fuse(COMMANDS, {
  keys: ['name', 'aliases', 'keywords', 'description'],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 1,
});

// ─── Virtual filesystem ───────────────────────────────────────────────────────

const FS = {
  '~':                       ['portfolio/'],
  '~/portfolio':             ['projects/', 'articles/', 'about/', 'contact/', 'resume/'],
  '~/portfolio/projects':    Object.keys(locations.work?.children?.reduce((a,c) => ({...a,[c.name+'/']:1}), {}) ?? {}),
  '~/portfolio/articles':    blogPosts.map(b => b.title.replace(/\s+/g,'_').toLowerCase() + '.md'),
  '~/portfolio/about':       ['me.png', 'about-me.txt'],
  '~/portfolio/contact':     ['email.txt', 'socials.json'],
  '~/portfolio/resume':      ['Resume.pdf'],
};

// ─── Boot sequence lines ──────────────────────────────────────────────────────

const BOOT_LINES = [
  dim('Initialising portfolio.sh v2.0.0 ...'),
  dim('Loading modules  ▸ [constants] [store] [commands] [registry]'),
  ok('✓  All modules loaded — system ready.'),
  blank(),
  mkLine('ascii', [
    '  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ ',
    ' ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗',
    ' ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║',
    ' ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║',
    ' ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝',
    ' ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ',
  ]),
  blank(),
  info('  Welcome  →  samprit.portfolio — Interactive Terminal'),
  dim('  ───────────────────────────────────────────────────────────'),
  out('  Type  /help  to see all commands     Tab → autocomplete'),
  out('  Use  ↑↓  to navigate history         Esc → close suggestions'),
  blank(),
];

// ─── MAIN HOOK ────────────────────────────────────────────────────────────────

const useTerminal = () => {
  // ── Store ──────────────────────────────────────────────────────────────────
  const { openWindow, focusWindow, windows } = useWindowStore();
  const { setActiveLocation }                = useLocationStore();

  // ── Persistent state ───────────────────────────────────────────────────────
  const savedHistory = useRef(
    (() => { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; } })()
  );
  const savedTheme = useRef(
    THEMES[localStorage.getItem(THEME_KEY)] ?? THEMES.dark
  );

  // ── Component state ────────────────────────────────────────────────────────
  const [lines,       setLines]       = useState([]);
  const [input,       setInput]       = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggIdx,     setSuggIdx]     = useState(0);
  const [histIdx,     setHistIdx]     = useState(-1);
  const [theme,       setThemeState]  = useState(savedTheme.current);
  const [cwd,         setCwd]         = useState('~/portfolio');
  const [matrixMode,  setMatrixMode]  = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const inputRef     = useRef(null);
  const scrollRef    = useRef(null);
  const hasBooted    = useRef(false);
  const matrixTimer  = useRef(null);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const addLines = useCallback((newLines) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const addLine = useCallback((line) => {
    setLines(prev => [...prev, line]);
  }, []);

  const clearLines = useCallback(() => setLines([]), []);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t.name);
  }, []);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  // Auto-scroll whenever lines change
  useEffect(() => { scrollToBottom(); }, [lines, scrollToBottom]);

  // ── Boot sequence ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    let delay = 0;
    BOOT_LINES.forEach((line, i) => {
      delay += i === 0 ? 80 : 60;
      setTimeout(() => addLine(line), delay);
    });
  }, [addLine]);

  // Focus input when terminal window becomes visible
  useEffect(() => {
    const section = document.getElementById('terminal');
    if (!section) return;
    const obs = new MutationObserver(() => {
      if (section.style.display !== 'none') {
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    });
    obs.observe(section, { attributes: true, attributeFilter: ['style'] });
    return () => obs.disconnect();
  }, []);

  // ─── Command handlers ──────────────────────────────────────────────────────

  const HANDLERS = {

    // ── help ─────────────────────────────────────────────────────────────────
    help: ({ args }) => {
      const target = args[0];
      if (target) {
        const cmd = COMMAND_MAP[target.replace(/^\//, '')];
        if (!cmd) return [err(`Command not found: ${target}`), dim(`Try /help to see all commands.`)];
        return [
          blank(),
          ok(`  ${cmd.name}`),
          dim(`  ${cmd.description}`),
          out(`  Usage:    ${cmd.usage}`),
          out(`  Aliases:  ${cmd.aliases.length ? cmd.aliases.map(a => `/${a}`).join(', ') : '—'}`),
          out(`  Category: ${cmd.category}`),
          ...(cmd.subcommands ? [out(`  Sub-commands: ${cmd.subcommands.join(' | ')}`)] : []),
          blank(),
        ];
      }

      const grouped = COMMANDS
        .filter(c => !c.hidden)
        .reduce((acc, c) => {
          (acc[c.category] = acc[c.category] ?? []).push(c);
          return acc;
        }, {});

      const result = [blank()];
      for (const [cat, cmds] of Object.entries(grouped)) {
        result.push(info(`  ${cat}`));
        cmds.forEach(c => {
          const name    = `/${c.name}`.padEnd(16);
          const aliases = c.aliases.length ? dim(`  (${c.aliases.map(a=>`/${a}`).join(', ')})`) : null;
          result.push(mkLine('help-row', { name, desc: c.description, aliases }));
        });
        result.push(blank());
      }
      result.push(dim('  Tip: /help <command> for detailed usage.'));
      result.push(blank());
      return result;
    },

    // ── clear ────────────────────────────────────────────────────────────────
    clear: () => { clearLines(); return []; },

    // ── whoami ───────────────────────────────────────────────────────────────
    whoami: () => [
      blank(),
      ok('  visitor@portfolio'),
      out('  ────────────────────────────────'),
      out('  Role:     Developer / User'),
      out('  Host:     samprit.das.portfolio'),
      out('  Shell:    portfolio.sh 2.0'),
      out('  Access:   read-only (obviously)'),
      blank(),
    ],

    // ── pwd ───────────────────────────────────────────────────────────────────
    pwd: ({ ctx }) => [out(`  ${ctx.cwd}`)],

    // ── ls ───────────────────────────────────────────────────────────────────
    ls: ({ args, ctx }) => {
      const path    = args[0] ?? ctx.cwd;
      const entries = FS[path] ?? FS[`~/${path}`] ?? null;
      if (!entries) return [err(`ls: ${path}: No such directory`)];
      return [
        blank(),
        out(`  ${path}`),
        out('  ' + entries.map(e => e.endsWith('/') ? info(e) : e).map(e =>
          typeof e === 'string' ? e : e.content
        ).join('   ')),
        blank(),
      ];
    },

    // ── echo ─────────────────────────────────────────────────────────────────
    echo: ({ args }) => [out(`  ${args.join(' ')}`)],

    // ── date ─────────────────────────────────────────────────────────────────
    date: () => {
      const now = new Date();
      return [
        blank(),
        out(`  ${now.toDateString()}  ${now.toLocaleTimeString()}`),
        blank(),
      ];
    },

    // ── theme ─────────────────────────────────────────────────────────────────
    theme: ({ args, ctx }) => {
      const sub = args[0];
      if (!sub || sub === 'list') {
        const current = ctx.theme.name;
        return [
          blank(),
          info('  Available themes:'),
          ...Object.keys(THEMES).map(t =>
            t === current ? ok(`  ● ${t}  ← active`) : out(`  ○ ${t}`)
          ),
          blank(),
          dim('  Usage: /theme <name>'),
          blank(),
        ];
      }
      const t = THEMES[sub];
      if (!t) return [err(`Unknown theme: "${sub}".  Try /theme list`)];
      ctx.setTheme(t);
      return [ok(`  Theme switched to "${t.name}".`), blank()];
    },

    // ── neofetch ─────────────────────────────────────────────────────────────
    neofetch: () => {
      const projectCount = locations.work?.children?.length ?? 0;
      const articleCount = blogPosts.length;
      const skillCount   = techStack.reduce((s, c) => s + c.items.length, 0);
      const now          = new Date();
      const uptime       = `Always online 🟢`;
      return [
        blank(),
        mkLine('neofetch', {
          art: [
            '        ████████████████',
            '       ██              ██',
            '      ██   ██  ██  ██   ██',
            '      ██                ██',
            '      ██   ████████     ██',
            '       ██              ██',
            '        ████████████████',
          ],
          info: [
            ['', 'visitor@samprit-portfolio'],
            ['', '─────────────────────────────────'],
            ['OS', 'Portfolio OS 2.0.0 (React 19)'],
            ['Host', 'samprit.das.portfolio'],
            ['Shell', 'portfolio.sh 2.0'],
            ['Date', now.toDateString()],
            ['Uptime', uptime],
            ['Projects', `${projectCount} shipped`],
            ['Articles', `${articleCount} published`],
            ['Tech stack', `${skillCount} technologies`],
            ['Theme', THEMES[localStorage.getItem(THEME_KEY) ?? 'dark']?.name ?? 'dark'],
          ],
        }),
        blank(),
      ];
    },

    // ── projects ──────────────────────────────────────────────────────────────
    projects: ({ args, ctx }) => {
      const sub = args[0];
      const projects = locations.work?.children ?? [];

      if (sub === 'open' && args[1]) {
        const query  = args.slice(1).join(' ').toLowerCase();
        const match  = projects.find(p => p.name.toLowerCase().includes(query));
        if (!match) return [
          err(`  Project not found: "${query}"`),
          dim(`  Try: /projects list`),
        ];
        ctx.openWindow('finder');
        setTimeout(() => ctx.setActiveLocation(match), 50);
        return [ok(`  Opening project: ${match.name}`), dim('  Finder window opened.')];
      }

      if (!sub || sub === 'list') {
        return [
          blank(),
          info(`  Projects  (${projects.length} total)`),
          sep(),
          ...projects.map((p, i) =>
            mkLine('project-row', { index: i + 1, project: p })
          ),
          blank(),
          dim('  /open <name>  →  open project in Finder'),
          blank(),
        ];
      }

      return [err(`Unknown sub-command: ${sub}.  Usage: /projects [list | open <name>]`)];
    },

    // ── articles ──────────────────────────────────────────────────────────────
    articles: ({ args, ctx }) => {
      const sub = args[0];

      if (sub === 'latest') {
        const latest = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        if (!latest) return [warn('  No articles found.')];
        ctx.openWindow('safari');
        return [
          ok(`  Opening: ${latest.title}`),
          dim(`  Published: ${latest.date}`),
        ];
      }

      const list = !sub || sub === 'list' ? blogPosts : blogPosts.filter(b =>
        b.title.toLowerCase().includes(sub.toLowerCase())
      );

      return [
        blank(),
        info(`  Articles  (${list.length} found)`),
        sep(),
        ...list.map((b, i) => mkLine('article-row', { index: i + 1, article: b })),
        blank(),
        dim('  /articles latest  →  open newest article'),
        blank(),
      ];
    },

    // ── skills ────────────────────────────────────────────────────────────────
    skills: () => [
      blank(),
      info('  Tech Stack'),
      sep(),
      ...techStack.map(({ category, items }) =>
        mkLine('skill-row', { category, items })
      ),
      blank(),
      dim(`  ${techStack.reduce((s,c) => s + c.items.length, 0)} technologies mastered`),
      blank(),
    ],

    // ── resume ────────────────────────────────────────────────────────────────
    resume: ({ ctx }) => {
      ctx.openWindow('resume');
      return [ok('  Opening resume viewer...'), blank()];
    },

    // ── about ─────────────────────────────────────────────────────────────────
    about: () => {
      const item = locations.about?.children?.find(c => c.fileType === 'txt');
      return [
        blank(),
        info('  About Me'),
        sep(),
        out('  Hey! I\'m Samprit Das 👋'),
        out('  A web developer who builds sleek, interactive experiences.'),
        blank(),
        ...(item?.description ?? []).map(line => dim(`  ${line}`)),
        blank(),
        dim('  /contact  to get in touch   /resume  to view CV'),
        blank(),
      ];
    },

    // ── contact ───────────────────────────────────────────────────────────────
    contact: ({ ctx }) => {
      ctx.openWindow('contact');
      return [
        blank(),
        info('  Contact'),
        sep(),
        out('  Opening contact window...'),
        blank(),
        dim('  /socials  for social media links'),
        blank(),
      ];
    },

    // ── socials ───────────────────────────────────────────────────────────────
    socials: () => [
      blank(),
      info('  Social Links'),
      sep(),
      ...socials.map(s => mkLine('social-row', { social: s })),
      blank(),
    ],

    // ── experience ────────────────────────────────────────────────────────────
    experience: () => {
      if (!experience?.length) return [warn('  No experience data found.')];
      return [
        blank(),
        info('  Work Experience'),
        sep(),
        blank(),
        ...experience.map((exp, i) =>
          mkLine('experience-row', { exp, isLast: i === experience.length - 1 })
        ),
        blank(),
        dim('  /education  →  academic background   /achievements  →  awards'),
        blank(),
      ];
    },

    // ── education ─────────────────────────────────────────────────────────────
    education: () => {
      if (!education?.length) return [warn('  No education data found.')];
      return [
        blank(),
        info('  Education'),
        sep(),
        blank(),
        ...education.map((edu, i) =>
          mkLine('education-row', { edu, isLast: i === education.length - 1 })
        ),
        blank(),
        dim('  /experience  →  work history   /achievements  →  awards'),
        blank(),
      ];
    },

    // ── achievements ──────────────────────────────────────────────────────────
    achievements: () => {
      if (!achievements?.length) return [warn('  No achievements data found.')];
      return [
        blank(),
        info('  Achievements & Awards'),
        sep(),
        blank(),
        ...achievements.map((ach, i) =>
          mkLine('achievement-row', { ach, isLast: i === achievements.length - 1 })
        ),
        blank(),
        dim('  /experience  →  work history   /education  →  academic background'),
        blank(),
      ];
    },

    // ── open / goto (unified) ─────────────────────────────────────────────────
    // Priority: 1) exact window ID  2) fuzzy project name  3) error
    open: ({ args, ctx }) => {
      const query = args.join(' ').trim();

      if (!query) {
        const wins = dockApps.filter(a => a.canOpen).map(a => a.id).join(', ');
        const projs = (locations.work?.children ?? []).map(p => p.name);
        return [
          blank(),
          info('  Usage: /open <window | project>'),
          out(`  Windows:  ${wins}`),
          info('  Projects:'),
          ...projs.map(n => dim(`    ${n}`)),
          blank(),
        ];
      }

      // 1 — exact window ID
      if (ctx.windows[query]) {
        ctx.openWindow(query);
        return [ok(`  Opened: ${query}`), blank()];
      }

      // 2 — fuzzy project name → open Finder and navigate
      const projects = locations.work?.children ?? [];
      const match = projects.find(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      if (match) {
        ctx.openWindow('finder');
        setTimeout(() => ctx.setActiveLocation(match), 50);
        return [ok(`  Opening project: ${match.name}`), dim('  Finder launched.')];
      }

      // 3 — nothing matched
      const wins = dockApps.filter(a => a.canOpen).map(a => a.id).join(', ');
      return [
        err(`  Not found: "${query}"`),
        out(`  Windows:  ${wins}`),
        dim('  Try /projects list to see all projects'),
      ];
    },

    // ── goto — alias for open (kept for muscle memory) ────────────────────────
    goto: ({ args, ctx }) => HANDLERS.open({ args, ctx }),

    // ── search ────────────────────────────────────────────────────────────────
    search: ({ args }) => {
      const query = args.join(' ').toLowerCase().trim();
      if (!query) return [err('  Usage: /search <keyword>')];

      const results = [];

      // Search commands
      const cmdMatches = fuse.search(query).slice(0, 3).map(r => r.item);
      if (cmdMatches.length) {
        results.push(info('  Commands:'));
        cmdMatches.forEach(c => results.push(
          out(`    /${c.name.padEnd(14)} ${c.description}`)
        ));
        results.push(blank());
      }

      // Search projects
      const projMatches = (locations.work?.children ?? []).filter(p =>
        p.name.toLowerCase().includes(query)
      );
      if (projMatches.length) {
        results.push(info('  Projects:'));
        projMatches.forEach((p, i) => results.push(
          mkLine('project-row', { index: i + 1, project: p })
        ));
        results.push(blank());
      }

      // Search articles
      const artMatches = blogPosts.filter(b =>
        b.title.toLowerCase().includes(query)
      );
      if (artMatches.length) {
        results.push(info('  Articles:'));
        artMatches.forEach(b => results.push(out(`    ${b.title}`)));
        results.push(blank());
      }

      // Search stack
      const stackMatches = techStack.flatMap(c =>
        c.items.filter(i => i.toLowerCase().includes(query)).map(i => ({ cat: c.category, item: i }))
      );
      if (stackMatches.length) {
        results.push(info('  Skills:'));
        stackMatches.forEach(s => results.push(out(`    ${s.item}  (${s.cat})`)));
        results.push(blank());
      }

      if (!results.length) {
        return [blank(), warn(`  No results for "${query}".`), blank()];
      }

      return [blank(), info(`  Results for "${query}"`), sep(), ...results];
    },

    // ── matrix (easter egg) ───────────────────────────────────────────────────
    matrix: ({ ctx }) => {
      const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF';
      const rnd = (n) => chars[Math.floor(Math.random() * n)];
      const row = () => Array.from({ length: 64 }, () => rnd(chars.length)).join(' ');

      let count = 0;
      const interval = setInterval(() => {
        ctx.addLine(mkLine('matrix', row()));
        count++;
        if (count >= 14) {
          clearInterval(interval);
          ctx.addLines([
            blank(),
            ok('  Wake up, Neo...'),
            dim('  The Matrix has you.'),
            warn('  Follow the white rabbit. 🐇'),
            blank(),
          ]);
        }
      }, 60);
      matrixTimer.current = interval;
      return [blank()];
    },

    // ── sudo (easter egg) ─────────────────────────────────────────────────────
    sudo: ({ args }) => {
      const cmd = args.join(' ');
      const responses = [
        [warn('  [sudo] password for visitor:'), dim('  Authentication failure. Nice try. 😄')],
        [err('  visitor is not in the sudoers file. This incident will be reported.')],
        [warn('  sudo: you can\'t buy life experience.'), out('  sudo: no — this is a portfolio, not a server.')],
      ];
      return [blank(), ...responses[Math.floor(Math.random() * responses.length)], blank()];
    },

    // ── git (easter egg) ─────────────────────────────────────────────────────
    git: ({ args }) => {
      const sub = args[0];
      if (sub === 'status') return [
        blank(),
        out('  On branch main'),
        ok('  Your branch is up to date with \'origin/main\'.'),
        blank(),
        out('  nothing to commit, working tree clean  ✓'),
        blank(),
      ];
      if (sub === 'log') return [
        blank(),
        ...[ 'feat: add interactive terminal system',
             'fix: resolve window z-index race condition',
             'feat: implement GSAP window animations',
             'feat: add glassmorphism dock',
             'init: bootstrap portfolio v2',
        ].map((msg, i) => out(`  ${i === 0 ? 'HEAD → ' : ''}${msg}`)),
        blank(),
      ];
      if (sub === 'blame') return [warn('  You are to blame. Always.')];
      return [err(`  git: '${sub ?? ''}' is not a git command.  See 'git help'`)];
    },

    // ── npm (easter egg) ─────────────────────────────────────────────────────
    npm: ({ args }) => {
      if (args[0] === 'install') {
        return [
          blank(),
          info('  npm install'),
          sep(),
          out('  added 847 packages, and audited 848 packages in 3s'),
          warn('  42 packages are looking for funding'),
          warn('  found 0 vulnerabilities'),
          blank(),
          dim('  (We\'re in a browser. There is no node_modules folder. 😅)'),
          blank(),
        ];
      }
      return [err(`  npm: running in browser — no package manager available.`)];
    },
  };

  // ─── Execute command ────────────────────────────────────────────────────────

  const execute = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Save to history
    savedHistory.current = [trimmed, ...savedHistory.current.filter(h => h !== trimmed)].slice(0, MAX_HISTORY);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(savedHistory.current)); } catch {}

    // Echo the command
    addLine(mkLine('cmd', trimmed));

    const parsed = parseCommand(trimmed);
    const { name, args } = parsed;

    // Special: pipe to "clear" — not a real pipe, just a hint
    if (!name) { addLine(blank()); return; }

    // Look up command (including aliases)
    const cmdMeta = COMMAND_MAP[name];
    if (!cmdMeta) {
      // Typo suggestions
      const suggestions = fuse.search(name).slice(0, 3).map(r => r.item);
      addLines([
        err(`  Command not found: "${name}"`),
        ...(suggestions.length ? [
          blank(),
          dim('  Did you mean?'),
          ...suggestions.map(s => out(`    /${s.name}  —  ${s.description}`)),
        ] : []),
        blank(),
        dim('  Type /help to see all commands.'),
        blank(),
      ]);
      return;
    }

    const handler = HANDLERS[cmdMeta.name];
    if (!handler) {
      addLine(warn(`  /${cmdMeta.name} is registered but has no handler yet.`));
      return;
    }

    const ctx = {
      openWindow,
      focusWindow,
      setActiveLocation,
      windows,
      cwd,
      setCwd,
      theme,
      setTheme,
      addLine,
      addLines,
      clearLines,
    };

    const result = handler({ args, flags: parsed.flags, ctx });
    if (result?.length) addLines(result);
  }, [
    addLine, addLines, clearLines,
    openWindow, focusWindow, setActiveLocation,
    windows, cwd, theme, setTheme,
  ]);

  // ─── Autocomplete / suggestions ──────────────────────────────────────────────

  const computeSuggestions = useCallback((val) => {
    const trimmed = val.trim();
    if (!trimmed) return [];

    const raw   = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
    const parts = raw.split(' ');
    const first = parts[0].toLowerCase();

    const cmd = COMMAND_MAP[first];

    // Show sub-completions when user typed a recognised command (with or without trailing space)
    const hasSubCompletions =
      cmd !== undefined && (
        (cmd.subcommands?.length ?? 0) > 0 ||
        cmd.name === 'open' ||
        cmd.name === 'goto' ||
        cmd.name === 'search'
      );

    if (parts.length >= 2 || (parts.length === 1 && hasSubCompletions)) {
      const query = parts.length >= 2 ? parts.slice(1).join(' ').toLowerCase() : '';
      const sources = [
        // Static sub-commands (e.g. projects: list, open)
        ...(cmd?.subcommands ?? []).map(s => ({
          label: `${first} ${s}`,
          value: `/${first} ${s}`,
          description: `sub-command`,
        })),
        // open / goto → windows first, then projects
        ...(cmd?.name === 'open' || cmd?.name === 'goto' ? [
          ...dockApps.filter(a => a.canOpen).map(a => ({
            label: `${first} ${a.id}`,
            value: `/${first} ${a.id}`,
            description: a.name,
            category: 'Window',
          })),
          ...(locations.work?.children ?? []).map(p => ({
            label: `${first} ${p.name}`,
            value: `/${first} ${p.name}`,
            description: p.name,
            category: 'Project',
          })),
        ] : []),
        // projects open → project names only
        ...(cmd?.name === 'projects' && query.startsWith('open') ?
          (locations.work?.children ?? []).map(p => ({
            label: `${first} open ${p.name}`,
            value: `/${first} open ${p.name}`,
            description: p.name,
            category: 'Project',
          })) : []),
        // search → projects + windows as searchable suggestions
        ...(cmd?.name === 'search' ? [
          ...(locations.work?.children ?? []).map(p => ({
            label: `search ${p.name}`,
            value: `/search ${p.name}`,
            description: p.name,
            category: 'Project',
          })),
          ...dockApps.filter(a => a.canOpen).map(a => ({
            label: `search ${a.id}`,
            value: `/search ${a.id}`,
            description: a.name,
            category: 'Window',
          })),
        ] : []),
      ].filter(s => !query || s.description.toLowerCase().includes(query));
      return sources.slice(0, 8);
    }

    // Partial first token: fuzzy-search command list
    const fuseResults = fuse.search(first);
    return fuseResults.slice(0, 6).map(({ item }) => ({
      label:       item.name,
      value:       `/${item.name}`,
      description: item.description,
      category:    item.category,
    }));
  }, []);

  const updateSuggestions = useCallback((val) => {
    if (!val.trim()) { setSuggestions([]); return; }
    setSuggestions(computeSuggestions(val));
    setSuggIdx(0);
  }, [computeSuggestions]);

  // Derived: ghost completion text (fish-shell style inline)
  const ghostText = (() => {
    if (!suggestions.length || !input.trim()) return '';
    const best = suggestions[0];
    const rawInput = input.startsWith('/') ? input : `/${input}`;
    if (best.value.toLowerCase().startsWith(rawInput.toLowerCase()) && best.value.length > rawInput.length) {
      return best.value.slice(rawInput.length);
    }
    return '';
  })();

  // ─── Keyboard handler ────────────────────────────────────────────────────────

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {

      case 'Enter': {
        if (suggestions.length > 0) {
          const sel = suggestions[suggIdx];
          setSuggestions([]);
          execute(sel.value);
          setInput('');
          setHistIdx(-1);
        } else {
          execute(input);
          setInput('');
          setHistIdx(-1);
        }
        e.preventDefault();
        break;
      }

      case 'Tab': {
        e.preventDefault();
        if (ghostText) {
          const rawInput = input.startsWith('/') ? input : `/${input}`;
          setInput(rawInput + ghostText);
          setSuggestions([]);
        } else if (suggestions.length) {
          setInput(suggestions[suggIdx].value);
          setSuggestions([]);
        }
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        if (suggestions.length) {
          setSuggIdx(i => Math.max(0, i - 1));
        } else {
          const newIdx = Math.min(histIdx + 1, savedHistory.current.length - 1);
          setHistIdx(newIdx);
          setInput(savedHistory.current[newIdx] ?? '');
          setSuggestions([]);
        }
        break;
      }

      case 'ArrowDown': {
        e.preventDefault();
        if (suggestions.length) {
          setSuggIdx(i => Math.min(suggestions.length - 1, i + 1));
        } else {
          const newIdx = histIdx - 1;
          setHistIdx(newIdx);
          setInput(newIdx < 0 ? '' : savedHistory.current[newIdx]);
          setSuggestions([]);
        }
        break;
      }

      case 'Escape': {
        setSuggestions([]);
        break;
      }

      case 'l': {
        if (e.ctrlKey) {
          e.preventDefault();
          clearLines();
        }
        break;
      }

      case 'c': {
        if (e.ctrlKey && !window.getSelection()?.toString()) {
          e.preventDefault();
          addLine(dim('  ^C'));
          setInput('');
          setSuggestions([]);
        }
        break;
      }

      default: break;
    }
  }, [suggestions, suggIdx, histIdx, input, ghostText, execute, clearLines, addLine]);

  // ─── Input change ─────────────────────────────────────────────────────────────

  const handleInput = useCallback((e) => {
    const val = e.target.value;
    setInput(val);
    setHistIdx(-1);
    updateSuggestions(val);
  }, [updateSuggestions]);

  // Focus terminal on any click in the body
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // ── Select a suggestion from the dropdown ──────────────────────────────────

  const selectSuggestion = useCallback((item) => {
    setSuggestions([]);
    setSuggIdx(0);
    setHistIdx(-1);
    execute(item.value);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [execute]);

  // ─── Return ────────────────────────────────────────────────────────────────────

  return {
    lines,
    input,
    suggestions,
    suggIdx,
    ghostText,
    theme,
    inputRef,
    scrollRef,
    handleKeyDown,
    handleInput,
    focusInput,
    selectSuggestion,
    execute,
  };
};

export default useTerminal;
