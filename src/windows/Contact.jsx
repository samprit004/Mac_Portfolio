import { useState } from 'react';
import WindowControls from '#/components/WindowControls';
import WindowWrapper from '#/hoc/WindowWrapper';
import useWindowStore from '#/store/Window';

const DETAIL_ROWS = [
  { label: 'mobile', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { label: 'email', value: 'sampritdas2004@gmail.com', href: 'mailto:sampritdas2004@gmail.com' },
  // { label: 'work', value: 'sampritdas@merufintech.net', href: 'mailto:sampritdas@merufintech.net' },
  { label: 'birthday', value: 'November 26, 2004' },
  { label: 'home', value: 'Kolkata, West Bengal, India' },
  { label: 'github', value: 'github.com/samprit004', href: 'https://github.com/samprit004' },
  // {
  //   label: 'note',
  //   value: 'Lets connect To create something amazing together',
  //   multiline: true,
  // },
];

const PinIcon = () => (
  <svg viewBox="0 0 16 16" className="size-[11px] shrink-0 fill-[#8e8e93]">
    <path d="M8 1a4.5 4.5 0 0 1 4.5 4.5c0 2.89-4.5 9.5-4.5 9.5S3.5 9.39 3.5 5.5A4.5 4.5 0 0 1 8 1zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const GHIcon = () => (
  <svg viewBox="0 0 16 16" className="size-[17px] fill-current">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LIIcon = () => (
  <svg viewBox="0 0 16 16" className="size-[17px] fill-current">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="size-[18px] fill-current">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const BasicInfoIcon = () => (
  <svg viewBox="0 0 24 24" className="size-[18px] fill-current">
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="size-[18px] fill-current">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.01l-2.2 2.2Z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: 'Basic Info',
    action: 'details',
    icon: <BasicInfoIcon />,
    className: 'bg-[#8e8e93] text-white hover:brightness-95',
  },
  {
    label: 'Mail',
    action: 'mail',
    icon: <MailIcon />,
    className: 'bg-[#3478f6] text-white hover:brightness-95',
  },
  {
    label: 'GitHub',
    action: 'safari',
    icon: <GHIcon />,
    className: 'bg-[#24292e] text-white hover:brightness-95',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/samprit-das',
    icon: <LIIcon />,
    className: 'bg-[#0a66c2] text-white hover:brightness-95',
  },
  {
    label: 'Call',
    action: 'copy-phone',
    icon: <PhoneIcon />,
    className: 'bg-[#34c759] text-white hover:brightness-95',
  },
];

const SocialButton = ({ href, icon, label, className, onClick, copied = false, active = false }) => {
  const sharedClassName = `group relative`;
  const iconClassName = `flex size-11 items-center justify-center rounded-full border border-black/5 shadow-sm transition duration-150 hover:-translate-y-0.5 ${active ? 'ring-2 ring-[#3478f6]/25 ring-offset-2 ring-offset-white' : ''} ${className}`;
  const tooltipLabel = copied ? 'Copied' : label;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={sharedClassName}
      >
        <span className={iconClassName}>
          {icon}
        </span>
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {tooltipLabel}
        </span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
    >
      <span className={iconClassName}>
        {icon}
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {tooltipLabel}
      </span>
    </a>
  );
};

const MailComposePanel = ({ form, onChange, onSend }) => (
  <div className="mt-8 flex flex-col bg-white">
    <div className="border-y border-[rgba(60,60,67,0.08)]">
      <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center px-6 py-2.5">
        <span className="text-[13px] font-normal text-[#8e8e93]">To:</span>
        <span className="text-[14px] font-medium text-[#1c1c1e]">sampritdas2004@gmail.com</span>
      </div>
      <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center border-t border-[rgba(60,60,67,0.08)] px-6 py-2.5">
        <span className="text-[13px] font-normal text-[#8e8e93]">From:</span>
        <input
          type="email"
          value={form.from}
          onChange={(event) => onChange('from', event.target.value)}
          placeholder="your@email.com"
          className="w-full border-none bg-transparent text-[14px] font-normal text-[#1c1c1e] outline-none placeholder:text-[#aeaeb2]"
        />
      </div>
      <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center border-t border-[rgba(60,60,67,0.08)] px-6 py-2.5">
        <span className="text-[13px] font-normal text-[#8e8e93]">Subject:</span>
        <input
          type="text"
          value={form.subject}
          onChange={(event) => onChange('subject', event.target.value)}
          placeholder="Let’s work together"
          className="w-full border-none bg-transparent text-[14px] font-normal text-[#1c1c1e] outline-none placeholder:text-[#aeaeb2]"
        />
      </div>
    </div>
    <div className="px-6 py-4">
      <textarea
        value={form.body}
        onChange={(event) => onChange('body', event.target.value)}
        placeholder="Write your message here..."
        className="min-h-[320px] w-full resize-none border-none bg-transparent px-0 py-0 text-[14px] font-normal text-[#1c1c1e] outline-none placeholder:text-[#aeaeb2]"
      />
    </div>
    <div className="sticky bottom-0 flex justify-end border-t border-[rgba(60,60,67,0.08)] bg-white px-6 py-3">
      <button
        type="button"
        onClick={onSend}
        className="rounded-md bg-[#007aff] px-4 py-1.5 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-95"
      >
        Send
      </button>
    </div>
  </div>
);

const DetailRow = ({ label, value, href, multiline = false, isLast = false }) => (
  <>
    <div className={`flex justify-center px-4 ${multiline ? 'py-3' : 'min-h-[10px] py-2'}`}>
      <div className="grid w-full max-w-[360px] grid-cols-[120px_minmax(0,1fr)] items-center gap-x-3">
        <span className="text-right text-sm font-normal capitalize text-[#8e8e93]">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left text-[17px] font-semibold leading-[1.35] text-[#1c1c1e]"
          >
            {value}
          </a>
        ) : (
          <span className={`text-left leading-[1.4] text-[#1c1c1e] ${multiline ? 'text-[16px]' : 'text-[17px] font-semibold'}`}>
            {value}
          </span>
        )}
      </div>
    </div>
    {!isLast && <div className="h-px w-full bg-[rgba(60,60,67,0.08)]" />}
  </>
);

const Contact = () => {
  const { openWindow } = useWindowStore();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [mailForm, setMailForm] = useState({
    from: '',
    subject: '',
    body: '',
  });

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('6291120228');
      setCopiedPhone(true);
      setActivePanel(null);
      window.setTimeout(() => setCopiedPhone(false), 1800);
    } catch {
      window.alert('Could not copy the number automatically. Number: 6291120228');
    }
  };

  const handleMailFieldChange = (field, value) => {
    setMailForm((current) => ({ ...current, [field]: value }));
  };

  const handleSendMail = () => {
    const mailtoUrl = new URL('mailto:sampritdas2004@gmail.com');
    if (mailForm.subject) {
      mailtoUrl.searchParams.set('subject', mailForm.subject);
    }
    if (mailForm.body) {
      const bodyText = mailForm.from
        ? `From: ${mailForm.from}\n\n${mailForm.body}`
        : mailForm.body;
      mailtoUrl.searchParams.set('body', bodyText);
    } else if (mailForm.from) {
      mailtoUrl.searchParams.set('body', `From: ${mailForm.from}`);
    }

    window.location.href = mailtoUrl.toString();
  };

  const handleSocialAction = (action) => {
    if (action === 'details') {
      setActivePanel('details');
      return;
    }
    if (action === 'safari') {
      setActivePanel(null);
      openWindow('safari');
      return;
    }
    if (action === 'mail') {
      setActivePanel((current) => (current === 'mail' ? null : 'mail'));
    }
  };

  return (
  <div className="flex h-full min-h-0 flex-col bg-white font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]">
    <div
      id="window-header"
      className="relative flex h-[38px] shrink-0 items-center justify-center border-b border-black/10 bg-linear-to-b from-[#f0f0f0] to-[#e8e8e8]"
    >
      <div className="absolute left-[10px]">
        <WindowControls target="contact" />
      </div>
      <span className="text-[13px] font-semibold tracking-[-0.1px] text-[#1c1c1e]">Contacts</span>
    </div>

    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white">
        <div className="mx-auto flex w-full max-w-[520px] shrink-0 items-center justify-center gap-5 px-[18px] pt-7 text-left">
          <img
            src="https://github.com/samprit004.png"
            alt="Samprit Das"
            className="size-[84px] rounded-full border border-black/10 object-cover shadow-sm"
          />
          <div className="flex min-w-0 flex-col justify-center">
            <h1 className="text-[24px] font-bold leading-tight tracking-[-0.35px] text-[#1c1c1e]">
              Samprit Das
            </h1>
            <p className="mt-1 text-[13px] font-normal text-[#3c3c43]">
              Full Stack Developer · React · Node.js · MongoDB
            </p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-[#8e8e93]">
              <PinIcon />
              Kolkata, India
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[520px] shrink-0 justify-center gap-12 px-[18px] pb-4 pt-[28px]">
          {SOCIAL_LINKS.map((link) => (
            <SocialButton
              key={link.label}
              {...link}
              active={link.action === activePanel}
              copied={link.action === 'copy-phone' ? copiedPhone : false}
              onClick={
                link.action === 'copy-phone'
                  ? handleCopyPhone
                  : link.action
                    ? () => handleSocialAction(link.action)
                    : undefined
              }
            />
          ))}
        </div>

        {activePanel === 'mail' ? (
          <MailComposePanel
            form={mailForm}
            onChange={handleMailFieldChange}
            onSend={handleSendMail}
          />
        ) : (
        <div className="mx-auto mt-12 w-full max-w-[520px] shrink-0 bg-white px-[18px]">
          {DETAIL_ROWS.map((row, index) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={row.value}
              href={row.href}
              multiline={row.multiline}
              isLast={index === DETAIL_ROWS.length - 1}
            />
          ))}
        </div>
        )}

      </div>
    </div>
  </div>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
