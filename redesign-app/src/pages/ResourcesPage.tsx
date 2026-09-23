import { useI18n } from '../i18n';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section, PageHero, FaqSection } from '../components/ui/sections';

export function ResourcesPage() {
  const { t, ta } = useI18n();
  const cols = ta<{
    title: string;
    desc: string;
    links: { icon: IconName; b: string; text: string; to?: string; href?: string; ext?: boolean }[];
  }>('resources.cols');
  const reading = ta<string>('resources.reading.items');

  return (
    <>
      <PageHero prefix="resources" />

      <Section padTop={64}>
        <div className="grid-2">
          {cols.map((col) => (
            <div key={col.title} className="res-col reveal">
              <h3>{col.title}</h3>
              <p>{col.desc}</p>
              <div className="link-cards">
                {col.links.map((link) => (
                  <AppLink key={link.b} to={link.to} href={link.href} className={`link-card${link.ext ? ' ext' : ''}`}>
                    <span className="f-icon">
                      <Icon name={link.icon} />
                    </span>
                    <span>
                      <b>{link.b}</b>
                      <span>{link.text}</span>
                    </span>
                  </AppLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="sec-head">
          <span className="eyebrow">{t('resources.reading.eyebrow')}</span>
          <h2 className="sec-title">{t('resources.reading.title')}</h2>
        </div>
        <ol className="order-steps">
          {reading.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Section>

      <FaqSection prefix="resources.faq" />
    </>
  );
}
