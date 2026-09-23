import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { EXTERNAL } from '../../routes';
import { Icon } from '../Icon';
import { AppLink } from '../common';

/** 页脚栏目：footer.<key> 下为 { title, links: [{ text, to?, href? }] } */
const COLUMNS = ['products', 'solutions', 'support', 'company'] as const;

export function Footer() {
  const { t, ta } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">
              <span className="logo-mark">
                <Icon name="globe" />
              </span>
              IPFlex
            </Link>
            <p className="footer-desc">{t('footer.desc')}</p>
            <div className="footer-social">
              <a href={EXTERNAL.x} aria-label="X" target="_blank" rel="noopener noreferrer">
                <Icon name="xbrand" />
              </a>
              <a href={EXTERNAL.telegram} aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                <Icon name="tg" />
              </a>
            </div>
          </div>
          {COLUMNS.map((col) => {
            const colData = ta<{ title: string; links: { text: string; to?: string; href?: string }[] }>(
              `footer.${col}`,
            );
            const { title, links } = colData[0] ?? { title: '', links: [] };
            return (
              <div key={col}>
                <h4>{title}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link.text}>
                      <AppLink to={link.to} href={link.href}>
                        {link.text}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="footer-note">{t('footer.copyright').replace('{year}', String(year))}</div>
      </div>
    </footer>
  );
}
