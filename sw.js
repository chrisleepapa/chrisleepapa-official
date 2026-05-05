// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('ChrisPapa Service Worker: Installed');
  self.skipWaiting();
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('ChrisPapa Service Worker: Activated');
  event.waitUntil(clients.claim());
});

// 웹 페이지 요청 시 처리 (네트워크 우선 전략)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('인터넷 연결이 원활하지 않습니다.');
    })
  );
});
