self.addEventListener('install', (event) => {
  console.log('ChrisPapa SW: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('ChrisPapa SW: Activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      const url = new URL(event.request.url);
      const type = response.headers.get('content-type') || '';

      // Miracle Shot needs a small page-specific compatibility layer.
      // Inject it only into the Miracle Shot document so other pages are untouched.
      if (url.pathname === '/miracleshot' || url.pathname === '/miracleshot.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const script = '<script src="/js/miracleshot-ui-fix.js?v=20260829"></script>';
          const patched = html.includes('/js/miracleshot-ui-fix.js')
            ? html
            : html.replace('</body>', `${script}</body>`);

          return new Response(patched, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }
      }

      return response;
    } catch (error) {
      return new Response('인터넷 연결이 원활하지 않습니다.', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
