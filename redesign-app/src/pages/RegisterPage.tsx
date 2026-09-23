import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { EXTERNAL } from '../routes';
import { Icon, type IconName } from '../components/Icon';
import { AppLink } from '../components/common';
import { Section } from '../components/ui/sections';

const REGISTER_URL = 'https://api.ipflex.ink/user/register_link';

function inviteFromQuery(params: URLSearchParams): string {
  return params.get('invite') || params.get('ref') || params.get('code') || '';
}

export function RegisterPage() {
  const { t, ta } = useI18n();
  const feats = ta<{ icon: IconName; b: string; text: string }>('register.feats');
  const related = ta<{ text: string; to: string }>('register.onboarding.related');
  const [searchParams] = useSearchParams();
  const prefilledInvite = inviteFromQuery(searchParams);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const username = String(data.get('username') ?? '');
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    // 预填后输入框是 disabled，浏览器不会把它放进 FormData
    const invite = prefilledInvite || String(data.get('invite') ?? '');

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('name', username);
    params.append('email', email);
    params.append('password', password);
    params.append('confirm_password', password);
    if (invite) params.append('invite_code', invite);

    setSubmitting(true);
    setNotice(null);
    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const result = (await response.json()) as { code?: number; msg?: string };
      if (result.code === 0) {
        setNotice({ ok: true, text: t('register.success') });
        setShowPassword(false);
        form.reset();
      } else {
        setNotice({ ok: false, text: result.msg || t('register.fail') });
      }
    } catch {
      setNotice({ ok: false, text: t('register.fail') });
    } finally {
      setSubmitting(false);
    }
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
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder={t('register.usernamePh')}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="reg-email">{t('register.email')}</label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('register.emailPh')}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="reg-password">{t('register.password')}</label>
                <div className="pw-wrap">
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder={t('register.passwordPh')}
                    required
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? t('register.hidePassword') : t('register.showPassword')}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="reg-invite">{t('register.invite')}</label>
                <input
                  id="reg-invite"
                  name="invite"
                  type="text"
                  placeholder={t('register.invitePh')}
                  defaultValue={prefilledInvite}
                  disabled={Boolean(prefilledInvite)}
                />
              </div>
              <button className="btn btn-primary reg-submit" type="submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? t('register.submitting') : t('register.submit')}
              </button>
              {notice && (
                <p className={notice.ok ? 'form-status ok' : 'form-status err'} role="alert">
                  <Icon name={notice.ok ? 'check' : 'alert'} />
                  <span>{notice.text}</span>
                </p>
              )}
            </form>
            <div className="reg-alt">
              {t('register.altPrefix')}
              <AppLink href={EXTERNAL.login}>{t('register.altLink')}</AppLink>
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
