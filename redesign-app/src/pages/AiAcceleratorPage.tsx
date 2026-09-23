import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { EXTERNAL } from '../routes';
import { Icon, type IconName } from '../components/Icon';
import { FaqSection, PageHero, SecHead, Section } from '../components/ui/sections';

/** 旧站 AI 加速器页：问题、方案、原理、场景、步骤、对比、FAQ。样式走现有 token。 */
export function AiAcceleratorPage() {
  const { t, ta } = useI18n();
  const proof = ta<string>('ai.proof');
  const problems = ta<{ icon: IconName; title: string; desc: string }>('ai.problem.items');
  const solutions = ta<{ icon: IconName; title: string; desc: string }>('ai.solution.items');
  const how = ta<{ title: string; desc: string }>('ai.how.items');
  const scenarios = ta<{ icon: IconName; title: string; desc: string }>('ai.scenarios.items');
  const steps = ta<{ title: string; desc: string }>('ai.steps.items');
  const headers = ta<string>('ai.compare.headers');
  const rows = ta<string[]>('ai.compare.rows');

  return (
    <>
      <PageHero
        prefix="ai"
        chips={proof.map((text) => ({ icon: 'check' as IconName, text }))}
        actions={
          <div className="phero-actions">
            <a href={EXTERNAL.dashboard} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {t('ai.primaryCta')}
            </a>
            <a href="#how-it-works" className="btn btn-hero2">
              {t('ai.secondaryCta')}
            </a>
          </div>
        }
      />

      <Section padTop={64}>
        <SecHead prefix="ai.problem" />
        <div className="grid-3">
          {problems.map((item) => (
            <div key={item.title} className="f-card reveal">
              <div className="f-icon">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <SecHead prefix="ai.solution" />
        <div className="grid-3">
          {solutions.map((item) => (
            <div key={item.title} className="f-card reveal">
              <div className="f-icon">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div id="how-it-works">
          <SecHead prefix="ai.how" />
          <div className="grid-3">
            {how.map((item, index) => (
              <div key={item.title} className="step reveal">
                <div className="step-num">{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section alt>
        <SecHead prefix="ai.scenarios" />
        <div className="grid-4">
          {scenarios.map((item) => (
            <div key={item.title} className="u-card reveal">
              <div className="f-icon">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SecHead prefix="ai.steps" />
        <div className="steps-grid">
          {steps.map((item, index) => (
            <div key={item.title} className="step reveal">
              <div className="step-num">{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="ai-note">{t('ai.steps.note')}</p>
        <div className="phero-actions" style={{ justifyContent: 'center' }}>
          <a href={EXTERNAL.dashboard} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            {t('ai.primaryCta')}
          </a>
        </div>
      </Section>

      <Section alt>
        <SecHead prefix="ai.compare" />
        <div className="md-table ai-table">
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <FaqSection prefix="ai.faq" />

      <Section small>
        <div className="cta-banner reveal">
          <h2>{t('ai.cta.title')}</h2>
          <p>{t('ai.cta.desc')}</p>
          <div className="phero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-white">
              {t('ai.cta.btn')}
            </Link>
            <a href={EXTERNAL.telegram} className="btn btn-white" target="_blank" rel="noopener noreferrer">
              {t('ai.cta.contact')}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
