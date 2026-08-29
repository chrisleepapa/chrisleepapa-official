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

      // Miracle Shot only: load the compatibility layer BEFORE main.js.
      // This is important because main.js calls window.onLangChange() during
      // its initial language application.
      if (url.pathname === '/miracleshot' || url.pathname === '/miracleshot.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const script = '<script src="/js/miracleshot-ui-fix.js?v=20260830"></script>';

          let patched = html;
          if (!patched.includes('/js/miracleshot-ui-fix.js')) {
            const mainScript = '<script src="js/main.js"></script>';
            if (patched.includes(mainScript)) {
              patched = patched.replace(mainScript, `${script}${mainScript}`);
            } else {
              patched = patched.replace('</body>', `${script}</body>`);
            }
          }

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
