import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls.jsx';
import useTerminal from '#/terminal/useTerminal.js';
import { ExternalLink } from 'lucide-react';

// ─── Individual line renderer ─────────────────────────────────────────────────

const OutputLine = ({ line, s, onAction }) => {
  const { type, content } = line;

  switch (type) {
    case 'cmd':
      return (
        <div className="t-line t-line-cmd">
          <span style={{ color: s.prompt }}>visitor</span>
          <span style={{ color: s.dim }}>@</span>
          <span style={{ color: s.promptHost }}>portfolio</span>
          <span style={{ color: s.dim }}>:~/portfolio $ </span>
          <span style={{ color: s.text }}>{content}</span>
        </div>
      );

    case 'success':  return <div className="t-line" style={{ color: s.success  }}>{content}</div>;
    case 'error':    return <div className="t-line" style={{ color: s.error    }}>{content}</div>;
    case 'warning':  return <div className="t-line" style={{ color: s.warning  }}>{content}</div>;
    case 'info':     return <div className="t-line" style={{ color: s.info     }}>{content}</div>;
    case 'dim':      return <div className="t-line" style={{ color: s.dim      }}>{content}</div>;
    case 'output':   return <div className="t-line" style={{ color: s.text     }}>{content}</div>;
    case 'blank':    return <div className="t-blank" />;

    case 'separator':
      return <div className="t-sep" style={{ borderColor: s.border }} />;

    case 'matrix':
      return (
        <div className="t-matrix" style={{ color: s.success }}>
          {content}
        </div>
      );

    case 'ascii':
      return (
        <div className="t-ascii" style={{ color: s.info }}>
          {content.map((row, i) => <div key={i}>{row}</div>)}
        </div>
      );

    case 'help-row':
      return (
        <div className="t-help-row">
          <span style={{ color: s.success, minWidth: 160, display: 'inline-block' }}>
            /{content.name.trim()}
          </span>
          <span style={{ color: s.text }}>{content.desc}</span>
        </div>
      );

    case 'project-row': {
      const p = content.project;
      return (
        <button
          className="t-data-row t-data-row-clickable"
          onClick={() => onAction?.('goto', p)}
        >
          <span style={{ color: s.dim }}>{String(content.index).padStart(2, '0')}.</span>
          <span style={{ color: s.success, minWidth: 240, display: 'inline-block', marginLeft: 12 }}>
            {p.name}
          </span>
          <span style={{ color: s.info, fontSize: 11, opacity: 0.7 }}>
            ↗ open in Finder
          </span>
        </button>
      );
    }

    case 'article-row': {
      const a = content.article;
      return (
        <div className="t-data-row">
          <span style={{ color: s.dim }}>{String(content.index).padStart(2, '0')}.</span>
          <span style={{ color: s.info, minWidth: 96, display: 'inline-block', marginLeft: 12, fontSize: 11 }}>
            {a.date}
          </span>
          <a href={a.link} target="_blank" rel="noreferrer" className="t-link" style={{ color: s.text }}>
            {a.title}
            <ExternalLink size={11} style={{ marginLeft: 5, display: 'inline', verticalAlign: 'middle', opacity: 0.4 }} />
          </a>
        </div>
      );
    }

    case 'skill-row': {
      const { category, items } = content;
      return (
        <div className="t-data-row">
          <span style={{ color: s.warning, minWidth: 120, display: 'inline-block' }}>{category}</span>
          <span style={{ color: s.text }}>{items.join('  ·  ')}</span>
        </div>
      );
    }

    case 'social-row': {
      const { social } = content;
      return (
        <div className="t-data-row">
          <span style={{ color: s.dim, minWidth: 100, display: 'inline-block' }}>{social.text}</span>
          <a href={social.link} target="_blank" rel="noreferrer" className="t-link" style={{ color: s.info }}>
            {social.link}
            <ExternalLink size={11} style={{ marginLeft: 5, display: 'inline', verticalAlign: 'middle', opacity: 0.4 }} />
          </a>
        </div>
      );
    }

    case 'experience-row': {
      const { exp, isLast } = content;
      return (
        <div style={{ display: 'flex', gap: 14, marginBottom: isLast ? 0 : 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0, paddingTop: 3 }}>
            <span style={{ color: s.info, fontSize: 12, lineHeight: 1 }}>◆</span>
            {!isLast && (
              <div style={{ width: 1, flex: 1, minHeight: 18, background: s.border, margin: '5px 0' }} />
            )}
          </div>
          <div style={{ paddingBottom: isLast ? 0 : 4 }}>
            <div style={{ color: s.success, fontWeight: 600 }}>{exp.role}</div>
            <div style={{ color: s.text, fontSize: 11, marginTop: 1 }}>{exp.company}</div>
            <div style={{ color: s.info, fontSize: 11 }}>{exp.duration}  ·  {exp.location}</div>
            <div style={{ color: s.dim, fontSize: 11, marginTop: 4, lineHeight: 1.6, maxWidth: 540 }}>{exp.description}</div>
          </div>
        </div>
      );
    }

    case 'education-row': {
      const { edu, isLast } = content;
      return (
        <div style={{ display: 'flex', gap: 14, marginBottom: isLast ? 0 : 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0, paddingTop: 3 }}>
            <span style={{ color: s.warning, fontSize: 13, lineHeight: 1 }}>○</span>
            {!isLast && (
              <div style={{ width: 1, flex: 1, minHeight: 18, background: s.border, margin: '5px 0' }} />
            )}
          </div>
          <div style={{ paddingBottom: isLast ? 0 : 4 }}>
            <div style={{ color: s.success, fontWeight: 600 }}>{edu.degree}</div>
            <div style={{ color: s.text, fontSize: 11, marginTop: 1 }}>{edu.institute}</div>
            <div style={{ color: s.info, fontSize: 11 }}>{edu.year}  ·  {edu.score}</div>
          </div>
        </div>
      );
    }

    case 'achievement-row': {
      const { ach, isLast } = content;
      return (
        <div style={{ display: 'flex', gap: 14, marginBottom: isLast ? 0 : 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0, paddingTop: 3 }}>
            <span style={{ color: s.warning, fontSize: 13, lineHeight: 1 }}>★</span>
            {!isLast && (
              <div style={{ width: 1, flex: 1, minHeight: 18, background: s.border, margin: '5px 0' }} />
            )}
          </div>
          <div style={{ paddingBottom: isLast ? 0 : 4 }}>
            <div style={{ color: s.success, fontWeight: 600 }}>{ach.title}</div>
            <div style={{ color: s.text, fontSize: 11, marginTop: 1 }}>{ach.organization}  ·  {ach.year}</div>
            <div style={{ color: s.dim, fontSize: 11, marginTop: 4, lineHeight: 1.6, maxWidth: 540 }}>{ach.description}</div>
          </div>
        </div>
      );
    }

    case 'neofetch': {
      const { art, info: rows } = content;
      return (
        <div className="t-neofetch">
          <div style={{ color: s.info, fontSize: 11, lineHeight: 1.55, whiteSpace: 'pre', flexShrink: 0 }}>
            {art.map((r, i) => <div key={i}>{r}</div>)}
          </div>
          <div style={{ marginLeft: 24 }}>
            {rows.map(([k, v], i) => (
              <div key={i} className="t-line" style={{ padding: '1px 0' }}>
                {k
                  ? <><span style={{ color: s.success, minWidth: 110, display: 'inline-block' }}>{k}</span>
                      <span style={{ color: s.text }}>{v}</span></>
                  : <span style={{ color: s.dim }}>{v}</span>
                }
              </div>
            ))}
          </div>
        </div>
      );
    }

    default:
      return <div className="t-line" style={{ color: s.text }}>{String(content ?? '')}</div>;
  }
};

// ─── Suggestions dropdown ─────────────────────────────────────────────────────

const Suggestions = ({ items, selectedIdx, onSelect, s }) => (
  <div className="t-suggestions" style={{ background: s.headerBg, borderColor: s.border }}>
    <div className="t-sugg-list">
      {items.map((item, i) => (
        <div
          key={item.value + i}
          className="t-sugg-item"
          style={i === selectedIdx
            ? { background: s.selectionBg, color: s.text }
            : { color: s.dim }
          }
          onMouseDown={(e) => { e.preventDefault(); onSelect(item); }}
        >
          <span style={{ color: i === selectedIdx ? s.success : s.info, minWidth: 130, fontSize: 12 }}>
            {item.value}
          </span>
          <span style={{ fontSize: 11, opacity: 0.7 }}>{item.description}</span>
          {item.category && (
            <span style={{ marginLeft: 'auto', fontSize: 10, color: s.info, opacity: 0.5 }}>
              {item.category}
            </span>
          )}
        </div>
      ))}
    </div>
    <div className="t-sugg-footer" style={{ borderTopColor: s.border, color: s.dim }}>
      Tab / Enter · ↑↓ navigate · Esc dismiss
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const Terminal = () => {
  const {
    lines, input, suggestions, suggIdx, ghostText, theme: s,
    inputRef, scrollRef,
    handleKeyDown, handleInput, focusInput, selectSuggestion, execute,
  } = useTerminal();

  const handleAction = React.useCallback((type, data) => {
    if (type === 'goto') execute(`/goto "${data.name}"`);
  }, [execute]);

  return (
    <div
      className="terminal-shell"
      style={{ background: s.bg, '--t-border': s.border }}
      onClick={focusInput}
    >
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div
        id="window-header"
        className="terminal-header"
        style={{ background: s.headerBg, borderBottomColor: s.border }}
      >
        <WindowControls target="terminal" />
        <div className="terminal-title">
          <span style={{ color: s.success, fontSize: 10 }}>●</span>
          <span style={{ color: s.dim, marginLeft: 8, fontSize: 12 }}>portfolio.sh</span>
          <span style={{ color: s.border, margin: '0 6px' }}>—</span>
          <span style={{ color: s.text, fontSize: 12 }}>visitor@portfolio: ~/portfolio</span>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* ── Scrollable output ────────────────────────────────────────────────── */}
      <div ref={scrollRef} className="terminal-output" style={{ color: s.text }}>
        {lines.map(line => <OutputLine key={line.id} line={line} s={s} onAction={handleAction} />)}
      </div>

      {/* ── Fixed footer: input + suggestions ───────────────────────────────── */}
      <div className="terminal-footer" style={{ borderTopColor: s.border }}>

        {/* Suggestions — positioned absolutely above the input row */}
        {suggestions.length > 0 && (
          <Suggestions
            items={suggestions}
            selectedIdx={suggIdx}
            onSelect={selectSuggestion}
            s={s}
          />
        )}

        {/* Input row */}
        <div className="t-input-row">
          <span className="t-prompt">
            <span style={{ color: s.prompt }}>visitor</span>
            <span style={{ color: s.dim }}>@</span>
            <span style={{ color: s.promptHost }}>portfolio</span>
            <span style={{ color: s.dim }}>:~/portfolio </span>
            <span style={{ color: s.warning }}>$</span>
            <span style={{ color: s.text }}> </span>
          </span>

          <div className="t-input-wrap">
            {/* Ghost text: full completion value at left:0, dimmed */}
            {ghostText && (
              <span className="t-ghost" style={{ color: s.dim }}>
                {/* show typed portion in transparent then ghost suffix */}
                <span style={{ opacity: 0 }}>{input.startsWith('/') ? input : `/${input}`}</span>
                {ghostText}
              </span>
            )}

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              className="t-input"
              style={{ color: s.text, caretColor: s.cursorColor }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;
