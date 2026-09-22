import { useI18n } from '../../i18n';
import { Icon, type IconName } from '../Icon';
import { AppLink } from '../common';
import { PageHero, Section, SecHead, StatGrid, FaqSection, CtaBanner } from './sections';

/* ---------- 产品页共享子区块 ---------- */

/** 图文双栏：文本 + 终端 mock 面板（reverse 时 mock 在左） */
function PerformanceSplit({
  prefix,
  reverse = false,
}: {
  prefix: string;
  reverse?: boolean;
}) {
  const { t, ta } = useI18n();
  const feats = ta<string>(`${prefix}.performance.feats`);
  const lines = ta<MockLine>(`${prefix}.mock.lines`);
  return (
    <Section alt>
      <div className="split">
        {reverse ? (
          <>
            <MockPanel lines={lines} />
            <PerfText prefix={prefix} feats={feats} />
          </>
        ) : (
          <>
            <PerfText prefix={prefix} feats={feats} />
            <MockPanel lines={lines} />
          </>
        )}
      </div>
    </Section>
  );
}

interface MockLine {
  k?: string;
  text?: string;
  b?: string;
  tail?: string;
  b2?: string;
  tail2?: string;
  b3?: string;
}

function PerfText({ prefix, feats }: { prefix: string; feats: string[] }) {
  const { t } = useI18n();
  return (
    <div className="reveal">
      <span className="eyebrow">{t(`${prefix}.performance.eyebrow`)}</span>
      <h2>{t(`${prefix}.performance.title`)}</h2>
      <p>{t(`${prefix}.performance.desc`)}</p>
      <ul className="split-feats">
        {feats.map((f) => (
          <li key={f}>
            <Icon name="check" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockPanel({ lines }: { lines: MockLine[] }) {
  return (
    <div className="mock-panel reveal">
      <div className="mock-title">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-dot" />
      </div>
      {lines.map((line, i) => (
        <div key={i} className="mock-line">
          {line.k && <span className="k">{line.k}</span>}
          {line.text}
          {line.b && <b>{line.b}</b>}
          {line.tail}
          {line.b2 && <b>{line.b2}</b>}
          {line.tail2}
          {line.b3 && <b>{line.b3}</b>}
        </div>
      ))}
    </div>
  );
}

/** 计费方式对比（仅静态住宅页使用） */
function BillingSection({ prefix }: { prefix: string }) {
  const { t, ta } = useI18n();
  const cards = ta<{
    title: string;
    price: string;
    blocks: { b: string; items: string[] }[];
  }>(`${prefix}.billing.cards`);
  return (
    <Section>
      <SecHead prefix={`${prefix}.billing`} />
      <div className="bill-grid">
        {cards.map((card) => (
          <div key={card.title} className="bill-card reveal">
            <h3>{card.title}</h3>
            <div className="bill-price">{card.price}</div>
            {card.blocks.map((block) => (
              <div key={block.b} className="bill-block">
                <b>{block.b}</b>
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bill-note">
        <b>{t(`${prefix}.billing.noteB`)}</b> —{' '}
        <AppLink to="register" className="p-link">
          {t(`${prefix}.billing.noteLink`)} <Icon name="arrowright" />
        </AppLink>
      </div>
    </Section>
  );
}

/* ---------- 产品页（三种产品共用） ---------- */

export interface ProductPageProps {
  /** i18n 命名空间：srp | drp | dc */
  prefix: 'srp' | 'drp' | 'dc';
  /** mock 面板放左侧（drp 用） */
  reverseSplit?: boolean;
  /** 是否显示计费对比区块（srp 用） */
  showBilling?: boolean;
  /** 是否显示 FAQ 区块 */
  showFaq?: boolean;
}

export function ProductPage({ prefix, reverseSplit = false, showBilling = false, showFaq = true }: ProductPageProps) {
  const { t, ta } = useI18n();
  const chips = ta<{ icon: IconName; text: string }>(`${prefix}.chips`);
  const stats = ta<{ num: string; label: string }>(`${prefix}.stats.items`);
  const why = ta<{ icon: IconName; title: string; desc: string }>(`${prefix}.why.items`);
  const useCases = ta<{ icon: IconName; title: string; desc: string; link: string }>(`${prefix}.useCases.items`);

  return (
    <>
      <PageHero
        prefix={prefix}
        chips={chips}
        actions={
          <div className="phero-actions">
            <AppLink to="register" className="btn btn-primary">
              {t(`${prefix}.trial`)}
            </AppLink>
            <AppLink to="pricing" className="btn btn-hero2">
              {t(`${prefix}.viewPricing`)}
            </AppLink>
          </div>
        }
      />

      <Section padTop={64}>
        <SecHead prefix={`${prefix}.stats`} />
        <StatGrid items={stats} />
      </Section>

      <PerformanceSplit prefix={prefix} reverse={reverseSplit} />

      <Section>
        <SecHead prefix={`${prefix}.why`} />
        <div className={`grid-${why.length === 4 ? 4 : 3}`}>
          {why.map((it) => (
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

      <Section alt>
        <SecHead prefix={`${prefix}.useCases`} />
        <div className={`grid-${useCases.length === 4 ? 2 : 3}`}>
          {useCases.map((uc) => (
            <div key={uc.title} className="u-card reveal">
              <div className="f-icon">
                <Icon name={uc.icon} />
              </div>
              <h3>{uc.title}</h3>
              <p>{uc.desc}</p>
              <AppLink className="p-link">
                {uc.link} <Icon name="arrowright" />
              </AppLink>
            </div>
          ))}
        </div>
      </Section>

      {showBilling && <BillingSection prefix={prefix} />}

      {showFaq && <FaqSection prefix={`${prefix}.faq`} />}

      <Section>
        <CtaBanner prefix="home.cta" />
      </Section>
    </>
  );
}
