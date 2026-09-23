import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { getUseCase, useCasePath } from '../use-cases';
import { Icon } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section, FaqGrid } from '../components/ui/sections';

export function UseCasePage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const page = getUseCase(slug, lang);

  if (!page) {
    return (
      <Section small>
        <div className="post-missing">
          <h1>{t('useCase.missing')}</h1>
          <Link to="/scenarios" className="btn btn-primary">
            {t('useCase.back')}
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="phero">
        <div className="container post-hero">
          <Link to="/scenarios" className="post-back">
            {t('useCase.back')}
          </Link>
          <h1>{page.title}</h1>
          <p className="phero-sub">{page.subtitle}</p>
          <ul className="case-features">
            {page.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="phero-actions" style={{ justifyContent: 'flex-start' }}>
            <AppLink to="register" className="btn btn-primary">
              {page.cta || t('useCase.try')}
            </AppLink>
          </div>
        </div>
      </section>

      <Section padTop={64}>
        <div className="case-split">
          <div>
            <h2>{page.scenarioTitle}</h2>
            <ol className="case-steps">
              {page.steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>{page.prosTitle}</h2>
            <ul className="case-pros">
              {page.pros.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className="case-cons">
              {page.cons.map((item) => (
                <li key={item}>
                  <Icon name="close" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {(page.flowTitle || page.tags.length > 0) && (
        <Section alt small>
          <h2 className="sec-title" style={{ textAlign: 'left', marginBottom: 22 }}>
            {page.flowTitle}
          </h2>
          <div className="case-flow">
            <ol className="case-steps">
              {page.flow.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            {page.tags.length > 0 && (
              <div className="chips">
                {page.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {page.why.length > 0 && (
        <Section>
          <div className="sec-head">
            <h2 className="sec-title">{page.whyTitle}</h2>
          </div>
          <div className="grid-3">
            {page.why.map((item) => (
              <div key={item.title} className="f-card reveal">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(page.tips.length > 0 || page.faqs.length > 0) && (
        <Section alt>
          <div className="case-split">
            {page.faqs.length > 0 && (
              <div>
                <h2>{page.faqTitle}</h2>
                {page.faqSub && <p className="sec-sub" style={{ textAlign: 'left', margin: '8px 0 18px' }}>{page.faqSub}</p>}
                <FaqGrid items={page.faqs} />
              </div>
            )}
            {page.tips.length > 0 && (
              <div className="case-tips">
                <h2>{page.tipsTitle}</h2>
                <ul>
                  {page.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {page.more.length > 0 && (
        <Section small>
          <h2 className="sec-title" style={{ textAlign: 'left', marginBottom: 22 }}>
            {t('useCase.more')}
          </h2>
          <div className="grid-4">
            {page.more.map((item) => (
              <Link key={item.slug} to={useCasePath(item.slug)} className="f-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
