import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { EXTERNAL, PATHS, ROUTES } from '../../routes';
import logoUrl from '../../assets/logo.png';
import { Icon, type IconName } from '../Icon';
import { AppLink, DirSwitch, LangSwitch, PromoBar } from '../common';

type MenuItem = {
  key: string;
  to: string;
  icon: IconName;
  badge?: boolean;
};

/** 旧站导航里的产品下拉。 */
const PRODUCT_ITEMS: MenuItem[] = [
  { key: 'srp', to: ROUTES['prod-srp'], icon: 'home', badge: true },
  { key: 'drp', to: ROUTES['prod-drp'], icon: 'refresh' },
  { key: 'dc', to: ROUTES['prod-dc'], icon: 'server' },
  { key: 'ai', to: ROUTES['prod-ai'], icon: 'sparkles', badge: true },
];

const PLAIN_LINKS: { key: string; to?: string; href?: string }[] = [
  { key: 'nav.pricing', to: 'pricing' },
  { key: 'nav.blog', to: 'blog' },
  { key: 'nav.resources', to: 'resources' },
  { key: 'nav.help', href: EXTERNAL.docs },
];

const SCENARIO_ITEMS: MenuItem[] = [
  { key: 'ad', to: '/use-case/static-residential-proxy-ad-verification', icon: 'shield' },
  { key: 'research', to: '/use-case/static-residential-proxy-scraping', icon: 'search' },
  { key: 'shop', to: '/use-case/static-residential-proxy-ecommerce', icon: 'cart' },
  { key: 'security', to: '/use-case/static-residential-proxy-security', icon: 'shieldlock' },
  { key: 'all', to: PATHS.scenarios, icon: 'arrowright', badge: true },
];

function PlainLink({ link }: { link: { key: string; to?: string; href?: string } }) {
  const { t } = useI18n();
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {t(link.key)}
      </a>
    );
  }
  return (
    <NavLink to={(link.to && ROUTES[link.to]) || '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
      {t(link.key)}
    </NavLink>
  );
}

function itemActive(pathname: string, to: string) {
  return pathname === to;
}

function menuActive(pathname: string, items: MenuItem[]) {
  return items.some((item) => itemActive(pathname, item.to));
}

function NavMenu({
  labelKey,
  menuKey,
  items,
}: {
  labelKey: string;
  menuKey: 'productsMenu' | 'scenariosMenu';
  items: MenuItem[];
}) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const root = React.useRef<HTMLLIElement>(null);
  const active = menuActive(pathname, items);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li
      className={open ? 'nav-drop open' : 'nav-drop'}
      ref={root}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={active ? 'nav-drop-btn active' : 'nav-drop-btn'}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {t(labelKey)}
        <Icon name="chevdown" className={open ? 'ic lang-chev open' : 'ic lang-chev'} />
      </button>
      <div className="nav-panel" hidden={!open}>
        {items.map((item) => {
          const base = `nav.${menuKey}.${item.key}`;
          const badge = item.badge ? t(`${base}.badge`) : '';
          return (
            <NavLink
              key={item.key}
              to={item.to}
              className={itemActive(pathname, item.to) ? 'nav-panel-item active' : 'nav-panel-item'}
              onClick={() => setOpen(false)}
            >
              <span className="nav-panel-icon">
                <Icon name={item.icon} />
              </span>
              <span className="nav-panel-copy">
                <span className="nav-panel-title">
                  {t(`${base}.label`)}
                  {badge ? <span className="nav-badge">{badge}</span> : null}
                </span>
                <span className="nav-panel-desc">{t(`${base}.desc`)}</span>
              </span>
            </NavLink>
          );
        })}
      </div>
    </li>
  );
}

function MobileGroup({
  labelKey,
  menuKey,
  items,
}: {
  labelKey: string;
  menuKey: 'productsMenu' | 'scenariosMenu';
  items: MenuItem[];
}) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const active = menuActive(pathname, items);
  const [open, setOpen] = React.useState(active);

  return (
    <div className="nav-mobile-group">
      <button
        type="button"
        className={active ? 'active' : ''}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {t(labelKey)}
        <Icon name="chevdown" className={open ? 'ic lang-chev open' : 'ic lang-chev'} />
      </button>
      {open && (
        <div className="nav-mobile-sub">
          {items.map((item) => {
            const base = `nav.${menuKey}.${item.key}`;
            return (
              <NavLink
                key={item.key}
                to={item.to}
                className={itemActive(pathname, item.to) ? 'active' : ''}
              >
                <Icon name={item.icon} />
                {t(`${base}.label`)}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <PromoBar />
      <div className="nav-wrap">
        <nav className="nav">
          <div className="container">
            <Link to="/" className="logo">
              <img src={logoUrl} alt="IPFlex" />
            </Link>
            <ul className="nav-links">
              <NavMenu labelKey="nav.products" menuKey="productsMenu" items={PRODUCT_ITEMS} />
              <li>
                <PlainLink link={PLAIN_LINKS[0]} />
              </li>
              <NavMenu labelKey="nav.scenarios" menuKey="scenariosMenu" items={SCENARIO_ITEMS} />
              {PLAIN_LINKS.slice(1).map((link) => (
                <li key={link.key}>
                  <PlainLink link={link} />
                </li>
              ))}
            </ul>
            <div className="nav-cta">
              <DirSwitch />
              <LangSwitch />
              <AppLink href={EXTERNAL.login} className="nav-login">
                {t('nav.login')}
              </AppLink>
              <Link to="/register" className="btn btn-primary btn-sm">
                {t('nav.register')}
              </Link>
            </div>
            <button
              className="nav-burger"
              aria-label={mobileOpen ? t('nav.menuClose') : t('nav.menu')}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="nav-mobile" id="nav-mobile">
            <div className="container">
              <div className="nav-switches">
                <DirSwitch />
                <LangSwitch />
              </div>
              <MobileGroup labelKey="nav.products" menuKey="productsMenu" items={PRODUCT_ITEMS} />
              <NavLink
                to={PATHS.pricing}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {t('nav.pricing')}
              </NavLink>
              <MobileGroup labelKey="nav.scenarios" menuKey="scenariosMenu" items={SCENARIO_ITEMS} />
              <NavLink to={PATHS.blog} className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.blog')}
              </NavLink>
              <NavLink to={PATHS.resources} className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('nav.resources')}
              </NavLink>
              <a href={EXTERNAL.docs} target="_blank" rel="noopener noreferrer">
                {t('nav.help')}
              </a>
              <AppLink href={EXTERNAL.login}>{t('nav.login')}</AppLink>
              <Link to="/register">{t('nav.register')}</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
