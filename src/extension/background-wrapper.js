try {
  // eslint-disable-next-line no-undef
  if (typeof importScripts === 'function') importScripts('background.js');
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
}
