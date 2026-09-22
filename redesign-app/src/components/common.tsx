import React from 'react';
import { useI18n } from '../i18n';
import type { Lang } from '../i18n';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { ROUTES } from '../routes';

/** i18n key → 内部路由。不在映射内的 key 视为外部/占位链接 */
function resolveTo(to?: string): string | null {
  if (!to) return null;
  return ROUTES[to as keyof typeof ROUTES] ?? null;
}

/** 统一链接组件：有 to 且能映射到路由时用 <Link>，否则渲染占位 <a> */
export function AppLink({
  to,
  className,
  style,
  children,
}: {
  to?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
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
