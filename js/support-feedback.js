(() => {
  const form = document.querySelector('#support-feedback');
  const category = form.elements.category;
  const submit = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#feedback-status');
  const isEnglish = () => document.documentElement.lang === 'en';
  const categories = {
    message: ['남기는 글', 'Message'],
    suggestion: ['개선 제안', 'Suggestion'],
    bug: ['오류 신고', 'Bug report']
  };

  function updateCategories() {
    const selection = category.value || 'message';
    category.replaceChildren(...Object.entries(categories).map(([value, labels]) =>
      new Option(labels[isEnglish() ? 1 : 0], value)
    ));
    category.value = selection;
  }
  updateCategories();
  new MutationObserver(updateCategories).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang']
  });

  let submissionId;
  form.addEventListener('input', () => { submissionId = undefined; });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    const language = isEnglish() ? 1 : 0;
    const data = Object.fromEntries(new FormData(form));
    submissionId ??= crypto.randomUUID();
    submit.disabled = true;
    status.textContent = ['보내는 중…', 'Sending…'][language];
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: submissionId })
      });
      if (!response.ok) throw new Error('submission failed');
      form.reset();
      submissionId = undefined;
      status.textContent = ['의견을 보냈습니다. 감사합니다.', 'Feedback sent. Thank you.'][language];
    } catch {
      status.textContent = ['전송하지 못했습니다. 입력 내용은 남아 있으니 다시 시도하거나 이메일로 보내 주세요.', 'Could not send. Your entries are still here. Try again or email us.'][language];
    } finally {
      submit.disabled = false;
    }
  });
  submit.disabled = false;
})();
