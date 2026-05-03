self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // 웹페이지 요청 시 로직 (기본 설정)
  e.respondWith(fetch(e.request));
});
