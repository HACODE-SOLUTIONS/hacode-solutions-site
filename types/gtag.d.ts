// GA4 gtag types
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      eventNameOrConfigId: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export {};
