import React from 'react';
import { useI18n } from '../i18n';
import type { Lang } from '../i18n';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { ROUTES } from '../routes';

const ABSOLUTE = /^(https?:|mailto:)/i;

/** i18n key → 内部路由。绝对地址（http/https/mailto）不走路由表 */
function resolveTo(to?: string): string | null {
  if (!to || ABSOLUTE.test(to)) return null;
  return ROUTES[to as keyof typeof ROUTES] ?? null;
}

/**
 * 统一链接：路由 key 用 <Link>；http(s)/mailto（href 或 to）用真实 <a>；
 * 尚未落地的 key 仍渲染不可跳转的占位 <a>。
 */
export function AppLink({
  to,
  href,
  className,
  style,
  children,
}: {
  to?: string;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const absolute = href || (to && ABSOLUTE.test(to) ? to : undefined);
  if (absolute) {
    const external = /^https?:/i.test(absolute);
    return (
      <a
        href={absolute}
        className={className}
        style={style}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  const path = resolveTo(to);
  if (path) {
    return (
      <Link to={path} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href="#" className={className} style={style} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  );
}

/** 促销条（常驻横幅，可关闭） */
export function PromoBar() {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return (
    <div className="promo">
      <div className="container">
        <span className="promo-chip">{t('promo.tag')}</span>
        <span>{t('promo.text')}</span>
        <AppLink to="register" className="promo-link">
          {t('promo.cta')}
        </AppLink>
        <button className="promo-close" aria-label={t('promo.close')} onClick={() => setOpen(false)}>
          <Icon name="close" />
        </button>
      </div>
    </div>
  );
}

/** 视觉方向：与 global.css 的 html[data-dir] token 一一对应 */
export type Dir = 'a' | 'b' | 'c' | 'd';

const DIRS: { code: Dir; label: string }[] = [
  { code: 'a', label: 'A' },
  { code: 'b', label: 'B' },
  { code: 'c', label: 'C' },
  { code: 'd', label: 'D' },
];

const DIR_STORAGE_KEY = 'ipflex-dir';

function detectDir(): Dir {
  try {
    const saved = localStorage.getItem(DIR_STORAGE_KEY);
    if (saved && DIRS.some((d) => d.code === saved)) return saved as Dir;
  } catch {
    /* ignore */
  }
  return 'a';
}

/** 视觉方向切换（A 明亮企业 / B 深色科技 / C 明暗节奏 / D 玻璃拟态），选择写入 localStorage */
export function DirSwitch({ className = 'nav-lang' }: { className?: string }) {
  const { t } = useI18n();
  const [dir, setDirState] = React.useState<Dir>(detectDir);

  const setDir = (next: Dir) => {
    setDirState(next);
    document.documentElement.setAttribute('data-dir', next);
    try {
      localStorage.setItem(DIR_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-dir', dir);
  }, [dir]);

  return (
    <div className={className} role="group" aria-label={t('nav.dir')}>
      {DIRS.map((d) => (
        <button
          key={d.code}
          className={dir === d.code ? 'active' : ''}
          onClick={() => setDir(d.code)}
          aria-pressed={dir === d.code}
          aria-label={t(`nav.dir${d.code.toUpperCase()}`)}
          title={t(`nav.dir${d.code.toUpperCase()}`)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}

/** 语言切换（桌面 + 移动端共用一组按钮） */
export function LangSwitch({ className = 'nav-lang' }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const langs: { code: Lang; label: string }[] = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日' },
  ];
  return (
    <div className={className}>
      {langs.map((l) => (
        <button
          key={l.code}
          className={lang === l.code ? 'active' : ''}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
