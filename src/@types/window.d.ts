interface Window {
  adsbygoogle?: { [key: string]: unknown }[],
}

declare global {
  // eslint-disable-next-line no-unused-vars
  var window: Window;
}