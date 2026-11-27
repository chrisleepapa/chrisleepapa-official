(() => {
  const key = 'studio-last-work';
  const works = new Set(["/sistersquad","/sistersquad2","/sistersquad-hub","/journal","/journal-1","/journal-2","/journal-3","/journal-4","/journal-5","/journal-6","/yul","/jung","/sistersquad-share"]);
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
  try {
    if (works.has(path)) {
      localStorage.setItem(key, path);
      return;
    }
    const link = document.querySelector('#studio-return-link');
    const last = localStorage.getItem(key);
    if (link && works.has(last)) {
      link.href = last;
      link.parentElement.hidden = false;
    }
  } catch {
    // Browsers with storage disabled can use all normal navigation.
  }
})();