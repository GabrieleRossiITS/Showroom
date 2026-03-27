# Accessibility Upgrade Plan

## Summary of Issues Found

| Area | Issue |
|------|-------|
| Global | No skip-to-content link; no `focus-visible` ring; no `prefers-reduced-motion` |
| Header | Logo is an `<h1>` (semantic conflict); language dropdown not keyboard accessible; icon-only buttons lack `aria-label` |
| Gallery | Artwork cards are `<motion.div>` clickable elements (not focusable); arrow buttons lack `aria-label`; no keyboard scroll |
| Layout | Background decorative elements not marked `aria-hidden` |
| Footer | GitHub icon link needs a more descriptive `aria-label` |

---

## Proposed Changes

### Global Styles & Root

#### [MODIFY] [styles.css](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/styles.css)
- Add a `.skip-link` class: visually hidden by default, visible on focus (for keyboard users).
- Add global `focus-visible` ring using CSS `:focus-visible`.
- Add `@media (prefers-reduced-motion: reduce)` block to disable Framer Motion animations via CSS.

#### [MODIFY] [__root.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/__root.tsx)
- Add `<a href="#main-content" className="skip-link">` as first child of `<body>`.
- Add `id="main-content"` to the `<main>` element.
- Add `role="banner"` to `<Header />` wrapper, `role="main"` to `<main>`, `role="contentinfo"` to `<Footer />`.

---

### Header

#### [MODIFY] [Header.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/layout/Header.tsx)
- Change logo from `<h1>` → `<p>` with `aria-label` (avoids duplicate `<h1>` with page headings).
- Add `aria-label="Main navigation"` to `<nav>`.
- Add `aria-label="Select language"`, `aria-expanded={open}`, `aria-haspopup="listbox"` to dropdown trigger.
- Add `role="listbox"` to dropdown menu, `role="option"` + `aria-selected` to each language item.
- Add keyboard handler: **Escape** closes dropdown, **ArrowDown/Up** moves focus between options, **Enter** selects.

---

### Gallery

#### [MODIFY] [artworks/index.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/artworks/index.tsx)
- Wrap the scroll container in `<section aria-label="Artwork Gallery">`.
- Convert artwork `<motion.div onClick>` to `<motion.button>` with `aria-label="{art.title}, {art.year}"`.
- Add `aria-label` to scroll arrow buttons ("Scroll left", "Scroll right").
- Add `onKeyDown` to scroll container: `ArrowLeft` / `ArrowRight` keys trigger [scroll()](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/artworks/index.tsx#38-46).
- Mark all decorative background blobs `aria-hidden="true"`.
- Wrap blob container in `aria-hidden="true"`.

---

### Artist Page

#### [MODIFY] [artist.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/artist.tsx)
- Wrap decorative spinning circles in `aria-hidden="true"`.
- Ensure `<main>` has the correct landmark (handled via [__root.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/__root.tsx)).

---

### Footer

#### [MODIFY] [Footer.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/layout/Footer.tsx)
- The GitHub icon already has `aria-label` from i18n — confirm it uses descriptive translated text. ✅

## Verification Plan

### Manual Verification
- Tab through every page and confirm all interactive elements are reachable and have visible focus rings.
- Press **Escape** to close the language dropdown; use **Arrow keys** to navigate options.
- Activate skip-to-content link by pressing Tab immediately on page load.
- Test with a screen reader (e.g. Windows Narrator) on the gallery page.
- Use browser DevTools **Accessibility** tree to confirm ARIA roles and labels.
- Toggle `prefers-reduced-motion` in OS settings and verify animations are suppressed.
