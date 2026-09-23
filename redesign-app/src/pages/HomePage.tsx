import { Fragment } from 'react';
import { useI18n } from '../i18n';
import { EXTERNAL } from '../routes';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section } from '../components/ui/sections';

export function HomePage() {
  const { t, ta } = useI18n();

  const heroTrust = ta<{ icon: IconName; text: string }>('home.hero.trust');
  const proxyCards = ta<{
    name: string;
    desc: string[];
    link: string;
    to: string;
    tiles: { icon: IconName; text: string }[];
  }>('home.proxyContent.cards');
  const dcCard = ta<{
    name: string;
    desc: string[];
    link: string;
    to: string;
    tiles: { icon: IconName; text: string }[];
  }>('home.proxyService.card');
  const steps = ta<{ num: string; title: string; desc: string }>('home.steps.items');
  const advantages = ta<{ icon: IconName; title: string; desc: string }>('home.advantages.items');
  const stats = ta<{ num: string; label: string }>('home.stats');
  const useCases = ta<{ icon: IconName; title: string; desc: string }>('home.useCases.items');
  const faqs = ta<{ q: string; a: string }>('home.faq.items');
  const refStats = ta<{ num: string; label: string }>('home.referral.stats');

  return (
    <>
      {/* Hero */}
      <section className="sec-hero">
        <div className="container">
          <div className="hero">
            <h1>
              {t('home.hero.title').split('\n').map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
            <p className="hero-sub">{t('home.hero.sub')}</p>
            <div className="hero-actions">
              <AppLink to="register" className="btn btn-primary">
                {t('home.hero.buy')}
              </AppLink>
              <AppLink to="pricing" className="btn btn-hero2">
                {t('home.hero.learnMore')}
              </AppLink>
            </div>
            <div className="hero-trust">
              {heroTrust.map((item) => (
                <div key={item.text} className="hero-trust-item">
                  <Icon name={item.icon} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 住宅代理 / 数据中心代理 */}
      <Section>
        <div className="band-tags">
          <a className="band-tag" href="#residential-proxy">{t('home.proxyContent.band')}</a>
          <a className="band-tag" href="#datacenter-proxy">{t('home.proxyService.band')}</a>
        </div>
        <div id="residential-proxy">
          {proxyCards.map((card) => (
            <ProxyCard key={card.name} card={card} />
          ))}
        </div>
        <div id="datacenter-proxy" className="band-follow">
          {dcCard.map((card) => (
            <ProxyCard key={card.name} card={card} />
          ))}
        </div>
      </Section>

      {/* 快速开始 */}
      <Section>
        <div className="sec-head">
          <span className="eyebrow">{t('home.steps.eyebrow')}</span>
          <h2 className="sec-title">{t('home.steps.title')}</h2>
        </div>
        <div className="steps-grid reveal">
          {steps.map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
          <div className="step done">
            <div className="step-num">
              <Icon name="check" />
            </div>
            <h3>{t('home.steps.done')}</h3>
          </div>
        </div>
      </Section>

      {/* 为什么选择我们 */}
      <Section alt>
        <div className="sec-head">
          <span className="eyebrow">{t('home.advantages.eyebrow')}</span>
          <h2 className="sec-title">{t('home.advantages.title')}</h2>
          <p className="sec-sub">{t('home.advantages.sub')}</p>
        </div>
        <div className="grid-3">
          {advantages.map((it) => (
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

      {/* 数据统计 */}
      <Section>
        <div className="grid-4">
          {stats.map((it) => (
            <div key={it.label} className="stat-card reveal">
              <div className="stat-num">{it.num}</div>
              <div className="stat-label">{it.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 常用场景 */}
      <Section alt>
        <div className="sec-head">
          <span className="eyebrow">{t('home.useCases.eyebrow')}</span>
          <h2 className="sec-title">{t('home.useCases.title')}</h2>
          <p className="sec-sub">{t('home.useCases.sub')}</p>
        </div>
        <div className="grid-3">
          {useCases.map((it) => (
            <div key={it.title} className="u-card reveal">
              <div className="f-icon">
                <Icon name={it.icon} />
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="cta-banner reveal">
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.desc')}</p>
          <AppLink to="register" className="btn btn-white">
            {t('home.cta.btn')}
          </AppLink>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <div className="sec-head">
          <span className="eyebrow">{t('home.faq.eyebrow')}</span>
          <h2 className="sec-title">{t('home.faq.title')}</h2>
          <p className="sec-sub">{t('home.faq.sub')}</p>
        </div>
        <div className="faq-grid">
          {faqs.map((it) => (
            <details key={it.q} className="faq-item">
              <summary>
                {it.q}
                <Icon name="chevdown" />
              </summary>
              <p className="faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 推荐返现 */}
      <Section>
        <div className="ref-card reveal">
          <span className="ref-badge">
            <Icon name="gift" />
            {t('home.referral.badge')}
          </span>
          <h2 className="ref-title">
            {t('home.referral.titlePrefix')}
            <span className="hl">{t('home.referral.titleHighlight')}</span>
          </h2>
          <p className="ref-desc">{t('home.referral.desc')}</p>
          <div className="ref-stats">
            {refStats.map((it) => (
              <div key={it.label} className="ref-stat">
                <b>{it.num}</b>
                <span>{it.label}</span>
              </div>
            ))}
          </div>
          <div className="ref-actions">
            <AppLink to="register" className="btn btn-primary">
              {t('home.referral.primary')}
            </AppLink>
            <AppLink href={EXTERNAL.login} className="btn btn-secondary">
              {t('home.referral.secondary')}
            </AppLink>
          </div>
        </div>
      </Section>
    </>
  );
}

/** 首页产品大卡：左文右特性 tiles */
function ProxyCard({
  card,
}: {
  card: {
    name: string;
    desc: string[];
    link: string;
    to: string;
    tiles: { icon: IconName; text: string }[];
  };
}) {
  return (
    <div className="p-card reveal">
      <div>
        <h3 className="p-name">{card.name}</h3>
        <ul className="p-desc">
          {card.desc.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <AppLink to={card.to} className="p-link">
          {card.link} <Icon name="arrowright" />
        </AppLink>
      </div>
      <div className="p-tiles">
        {card.tiles.map((tile) => (
          <div key={tile.text} className="p-tile">
            <Icon name={tile.icon} />
            {tile.text}
          </div>
        ))}
      </div>
    </div>
  );
}
