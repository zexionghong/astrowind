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
          <Icon name="close" style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </div>
  );
}

/** 视觉方向：保留 A 明亮 / B 深色，由同一个按钮来回切换 */
export type Dir = 'a' | 'b';

const DIR_STORAGE_KEY = 'ipflex-dir';

function detectDir(): Dir {
  try {
    const saved = localStorage.getItem(DIR_STORAGE_KEY);
    if (saved === 'b') return 'b';
  } catch {
    /* ignore */
  }
  return 'a';
}

/** 黑白主题切换：按钮文案跟着当前主题变，点击切到另一套 */
export function DirSwitch() {
  const { t } = useI18n();
  const [dir, setDirState] = React.useState<Dir>(detectDir);
  const dark = dir === 'b';

  const toggle = () => {
    const next: Dir = dark ? 'a' : 'b';
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
    <button
      type="button"
      className="nav-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? t('nav.themeToLight') : t('nav.themeToDark')}
      title={dark ? t('nav.themeToLight') : t('nav.themeToDark')}
    >
      <Icon name={dark ? 'sun' : 'moon'} />
      <span>{dark ? t('nav.themeLight') : t('nav.themeDark')}</span>
    </button>
  );
}

const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: 'zh', short: '中文', name: '中文' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ja', short: '日本語', name: '日本語' },
];

/** 语言切换：同一个按钮，点一下切到下一种语言，文案跟着变 */
export function LangSwitch() {
  const { t, lang, setLang } = useI18n();
  const index = Math.max(0, LANGS.findIndex((item) => item.code === lang));
  const next = LANGS[(index + 1) % LANGS.length];
  const current = LANGS[index];

  return (
    <button
      type="button"
      className="nav-toggle"
      onClick={() => setLang(next.code)}
      aria-label={`${t('nav.lang')} · ${next.name}`}
      title={`${t('nav.lang')} · ${next.name}`}
    >
      <Icon name="globe" />
      <span>{current.short}</span>
    </button>
  );
}
