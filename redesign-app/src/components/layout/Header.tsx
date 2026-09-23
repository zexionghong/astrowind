import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { EXTERNAL, ROUTES } from '../../routes';
import logoUrl from '../../assets/logo.png';
import { Icon } from '../Icon';
import { AppLink, DirSwitch, LangSwitch, PromoBar } from '../common';

const NAV_LINKS: { key: string; to?: string; href?: string }[] = [
  { key: 'nav.products', to: 'prod-srp' },
  { key: 'nav.pricing', to: 'pricing' },
  { key: 'nav.scenarios', to: 'scenarios' },
  { key: 'nav.blog', to: 'blog' },
  { key: 'nav.resources', to: 'resources' },
  { key: 'nav.help', href: EXTERNAL.docs },
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
              <img src={logoUrl} alt="IPFlex" />
            </Link>
            <ul className="nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.key}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {t(l.key)}
                    </a>
                  ) : (
                    <NavLink
                      to={(l.to && ROUTES[l.to]) || '/'}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {t(l.key)}
                    </NavLink>
                  )}
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
              onClick={() => setMobileOpen((v) => !v)}
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
              {NAV_LINKS.map((l) =>
                l.href ? (
                  <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer">
                    {t(l.key)}
                  </a>
                ) : (
                  <NavLink
                    key={l.key}
                    to={(l.to && ROUTES[l.to]) || '/'}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {t(l.key)}
                  </NavLink>
                ),
              )}
              <AppLink href={EXTERNAL.login}>{t('nav.login')}</AppLink>
              <Link to="/register">{t('nav.register')}</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
