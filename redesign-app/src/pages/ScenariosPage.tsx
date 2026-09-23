import { useI18n } from '../i18n';
import { Icon } from '../components/Icon';
import { AppLink } from '../components/common';
import { USE_CASE_SLUGS, useCasePath } from '../use-cases';
import { Section, PageHero, CtaBanner } from '../components/ui/sections';

export function ScenariosPage() {
  const { t, ta } = useI18n();
  const items = ta<{ tag: string; title: string; desc: string; benefits: string[] }>('scenarios.items');

  return (
    <>
      <PageHero prefix="scenarios" />

      <Section padTop={64}>
        <div className="grid-3">
          {items.map((it, index) => (
            <div key={it.title} className="sc-card reveal">
              <span className="sc-tag">{it.tag}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <ul className="sc-benefits">
                {it.benefits.map((b) => (
                  <li key={b}>
                    <Icon name="check" />
                    {b}
                  </li>
                ))}
              </ul>
              <AppLink to={useCasePath(USE_CASE_SLUGS[index] ?? '')} className="p-link">
                {t('scenarios.viewPlan')} <Icon name="arrowright" />
              </AppLink>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <CtaBanner prefix="scenarios.cta" />
      </Section>
    </>
  );
}
