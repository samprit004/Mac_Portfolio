import WindowControls from '#/components/WindowControls';
import WindowWrapper from '#/hoc/WindowWrapper';

const ACCENT     = '#007aff';
const BG_SIDEBAR = '#f2f2f7';
const BG_PANEL   = '#ffffff';
const BG_ROWS    = '#f9f9fb';
const TEXT_MAIN  = '#1c1c1e';
const TEXT_MED   = '#3c3c43';
const TEXT_GREY  = '#8e8e93';
const DIVIDER    = 'rgba(60,60,67,0.1)';
const BORDER     = 'rgba(0,0,0,0.07)';

const GHIcon = ({ size = 18, color = '#fff' }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LIIcon = ({ size = 18, color = '#fff' }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

const MailIcon = ({ size = 18, color = '#fff' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const IGIcon = ({ size = 18, color = '#fff' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 16 16" width={11} height={11} style={{ fill: TEXT_GREY, flexShrink: 0 }}>
    <path d="M8 1a4.5 4.5 0 0 1 4.5 4.5c0 2.89-4.5 9.5-4.5 9.5S3.5 9.39 3.5 5.5A4.5 4.5 0 0 1 8 1zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const ActionBtn = ({ children, label, href, bg }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none' }}
  >
    <div
      style={{
        width: 48, height: 48, borderRadius: 14,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'filter 0.15s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.82)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
    >
      {children}
    </div>
    <span style={{ fontSize: 10.5, color: TEXT_GREY, fontWeight: 500, letterSpacing: 0.1 }}>{label}</span>
  </a>
);

const Row = ({ label, value, href, isLast = false }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 38 }}>
      <span style={{
        width: 72, flexShrink: 0, textAlign: 'right',
        fontSize: 11.5, color: TEXT_GREY, paddingRight: 14, fontWeight: 400,
      }}>
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: ACCENT, textDecoration: 'none', lineHeight: 1.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          {value}
        </a>
      ) : (
        <span style={{ fontSize: 13, color: value ? TEXT_MAIN : TEXT_GREY, lineHeight: 1.4, fontStyle: value ? 'normal' : 'italic' }}>
          {value || 'Add note…'}
        </span>
      )}
    </div>
    {!isLast && <div style={{ height: 1, background: DIVIDER, marginLeft: 86 }} />}
  </>
);

const Contact = () => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    width: 680, height: 510,
    borderRadius: 12, overflow: 'hidden',
    background: BG_PANEL,
    boxShadow: '0 24px 80px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.12)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
  }}>
    {/* Title bar */}
    <div
      id="window-header"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 38, flexShrink: 0, position: 'relative',
        background: 'linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ position: 'absolute', left: 10 }}>
        <WindowControls target="contact" />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_MAIN, letterSpacing: -0.1 }}>Contacts</span>
    </div>

    {/* Body */}
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{
        width: 196, background: BG_SIDEBAR,
        borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ padding: '8px 10px 6px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.07)', borderRadius: 8, padding: '5px 8px',
          }}>
            <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: TEXT_GREY, flexShrink: 0 }}>
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
            </svg>
            <span style={{ fontSize: 12, color: TEXT_GREY }}>Search</span>
          </div>
        </div>

        <div style={{ padding: '8px 14px 3px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: TEXT_GREY, letterSpacing: 0.5, textTransform: 'uppercase' }}>S</span>
        </div>
        <div style={{ height: 1, background: DIVIDER, margin: '0 14px 3px' }} />

        <button style={{
          display: 'flex', alignItems: 'center', gap: 9,
          margin: '2px 6px', padding: '6px 9px',
          borderRadius: 8, border: 'none', cursor: 'default',
          background: ACCENT, textAlign: 'left',
          width: 'calc(100% - 12px)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>S</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', letterSpacing: -0.1 }}>Samprit</span>
        </button>

        <div style={{ marginTop: 'auto', borderTop: `1px solid ${DIVIDER}`, padding: '5px 10px' }}>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 20, color: TEXT_GREY, padding: '0 4px', lineHeight: 1,
          }} title="Add contact">+</button>
        </div>
      </div>

      {/* Detail panel — no scroll */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: BG_PANEL }}>

        {/* Profile section */}
        <div style={{ padding: '22px 22px 0', display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <img
            src="https://github.com/samprit004.png"
            alt="Samprit Das"
            style={{
              width: 72, height: 72, borderRadius: '50%',
              objectFit: 'cover', flexShrink: 0,
              border: '2px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
            }}
          />
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 23, fontWeight: 700, color: TEXT_MAIN, lineHeight: 1.2, letterSpacing: -0.3 }}>
              Samprit Das
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: TEXT_MED, fontWeight: 400 }}>
              Full Stack Developer
            </p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: TEXT_GREY, display: 'flex', alignItems: 'center', gap: 3 }}>
              <PinIcon />
              Kolkata, India
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 18, padding: '18px 22px 16px', flexShrink: 0 }}>
          <ActionBtn label="github" href="https://github.com/samprit004" bg="#24292e">
            <GHIcon />
          </ActionBtn>
          <ActionBtn label="linkedin" href="https://linkedin.com/in/samprit-das" bg="#0a66c2">
            <LIIcon />
          </ActionBtn>
          <ActionBtn label="mail" href="mailto:sampritdas2004@gmail.com" bg="#3478f6">
            <MailIcon />
          </ActionBtn>
          <ActionBtn
            label="instagram"
            href="https://instagram.com/samprit_das_"
            bg="linear-gradient(135deg,#f9a844 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
          >
            <IGIcon />
          </ActionBtn>
        </div>

        {/* Detail rows card */}
        <div style={{
          margin: '0 14px',
          borderRadius: 10,
          background: BG_ROWS,
          border: `1px solid ${DIVIDER}`,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <Row label="mobile"   value="+91 98765 43210" />
          <Row label="email"    value="sampritdas2004@gmail.com"  href="mailto:sampritdas2004@gmail.com" />
          <Row label="work"     value="sampritdas@merufintech.net" href="mailto:sampritdas@merufintech.net" />
          <Row label="birthday" value="December 26, 2004" />
          <Row label="home"     value="Kolkata, West Bengal, India" />
          <Row label="github"   value="github.com/samprit004"      href="https://github.com/samprit004" />
          <Row label="note"     value="" isLast />
        </div>

      </div>
    </div>
  </div>
);

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;
