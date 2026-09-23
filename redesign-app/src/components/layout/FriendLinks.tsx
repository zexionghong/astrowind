import friendLinks from '../../../../public/friend-links.json';
import { useI18n } from '../../i18n';

interface FriendLink {
  name?: string;
  en_name?: string;
  url?: string;
  logo?: string;
  description?: string;
  en_description?: string;
}

interface FriendLinksFile {
  links?: FriendLink[];
}

const links = ((friendLinks as FriendLinksFile).links ?? []).filter(
  (link) => link.url && (link.name || link.en_name),
);

/** 旧站页脚友链：构建时写入 public/friend-links.json，中文用中文名，其它语言用英文。 */
export function FriendLinks() {
  const { t, lang } = useI18n();
  if (links.length === 0) return null;

  const zh = lang === 'zh';

  return (
    <section className="friends">
      <div className="container">
        <h2>{t('footer.partners')}</h2>
        <div className="friends-grid">
          {links.map((link) => {
            const name = zh ? link.name || link.en_name : link.en_name || link.name;
            const secondary = zh ? link.en_name : link.name;
            const description = zh ? link.description : link.en_description || link.description;
            const showSecondary = Boolean(secondary && secondary !== name);
            return (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                <span className="friends-logo">
                  {link.logo ? (
                    <img src={link.logo} alt={t('footer.partnerAlt').replace('{name}', name || '')} loading="lazy" />
                  ) : null}
                </span>
                <span className="friends-copy">
                  <strong>{name}</strong>
                  {showSecondary ? <span className="friends-sub">{secondary}</span> : null}
                  {description ? <span className="friends-desc">{description}</span> : null}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
