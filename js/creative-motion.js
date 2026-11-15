(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.querySelector('.motion-stage');

  if (stage) {
    const controls = stage.querySelector('.stage-controls');
    const frames = [...stage.querySelectorAll('.stage-frame')];
    const sceneButtons = [...controls.querySelectorAll('[data-scene]')];
    const toggle = controls.querySelector('.scene-toggle');
    const symbol = toggle.querySelector('.scene-symbol');
    const art = stage.querySelector('.hero-art');
    const scenes = [controls, ...sceneButtons];
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let current = 0;
    let paused = reduceMotion.matches;
    let inView = false;
    let timer;

    function updateLabels() {
      const english = document.documentElement.lang === 'en';
      scenes.forEach(el => el.setAttribute('aria-label', english ? el.dataset.labelEn : el.dataset.labelKo));
      toggle.setAttribute('aria-label', paused
        ? (english ? 'Play automatic scene changes' : '자동 전환 재생')
        : (english ? 'Pause automatic scene changes' : '자동 전환 일시정지'));
      symbol.textContent = paused ? '▶' : 'Ⅱ';
    }

    function selectScene(index) {
      if (current === index) return;
      frames[current].classList.remove('is-current');
      sceneButtons[current].setAttribute('aria-pressed', 'false');
      current = index;
      frames[current].classList.add('is-current');
      sceneButtons[current].setAttribute('aria-pressed', 'true');
    }

    function updatePlayback() {
      clearTimeout(timer);
      const playing = !paused && inView && !document.hidden && !reduceMotion.matches;
      stage.classList.toggle('is-playing', playing);
      stage.classList.toggle('is-paused', !playing);
      updateLabels();
      if (playing) timer = setTimeout(() => {
        selectScene((current + 1) % frames.length);
        updatePlayback();
      }, 5800);
    }

    sceneButtons.forEach((button, index) => button.addEventListener('click', () => {
      paused = true;
      selectScene(index);
      updatePlayback();
    }));
    toggle.addEventListener('click', () => {
      paused = !paused;
      updatePlayback();
    });
    reduceMotion.addEventListener('change', () => {
      paused = reduceMotion.matches;
      toggle.hidden = reduceMotion.matches;
      updatePlayback();
    });
    document.addEventListener('visibilitychange', updatePlayback);
    new MutationObserver(updateLabels).observe(document.documentElement, {attributeFilter: ['lang']});
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback();
      }, {threshold: .32}).observe(art);
    } else {
      inView = true;
    }

    art.addEventListener('pointermove', event => {
      if (!pointer.matches || reduceMotion.matches) return;
      const bounds = art.getBoundingClientRect();
      art.style.setProperty('--frame-x', `${(event.clientX - bounds.left - bounds.width / 2) * .025}px`);
      art.style.setProperty('--frame-y', `${(event.clientY - bounds.top - bounds.height / 2) * .025}px`);
    });
    art.addEventListener('pointerleave', () => {
      art.style.removeProperty('--frame-x');
      art.style.removeProperty('--frame-y');
    });
    toggle.hidden = reduceMotion.matches;
    controls.hidden = false;
    updatePlayback();
  }

  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    });
  }, {threshold: .14});
  document.querySelectorAll('.creator-section-heading, .work-card, .note-row, .journal-card, .creator-intro').forEach((element, index) => {
    element.classList.add('motion-reveal');
    element.style.setProperty('--enter-delay', `${(index % 3) * 65}ms`);
    observer.observe(element);
  });
})();
