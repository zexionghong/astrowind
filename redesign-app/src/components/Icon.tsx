import React from 'react';

export type IconName =
  | 'globe' | 'headset' | 'layers' | 'rocket' | 'infinity' | 'shieldlock'
  | 'bug' | 'cart' | 'chart' | 'share' | 'search' | 'ad' | 'gauge' | 'shield'
  | 'news' | 'refresh' | 'server' | 'home' | 'sparkles' | 'zap' | 'check'
  | 'chevdown' | 'arrowright' | 'close' | 'pin' | 'code' | 'clock' | 'gift'
  | 'menu' | 'tg' | 'xbrand' | 'book' | 'doc' | 'scale' | 'user' | 'target'
  | 'stairs' | 'blog' | 'eye' | 'eyeOff' | 'alert';

const paths: Record<IconName, React.ReactNode> = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  headset: <><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /></>,
  layers: <><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></>,
  rocket: <><path d="M4.5 16.5c-1 1-1.5 4.5-1.5 4.5s3.5-.5 4.5-1.5M9 15c-2-2-2-2 0-4l6-6c3 0 6 3 6 6l-6 6c-2 2-2 2-4 0l-2-2z" /><circle cx="15" cy="9" r="1.6" /></>,
  infinity: <path d="M6.2 15.8a3.8 3.8 0 1 1 0-7.6c2.9 0 4.9 7.6 7.8 7.6a3.8 3.8 0 1 0 0-7.6c-2.9 0-4.9 7.6-7.8 7.6z" />,
  shieldlock: <><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" /><rect x="9.5" y="11" width="5" height="4.5" rx="1" /><path d="M10.5 11v-1.5a1.5 1.5 0 0 1 3 0V11" /></>,
  bug: <><circle cx="12" cy="13" r="5" /><path d="M12 8V5M8.5 9.5L5.5 6.5M15.5 9.5l3-3M7 13H4M20 13h-3M8.5 16.5l-3 3M15.5 16.5l3 3" /></>,
  cart: <><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.5 12h10L20 8H6" /></>,
  chart: <><path d="M12 3a9 9 0 1 0 9 9h-9V3z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5z" /></>,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.3 10.8l6.4-3.6M8.3 13.2l6.4 3.6" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" /></>,
  ad: <><path d="M3 10v4l11 4V6L3 10z" /><path d="M14 8.5c2.5.5 4 1.8 4 3.5s-1.5 3-4 3.5M6 15v4" /></>,
  gauge: <><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l3.5-3.5" /><circle cx="12" cy="14" r="1.4" /><path d="M4 18.5h16" /></>,
  shield: <><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  news: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  refresh: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v4h-4" /></>,
  server: <><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /></>,
  sparkles: <><path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5L12 4z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /></>,
  zap: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />,
  check: <path d="M5 13l4 4L19 7" />,
  chevdown: <path d="M6 9l6 6 6-6" />,
  arrowright: <path d="M5 12h14M13 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  pin: <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  gift: <><rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M4 10h16M12 10v10M12 10s-4 0-5-2 1-4 3-3 2 5 2 5zM12 10s4 0 5-2-1-4-3-3-2 5-2 5z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  tg: <path d="M21.5 4.5L2.8 11.6c-.9.35-.85 1.6.07 1.9l4.4 1.4 1.7 5.2c.28.8 1.3.95 1.83.3l2.4-2.7 4.4 3.2c.66.5 1.6.13 1.78-.68l3-14.5c.2-.95-.75-1.7-1.6-1.3z" />,
  xbrand: <path d="M4 4l7 8.5L4.5 20h2.2l5.2-6 5 6H20l-7.3-8.8L19.5 4h-2.2l-4.8 5.6L8 4H4z" />,
  book: <><path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5z" /><path d="M4 19a2 2 0 0 1 2-2h14" /></>,
  doc: <><path d="M6 3h9l5 5v13H6V3z" /><path d="M14 3v6h6M9 13h6M9 17h6" /></>,
  scale: <><path d="M12 4v16M5 8h14M7 8l-3 6a3 3 0 0 0 6 0L7 8zM17 8l-3 6a3 3 0 0 0 6 0l-3-6z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  stairs: <path d="M4 20h4v-4h4v-4h4V8h4" />,
  blog: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h4" /></>,
  eye: <><path d="M2.5 12S6 7.2 12 7.2 21.5 12 21.5 12 18 16.8 12 16.8 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.4" /></>,
  eyeOff: <><path d="M4 5l16 14" /><path d="M9.6 6.5A10 10 0 0 1 12 6.2C18 6.2 21.5 12 21.5 12a17 17 0 0 1-2.8 3.4" /><path d="M6.3 8.1C4 9.6 2.5 12 2.5 12S6 17.8 12 17.8c1.3 0 2.5-.3 3.5-.7" /><path d="M9.8 10.1a2.4 2.4 0 0 0 3.3 3.3" /></>,
  alert: <><path d="M12 3.5l8.5 15H3.5L12 3.5z" /><path d="M12 10v4" /><path d="M12 16.6h.01" /></>,
};

interface IconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}

/** 与 demo 中 <svg class="ic"><use href="#i-*"/></svg> 等价的内联图标组件 */
export function Icon({ name, className = 'ic', style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
