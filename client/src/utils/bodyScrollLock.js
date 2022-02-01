export const lockBodyScroll = (windowScrollY) => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  document.documentElement.style.height = '100vh';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${windowScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
};

export const unlockBodyScroll = (windowScrollY) => {
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.documentElement.style.height = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  window.scrollTo(0, windowScrollY);
};
