# Chris LEE.PAPA — Site Layout Principles

Last updated: 2026-11-05

## 1. Standard page ending order

Every standard content page must end in this order:

1. All page-specific content, including editorial notes, creator stories, project explanations, and SEO/content sections.
2. The shared Guestbook (`#guestbook-section`).
3. The shared Footer (`#site-footer`).

The Guestbook and Footer are shared site components and must remain at the bottom of the page. A page-specific section must never appear after them unless the user has explicitly approved a documented exception.

## 2. Dynamic content insertion

The shared Footer is mounted into an element with id `site-footer`, which is a `div` rather than necessarily a semantic `<footer>` element.

When adding page-specific sections dynamically:

- Insert before `#guestbook-section` when it exists.
- Otherwise insert before `#site-footer`.
- Use a semantic `footer` element only as a final fallback.
- Do not append page-specific content to `document.body` when either shared insertion point exists.

Do not assume `document.querySelector('footer')` will find the shared Footer.

## 3. Preserve existing page design and behavior

Correcting section order must not redesign the page or change its established visual identity, copy, navigation, media, or interactions. Make the smallest targeted structural correction.

## 4. Change and release workflow

- Make and verify changes on `develop` first.
- Keep `main` unchanged until the user explicitly approves promotion.
- Check the final DOM order, not only the static source order, whenever content is injected dynamically.

## 5. Bible page application

The `THE MAKING OF BIBLE IN MY HAND` creator-story section is page-specific content. It must appear before the shared Guestbook, followed by the shared Footer:

`Bible content → THE MAKING OF BIBLE IN MY HAND → Guestbook → Footer`
