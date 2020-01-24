const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';

export const environment = {
  production: true,
  devicesRestUri: `${protocol}://${window.location.hostname}:${window.location.port}${window.location.pathname}ws`
};
