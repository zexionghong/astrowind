import { useI18n } from '../i18n';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section, SecHead, FaqSection } from '../components/ui/sections';

export function PricingPage() {
  const { t, ta } = useI18n();

  const cards = ta<{
    name: string;
    sub: string;
    num: string;
    unit: string;
    feats: string[];
    popular: boolean;
  }>('pricing.cards');
  const guideBlocks = ta<{
    title: string;
    list?: { icon: IconName; text: string }[];
    evalSteps?: string[];
  }>('pricing.guide.blocks');
  const features = ta<{ icon: IconName; title: string; desc: string }>('pricing.features.items');

  return (
    <>
      {/* Hero */}
      <section className="phero phero-center">
        <div className="container">
          <span className="eyebrow">{t('pricing.eyebrow')}</span>
          <h1>{t('pricing.heroTitle')}</h1>
          <p className="phero-sub">{t('pricing.heroSub')}</p>
          <div className="phero-actions">
            <AppLink to="register" className="btn btn-primary">
              {t('pricing.buyNow')}
            </AppLink>
            <AppLink to="prod-srp" className="btn btn-hero2">
              {t('pricing.learnProduct')}
            </AppLink>
          </div>
        </div>
      </section>

      {/* 定价卡片 */}
      <Section padTop={56}>
        <div className="grid-3" style={{ alignItems: 'stretch' }}>
          {cards.map((card) => (
            <div key={card.name} className={`price-card${card.popular ? ' popular' : ''} reveal`}>
              {card.popular && <div className="price-ribbon">{t('pricing.popular')}</div>}
              <div className="price-name">{card.name}</div>
              <div className="price-sub">{card.sub}</div>
              <div className="price-line">
                <span className="price-num">{card.num}</span>
                <span className="price-unit">{card.unit}</span>
              </div>
              <ul className="price-feats">
                {card.feats.map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
              <AppLink to="register" className={`btn ${card.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                {t('pricing.buyNow')}
              </AppLink>
            </div>
          ))}
        </div>
        <p className="price-note">{t('pricing.note')}</p>
      </Section>

      {/* 选购指南 */}
      <Section alt>
        <SecHead prefix="pricing.guide" />
        <div className="guide-wrap">
          {guideBlocks.map((block) => (
            <div key={block.title} className="guide-block reveal">
              <h3>{block.title}</h3>
              {block.list && (
                <ul className="guide-list">
                  {block.list.map((li) => (
                    <li key={li.text}>
                      <Icon name={li.icon} />
                      {li.text}
                    </li>
                  ))}
                </ul>
              )}
              {block.evalSteps && (
                <ul className="guide-list eval-steps">
                  {block.evalSteps.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 价格相关特性 */}
      <Section>
        <SecHead prefix="pricing.features" />
        <div className="grid-3">
          {features.map((it) => (
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

      <FaqSection prefix="pricing.faq" alt />
    </>
  );
}
