import { FormEvent } from 'react';
import { useI18n } from '../i18n';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section } from '../components/ui/sections';

export function RegisterPage() {
  const { t, ta } = useI18n();
  const feats = ta<{ icon: IconName; b: string; text: string }>('register.feats');
  const related = ta<{ text: string; to: string }>('register.onboarding.related');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 静态站点演示：暂不接后端
  };

  return (
    <>
      <Section small>
        <div className="reg-grid reveal">
          {/* 左侧卖点 */}
          <div className="reg-side">
            <span className="reg-tag">{t('register.sideTag')}</span>
            <h2>{t('register.sideTitle')}</h2>
            {feats.map((f) => (
              <div key={f.b} className="reg-feat">
                <span className="f-icon">
                  <Icon name={f.icon} />
                </span>
                <span>
                  <b>{f.b}</b>
                  <span>{f.text}</span>
                </span>
              </div>
            ))}
            <div className="reg-bonus">
              <Icon name="gift" style={{ width: 17, height: 17 }} />
              {t('register.bonus')}
            </div>
          </div>

          {/* 右侧表单 */}
          <div className="reg-form">
            <h2>{t('register.formTitle')}</h2>
            <form onSubmit={onSubmit}>
              <div className="form-field">
                <label htmlFor="reg-username">{t('register.username')}</label>
                <input id="reg-username" type="text" placeholder={t('register.usernamePh')} />
              </div>
              <div className="form-field">
                <label htmlFor="reg-email">{t('register.email')}</label>
                <input id="reg-email" type="email" placeholder={t('register.emailPh')} />
              </div>
              <div className="form-field">
                <label htmlFor="reg-password">{t('register.password')}</label>
                <input id="reg-password" type="password" placeholder={t('register.passwordPh')} />
              </div>
              <div className="form-field">
                <label htmlFor="reg-invite">{t('register.invite')}</label>
                <input id="reg-invite" type="text" placeholder={t('register.invitePh')} />
              </div>
              <button className="btn btn-primary reg-submit" type="submit">
                {t('register.submit')}
              </button>
            </form>
            <div className="reg-alt">
              {t('register.altPrefix')}
              <a href="#" onClick={(e) => e.preventDefault()}>
                {t('register.altLink')}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 注册后引导 */}
      <Section small alt>
        <div className="sec-head">
          <h2 className="sec-title">{t('register.onboarding.title')}</h2>
        </div>
        <div className="guide-wrap" style={{ maxWidth: 860 }}>
          <div className="guide-block">
            <p>{t('register.onboarding.p1')}</p>
            <p>{t('register.onboarding.p2')}</p>
            <p style={{ marginBottom: 0 }}>
              <b>{t('register.onboarding.relatedPrefix')}</b>{' '}
              {related.map((r, i) => (
                <span key={r.text}>
                  {i > 0 && ' · '}
                  <AppLink to={r.to} className="p-link">
                    {r.text}
                  </AppLink>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
