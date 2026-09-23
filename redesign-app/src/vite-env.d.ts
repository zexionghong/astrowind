/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}
