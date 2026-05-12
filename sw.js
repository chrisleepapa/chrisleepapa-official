self.addEventListener('install', (event) => {
  console.log('ChrisPapa SW: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('ChrisPapa SW: Activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // cross-origin 요청은 SW가 간섭하지 않음
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('인터넷 연결이 원활하지 않습니다.', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});