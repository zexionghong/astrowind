import type { ReactNode } from 'react';
import { useI18n } from '../../i18n';
import { Icon, type IconName } from '../Icon';
import { AppLink } from '../common';

/* ============ 区块骨架 ============ */

/** 通用 section 容器；alt 为浅色交替背景 */
export function Section({
  alt = false,
  small = false,
  padTop,
  children,
}: {
  alt?: boolean;
  small?: boolean;
  padTop?: number;
  children: ReactNode;
}) {
  const cls = ['section', alt && 'sec-alt', small && 'section-sm'].filter(Boolean).join(' ');
  return (
    <section className={cls} style={padTop != null ? { paddingTop: padTop } : undefined}>
      <div className="container">{children}</div>
    </section>
  );
}

/** 区块标题（居中：eyebrow + 标题 + 副标题） */
export function SecHead({ prefix }: { prefix: string }) {
  const { t } = useI18n();
  return (
    <div className="sec-head">
      {t(`${prefix}.eyebrow`) !== `${prefix}.eyebrow` && <span className="eyebrow">{t(`${prefix}.eyebrow`)}</span>}
      <h2 className="sec-title">{t(`${prefix}.title`)}</h2>
      {t(`${prefix}.sub`) !== `${prefix}.sub` && <p className="sec-sub">{t(`${prefix}.sub`)}</p>}
    </div>
  );
}

/** 内页 Hero（默认居中；产品页带 chips） */
export function PageHero({
  prefix,
  center = true,
  chips,
  actions,
  split,
}: {
  prefix: string;
  center?: boolean;
  chips?: { icon: IconName; text: string }[];
  actions?: ReactNode;
  split?: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <section className={`phero${center ? ' phero-center' : ''}`}>
      <div className="container">
        {split ? (
          <div className="phero-split">
            <div>
              <span className="eyebrow">{t(`${prefix}.eyebrow`)}</span>
              <h1>{t(`${prefix}.heroTitle`)}</h1>
              <p className="phero-sub">{t(`${prefix}.heroSub`)}</p>
              {actions}
            </div>
            {split}
          </div>
        ) : (
          <>
            <span className="eyebrow">{t(`${prefix}.eyebrow`)}</span>
            <h1>{t(`${prefix}.heroTitle`)}</h1>
            <p className="phero-sub">{t(`${prefix}.heroSub`)}</p>
            {chips && chips.length > 0 && (
              <div className="chips" style={{ marginBottom: 32 }}>
                {chips.map((c) => (
                  <span key={c.text} className="chip">
                    <Icon name={c.icon} />
                    {c.text}
                  </span>
                ))}
              </div>
            )}
            {actions}
          </>
        )}
      </div>
    </section>
  );
}

/** 中部 CTA 横幅 */
export function CtaBanner({ prefix }: { prefix: string }) {
  const { t } = useI18n();
  return (
    <div className="cta-banner reveal">
      <h2>{t(`${prefix}.title`)}</h2>
      <p>{t(`${prefix}.desc`)}</p>
      <AppLink to="register" className="btn btn-white">
        {t(`${prefix}.btn`)}
      </AppLink>
    </div>
  );
}

/* ============ 卡片网格 ============ */

/** 功能卡（f-card），items: [{icon,title,desc}] */
export function FeatureGrid({ items, cols = 3 }: { items: { icon: IconName; title: string; desc: string }[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`grid-${cols}`}>
      {items.map((it) => (
        <div key={it.title} className="f-card reveal">
          <div className="f-icon">
            <Icon name={it.icon} />
          </div>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** 统计卡（grid-4） */
export function StatGrid({ items }: { items: { num: string; label: string }[] }) {
  return (
    <div className="grid-4">
      {items.map((it) => (
        <div key={it.label} className="stat-card reveal">
          <div className="stat-num">{it.num}</div>
          <div className="stat-label">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

/** FAQ 双栏折叠列表，items: [{q,a}] */
export function FaqGrid({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-grid">
      {items.map((it) => (
        <details key={it.q} className="faq-item">
          <summary>
            {it.q}
            <Icon name="chevdown" />
          </summary>
          <p className="faq-a">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** FAQ 区块（标题 + 列表）；alt 控制是否浅色交替背景 */
export function FaqSection({ prefix, alt = false }: { prefix: string; alt?: boolean }) {
  const { ta } = useI18n();
  const items = ta<{ q: string; a: string }>(`${prefix}.items`);
  return (
    <Section alt={alt}>
      <SecHead prefix={prefix} />
      <FaqGrid items={items} />
    </Section>
  );
}
