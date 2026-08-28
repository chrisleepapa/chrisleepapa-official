// Miracle Shot — copy-only text correction
// Changes only the first World & Story card title on this page.
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('[data-i18n="world_title"]');
  if (title) title.textContent = '평범한 아이들이 빛을 찾는 이야기';
});
