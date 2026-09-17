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

      if (url.pathname === '/miracleshot' || url.pathname === '/miracleshot.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const script = '<script src="/js/miracleshot-ui-fix.js?v=20260830"></script>';
          let patched = html;
          if (!patched.includes('/js/miracleshot-ui-fix.js')) {
            const mainScript = '<script src="js/main.js"></script>';
            if (patched.includes(mainScript)) patched = patched.replace(mainScript, `${script}${mainScript}`);
            else patched = patched.replace('</body>', `${script}</body>`);
          }
          return new Response(patched, { status: response.status, statusText: response.statusText, headers: response.headers });
        }
      }

      if (url.pathname === '/gameinfo' || url.pathname === '/gameinfo.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const script = '<script src="/js/gameinfo-goal-fix.js?v=20260904"></script>';
          if (!html.includes('/js/gameinfo-goal-fix.js')) {
            const mainScript = '<script src="js/main.js"></script>';
            const patched = html.includes(mainScript) ? html.replace(mainScript, `${script}${mainScript}`) : html.replace('</body>', `${script}</body>`);
            return new Response(patched, { status: response.status, statusText: response.statusText, headers: response.headers });
          }
        }
      }

      if (url.pathname === '/worship' || url.pathname === '/worship.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const coverScript = '<script src="/js/worship-vol2-cover-fix.js?v=20260914"></script>';
          const confessionScript = '<script src="/js/worship-confession.js?v=20260914"></script>';
          const bannerScript = '<script src="/js/worship-banner.js?v=20260915"></script>';
          let patched = html;
          if (!patched.includes('/js/worship-vol2-cover-fix.js')) {
            const mainScript = '<script src="js/main.js"></script>';
            patched = patched.includes(mainScript) ? patched.replace(mainScript, `${coverScript}${mainScript}`) : patched.replace('</body>', `${coverScript}</body>`);
          }
          if (!patched.includes('/js/worship-confession.js')) patched = patched.replace('</body>', `${confessionScript}</body>`);
          if (!patched.includes('/js/worship-banner.js')) patched = patched.replace('</body>', `${bannerScript}</body>`);
          return new Response(patched, { status: response.status, statusText: response.statusText, headers: response.headers });
        }
      }

      if (url.pathname === '/bible' || url.pathname === '/bible.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const recoveryScript = '<script src="/js/bible-read-state-recovery.js?v=20260917"></script>';
          const storyScript = '<script src="/js/bible-creator-story.js?v=20260915"></script>';
          const layoutScript = '<script src="/js/bible-layout.js?v=20260915"></script>';
          const persistenceScript = '<script src="/js/bible-direct-persistence.js?v=20260917"></script>';
          let patched = html;
          if (!patched.includes('/js/bible-creator-story.js')) patched = patched.replace('</body>', `${storyScript}</body>`);
          if (!patched.includes('/js/bible-layout.js')) patched = patched.replace('</body>', `${layoutScript}</body>`);
          if (!patched.includes('/js/bible-direct-persistence.js')) patched = patched.replace('</body>', `${persistenceScript}</body>`);
          if (!patched.includes('/js/bible-read-state-recovery.js')) patched = patched.replace('</body>', `${recoveryScript}</body>`);

          // Bible auth initialization is owned by bible-auth-gate.js.
          // Remove the legacy checkAuth() call from the inline onMainReady hook.
          const marker = 'window.onMainReady = function()';
          const start = patched.indexOf(marker);
          if (start !== -1) {
            const end = patched.indexOf('};', start);
            if (end !== -1) {
              const blockEnd = end + 2;
              const block = patched.slice(start, blockEnd);
              const cleanedBlock = block.replace(/\s*checkAuth\(\);\s*/g, '\n');
              patched = patched.slice(0, start) + cleanedBlock + patched.slice(blockEnd);
            }
          }

          return new Response(patched, { status: response.status, statusText: response.statusText, headers: response.headers });
        }
      }

      if (url.pathname === '/' || url.pathname === '/index.html') {
        if (type.includes('text/html')) {
          const html = await response.text();
          const script = '<script src="/js/home-chris-pick-i18n.js?v=20260916"></script>';
          if (!html.includes('/js/home-chris-pick-i18n.js')) {
            const patched = html.replace('</body>', `${script}</body>`);
            return new Response(patched, { status: response.status, statusText: response.statusText, headers: response.headers });
          }
        }
      }

      return response;
    } catch (error) {
      return new Response('인터넷 연결이 원활하지 않습니다.', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
