# Imperial Satyendra — Design QA

## Comparison set

- Visual source truth: `/Users/sumangaldey/.codex/generated_images/01a07f2f-936d-7151-ab53-0b40e43d1d76/exec-ee82fa6e-5ef7-4273-8e08-ff5db535a4e8.png` (selected “Ivory Courtyard” direction)
- Source pixels: 793 × 1981.
- Implementation: local Next.js homepage at `http://localhost:3000/`.
- Implementation screenshot path: Codex in-app Browser tab 8, final visible capture at `http://localhost:3000/?qa=route-cursor-final#gallery`.
- Implementation pixels/CSS viewport: 1280 × 720 at device density 1. A second responsive capture was reviewed at 633 × 884.
- State: gallery route active, scroll progress at stop 05, custom cursor visible; responsive capture included the custom cursor hover state and route label.
- Normalization: the source is a tall concept montage and the implementation is a browser viewport. Matching content regions were compared at desktop scale; no density resampling was required.
- Method: the source visual and live browser captures were viewed together for hierarchy, imagery, palette, typography, spacing, transitions and interaction states.

## Visual match

| Area | Result | Notes |
| --- | --- | --- |
| Art direction | Passed | Warm ivory, ink and restrained gold system matches the selected direction. |
| Hero | Passed | Full-bleed architectural image, editorial serif headline, transparent navigation and restrained CTA treatment retain the source hierarchy. |
| Story rhythm | Passed | Alternating quiet editorial sections and immersive full-bleed moments follow the source’s vertical pacing. |
| Photography | Passed | All hotel imagery is a coherent generated set; no placeholders or mismatched stock assets remain. |
| Stacked rooms | Passed | Layered room photography, depth, rotation and seal create the intended 3D storytelling moment. |
| Gallery | Passed after fix | Direct anchor navigation initially left cards at zero opacity. The conflicting entrance animation was removed; cards now render immediately and the 3D carousel remains animated through state transitions. |
| Scroll route | Passed after fix | The route follows the reference’s elevator-like journey language, exposes eight clickable stops, advances its gold progress line, and reports the active location accessibly. A tablet collision with the gallery arrow was fixed by stacking the gallery heading and controls below 700px. |
| Custom cursor | Passed | Phosphor arrow icon, antique-gold hover state and contextual labels match the brand system without introducing a raster placeholder. Native cursor behavior is retained for text fields, touch devices and reduced-motion users. |
| Finale | Passed | Blue-hour exterior, centered invitation and dark footer provide the intended cinematic ending. |

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond and Manrope preserve the source’s high-contrast editorial hierarchy, restrained weights and tracked microcopy. Route labels remain readable without competing with display headings.
- Spacing and layout rhythm: the slim fixed route sits outside the main reading column; 1280px and 633px captures show no horizontal overflow. Gallery controls reflow before colliding with the rail.
- Colors and tokens: cursor and active route states reuse the existing `--gold`, `--ink` and ivory system, with sufficient contrast over both photography and paper sections.
- Image quality and asset fidelity: existing generated hotel imagery remains untouched and sharp. New controls use the installed Phosphor icon system rather than custom SVG or CSS illustration.
- Copy and content: route names mirror the actual semantic sections and contextual cursor verbs describe the available action.

## Focused comparison evidence

- Hero region: the compact progress rail keeps the reference website’s navigational storytelling idea while matching the selected ivory concept’s quieter visual density.
- Gallery region: the 1280 × 720 capture confirms the active `05` stop, stacked photographs, available carousel controls and cursor can coexist without overlap.
- Responsive region: the 633 × 884 capture confirms a compact number-free route rail and visible cursor hover label. Touch devices do not render the custom cursor.

## Comparison history

1. P2 — Direct gallery navigation inherited zero-opacity GSAP styles. Fixed by removing the conflicting entrance animation; fresh-session evidence showed opacity `1` and a visible five-card stack.
2. P2 — At 633px, the fixed route rail approached the gallery’s right-arrow hit area. Fixed by switching the gallery heading/controls to a vertical layout below 700px and reserving rail clearance.
3. Post-fix evidence — Final 1280 × 720 capture showed zero horizontal overflow, `#gallery` in the URL, “Go to Gallery section” active, and no browser console errors.

## Functional and quality checks

- Primary navigation scrolls to the correct sections.
- Every route stop updates the URL fragment, scrolls smoothly and becomes the active `aria-current` location.
- Cursor follows pointer movement with GSAP quick setters and changes label/state over route links, gallery cards and primary CTAs.
- Gallery previous/next controls update both the active photograph and numeric counter.
- Enquiry CTAs open a usable form overlay; the overlay closes through its close control and Escape key.
- Semantic heading order, descriptive image alternative text and keyboard-visible controls are present.
- Reduced-motion users bypass the GSAP/Lenis motion layer.
- Browser console contains no runtime errors.
- ESLint passes.
- Production build passes.
- `/robots.txt` and `/sitemap.xml` are statically generated.

## Intentional deviations

- The visual source is a concept montage rather than a pixel-measured UI specification. The implementation preserves its composition, tone and storytelling system while adding production navigation, a responsive enquiry flow, search metadata and accessible controls.
- Exact contact details, street address, pricing and room inventory are deliberately omitted until supplied by the client; this avoids publishing unverifiable business information.

final result: passed
