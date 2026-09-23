import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Icon } from '../Icon';
import { AppLink, DirSwitch, LangSwitch, PromoBar } from '../common';

const NAV_LINKS: { key: string; to: string }[] = [
  { key: 'nav.products', to: 'prod-srp' },
  { key: 'nav.pricing', to: 'pricing' },
  { key: 'nav.scenarios', to: 'scenarios' },
  { key: 'nav.blog', to: 'blog' },
  { key: 'nav.resources', to: 'resources' },
  { key: 'nav.help', to: '' },
];

export function Header() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  // 路由变化时收起移动端菜单
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
              <span className="logo-mark">
                <Icon name="globe" />
              </span>
              IPFlex
            </Link>
            <ul className="nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.key}>
                  <AppLink to={l.to}>{t(l.key)}</AppLink>
                </li>
              ))}
            </ul>
            <div className="nav-cta">
              <DirSwitch />
              <LangSwitch />
              <a href="#" className="nav-login" onClick={(e) => e.preventDefault()}>
                {t('nav.login')}
              </a>
              <Link to="/register" className="btn btn-primary btn-sm">
                {t('nav.register')}
              </Link>
            </div>
            <button
              className="nav-burger"
              aria-label="menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="nav-mobile">
            <div className="container">
              <div className="nav-switches">
                <DirSwitch />
                <LangSwitch />
              </div>
              {NAV_LINKS.map((l) => (
                <NavLink key={l.key} to={l.to || '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {t(l.key)}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
