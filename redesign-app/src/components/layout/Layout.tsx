import React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Header } from './Header';
import { Footer } from './Footer';
import { Seo } from '../Seo';

/** 路由切换回顶；路由或语言变化后重新扫描 .reveal，避免换语言重建的卡片停在透明状态。 */
function useRevealOnRouteChange() {
  const { pathname } = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, lang]);
}

export function Layout() {
  useRevealOnRouteChange();
  const { t } = useI18n();
  return (
    <>
      <Seo />
      <a className="skip-link" href="#main">
        {t('nav.skip')}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
