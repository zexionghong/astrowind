import { useI18n } from '../i18n';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section, PageHero, FaqSection } from '../components/ui/sections';

export function AboutPage() {
  const { t, ta } = useI18n();

  const sideItems = ta<string>('about.sideCard.items');
  const questions = ta<string>('about.evaluation.items');
  const principles = ta<{ icon: IconName; title: string; desc: string }>('about.principles.items');

  return (
    <>
      {/* Hero：左文右侧卡片 */}
      <PageHero
        prefix="about"
        center={false}
        split={
          <div className="about-side-card">
            <b>{t('about.sideCard.b')}</b>
            <ul>
              {sideItems.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
        actions={
          <div className="phero-actions">
            <AppLink to="prod-srp" className="btn btn-primary">
              {t('about.browseProducts')}
            </AppLink>
            <AppLink to="resources" className="btn btn-hero2">
              {t('about.visitResources')}
            </AppLink>
          </div>
        }
      />

      {/* 如何判断是否适合 */}
      <Section>
        <div className="sec-head">
          <span className="eyebrow">{t('about.evaluation.eyebrow')}</span>
          <h2 className="sec-title">{t('about.evaluation.title')}</h2>
          <p className="sec-sub">{t('about.evaluation.sub')}</p>
        </div>
        <div className="q-grid">
          {questions.map((q, i) => (
            <div key={q} className="q-card reveal">
              <span className="f-icon">Q{i + 1}</span>
              {q}
            </div>
          ))}
        </div>
      </Section>

      {/* 交付与支持原则 */}
      <Section alt>
        <div className="sec-head">
          <span className="eyebrow">{t('about.principles.eyebrow')}</span>
          <h2 className="sec-title">{t('about.principles.title')}</h2>
        </div>
        <div className="grid-3">
          {principles.map((it) => (
            <div key={it.title} className="f-card reveal">
              <div className="f-icon">
                <Icon name={it.icon} />
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection prefix="about.faq" />
    </>
  );
}
