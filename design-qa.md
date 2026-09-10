# Imperial Satyendra — Design QA

## Comparison set

- Visual source truth: `/Users/sumangaldey/.codex/generated_images/01a07f2f-936d-7151-ab53-0b40e43d1d76/exec-ee82fa6e-5ef7-4273-8e08-ff5db535a4e8.png` (selected “Ivory Courtyard” direction)
- Source pixels: 793 × 1981.
- Implementation: local Next.js homepage at `http://localhost:3000/`.
- Implementation screenshot path: Codex in-app Browser tab 10, final visible story capture at `http://localhost:3000/?qa=story-final#story`; gallery capture remains recorded in tab 8.
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
| Scroll route | Passed after fix | The route follows the reference’s elevator-like journey language, exposes nine clickable stops including the new story, advances its gold progress line, and reports the active location accessibly. A tablet collision with the gallery arrow was fixed by stacking the gallery heading and controls below 700px. |
| Custom cursor | Passed | Phosphor arrow icon, antique-gold hover state and contextual labels match the brand system without introducing a raster placeholder. Native cursor behavior is retained for text fields, touch devices and reduced-motion users. |
| Brand logo | Passed after fix | The supplied gold artwork is preserved pixel-for-pixel while its black JPEG background is removed into a genuine alpha channel. A tightly cropped PNG now blends cleanly with the transparent photo navbar and dark footer at desktop and mobile breakpoints. |
| Five-chapter story | Passed after fix | Five newly generated 1536 × 1024 photographs form a coherent morning-to-night sequence. The full-screen pinned stage, upward image wipes, changing editorial copy and internal gold progress line preserve the selected direction’s cinematic rhythm. A missing-target GSAP warning was fixed before final capture. |
| Finale | Passed | Blue-hour exterior, centered invitation and dark footer provide the intended cinematic ending. |

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond and Manrope preserve the source’s high-contrast editorial hierarchy, restrained weights and tracked microcopy. Route labels remain readable without competing with display headings.
- Spacing and layout rhythm: the slim fixed route sits outside the main reading column; 1280px and 633px captures show no horizontal overflow. Gallery controls reflow before colliding with the rail.
- Colors and tokens: cursor and active route states reuse the existing `--gold`, `--ink` and ivory system, with sufficient contrast over both photography and paper sections.
- Image quality and asset fidelity: existing generated hotel imagery remains untouched and sharp. New controls use the installed Phosphor icon system rather than custom SVG or CSS illustration.
- Logo fidelity: `app/asset/satyendra-imperial-logo.png` retains the supplied emblem, typography, gold tonal variation and ornament; only background pixels were converted to transparency. The original JPEG remains untouched as the source asset.
- Story image set: `story-morning-suite.png`, `story-welcome-family.png`, `story-afternoon-dining.png`, `story-wedding-arrival.png` and `story-moonlit-balcony.png` are all new assets generated specifically for this sequence. None reuse the existing room, dining, wedding or finale photography.
- Copy and content: route names mirror the actual semantic sections and contextual cursor verbs describe the available action.

## Focused comparison evidence

- Hero region: the compact progress rail keeps the reference website’s navigational storytelling idea while matching the selected ivory concept’s quieter visual density.
- Gallery region: the 1280 × 720 capture confirms the active `05` stop, stacked photographs, available carousel controls and cursor can coexist without overlap.
- Responsive region: the 633 × 884 capture confirms a compact number-free route rail and visible cursor hover label. Touch devices do not render the custom cursor.
- Story region: the 1280 × 720 capture confirms readable text contrast, deliberate crop, full image loading, no horizontal overflow and clear separation between the route rail and story copy. The 633 × 884 captures verify all five transitions through the moonlit closing frame.

## Comparison history

1. P2 — Direct gallery navigation inherited zero-opacity GSAP styles. Fixed by removing the conflicting entrance animation; fresh-session evidence showed opacity `1` and a visible five-card stack.
2. P2 — At 633px, the fixed route rail approached the gallery’s right-arrow hit area. Fixed by switching the gallery heading/controls to a vertical layout below 700px and reserving rail clearance.
3. Post-fix evidence — Final 1280 × 720 capture showed zero horizontal overflow, `#gallery` in the URL, “Go to Gallery section” active, and no browser console errors.
4. P2 — The initial story build queried `.story-scene:first-child`, but the persistent progress element was the first child, producing a missing-target GSAP warning. Fixed by resolving the first story scene from the measured scene collection and conditionally animating its copy node.
5. Post-fix evidence — Fresh tab 10 loaded all five of five story images, reported zero horizontal overflow, retained “Go to Our story section” as the active route across the pinned journey and produced no browser warnings or errors.
6. P2 — The supplied logo carried a black rectangle that visibly conflicted with the transparent navbar and surrounding footer color. A strict ImageGen extraction was rejected because it altered the artwork and introduced a glow. The final asset was instead derived from the supplied pixels with a real alpha channel, preserving the original identity.
7. Post-fix evidence — Fresh tab 11 at 1280 × 720 and 513 × 884 showed the transparent gold mark blending directly over the hero photograph and footer surface, with no rectangle, crop, overflow or illegible lettering.

## Functional and quality checks

- Primary navigation scrolls to the correct sections.
- Every route stop updates the URL fragment, scrolls smoothly and becomes the active `aria-current` location.
- Cursor follows pointer movement with GSAP quick setters and changes label/state over route links, gallery cards and primary CTAs.
- Five story scenes load successfully, reveal in the intended order and release the sticky stage into the existing rooms section.
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

## Stay page QA

### Comparison set

- Source visual truth: `/Users/sumangaldey/.codex/generated_images/01a07f2f-936d-7151-ab53-0b40e43d1d76/exec-ee82fa6e-5ef7-4273-8e08-ff5db535a4e8.png`, the selected Imperial Satyendra ivory editorial direction used by the homepage.
- Source pixels: 793 × 1981.
- Implementation: `http://localhost:3000/stay` in Codex in-app Browser tab 11.
- Implementation evidence: desktop captures at `1280 × 720` and mobile captures at an effective `354 × 844` CSS viewport, device density 1.
- States captured: hero after entrance motion, guest-choice grid, pinned afternoon story frame, stacked gallery before and after next-image interaction, FAQ closed and expanded, enquiry CTA, full form, success state, and mobile gallery layout.
- Normalization: this is an extension of the selected visual system rather than a pixel clone of an existing Stay screen. Comparison therefore uses the same editorial hierarchy, palette, photographic language, spacing rhythm, image stacking and motion behavior at matching desktop and mobile densities.

### Findings

- No P0, P1 or P2 findings remain.
- P3 follow-up: replace the neutral room-use categories with confirmed room names, sizes, occupancy and facilities when the client supplies them. The current page deliberately avoids presenting unverified inventory as fact.

### Required fidelity surfaces

- Fonts and typography: Cormorant Garamond remains the display face and Manrope remains the plain body face. Desktop and mobile captures preserve clear heading hierarchy, readable line lengths and simple language without truncation.
- Spacing and layout rhythm: desktop uses the established editorial grid and large section breathing room. Mobile collapses every split layout to one column, reports zero horizontal overflow and reserves space beside the fixed route rail.
- Colors and visual tokens: existing ivory, paper, ink and antique-gold tokens are reused. Dark room-choice and photo-story sections preserve the homepage rhythm and maintain text contrast.
- Image quality and asset fidelity: five new 1536 × 1024 supporting photographs and one 1855 × 848 hero share the same ivory, walnut, gold and arched-room language. Crops remain useful at both tested breakpoints; no placeholder or CSS-drawn imagery is present.
- Copy and content: the page uses clear search language such as “hotel rooms in Patna”, “family stays” and “work trips”. Prices, room measurements, facility claims and booking promises are omitted until verified.
- Icons and states: Phosphor icons match the existing thin-line icon system. Gallery controls, FAQ expansion, form fields, modal close behavior and success state were exercised in the browser.

### Full-view and focused evidence

- Full-view: the Stay hero matches the source’s full-bleed photography, serif-led hierarchy, gold microcopy and restrained navigation while presenting a distinct room-focused subject.
- Choice grid: one large and two supporting photo cards translate the source’s layered room montage into clear guest needs without generic UI-card styling.
- Scroll story: the captured afternoon frame confirms full-bleed image quality, readable glass-dark copy surface, upward scene transition and gold progress indicator.
- Gallery: the active room and bathroom captures confirm correct perspective stacking, image order, control state and counter update from `01 / 04` to `02 / 04`.
- Responsive: the mobile choice and details captures show no horizontal overflow, no clipped controls and adequate clearance between readable copy and the route rail.
- Conversion: the room enquiry opens from the final CTA, fits the desktop viewport, exposes labelled fields, prevents empty submission and reaches a clear local success state.

### Comparison history

1. P2 — At 1280 × 720, the first hero version used a fixed 940px height, placing the primary room CTA below the first fold. Fixed by using a `100svh` hero with a 720px minimum. Post-fix capture shows the complete heading, description and both actions.
2. P2 — At the mobile details anchor, the fixed route rail covered the final words of the descriptive paragraph. Fixed by reserving right padding for details and FAQ copy below 620px. Post-fix capture shows the paragraph fully readable beside the rail.
3. P2 — The first enquiry layout required scrolling before its submit action was visible at 1280 × 720. Fixed by reducing only the Stay form’s vertical padding, heading size and control spacing. Post-fix capture shows the complete form and submit button in one view.
4. Post-fix evidence — Browser console warnings/errors: none. Gallery counter changed correctly, FAQ expanded, test submission reached the local success state, and effective 354px mobile viewport reported `scrollWidth === innerWidth`.

### Functional and technical checks

- `/stay` is statically generated with a unique canonical title, description, keywords, Open Graph data and Twitter image.
- Hotel, breadcrumb and FAQ JSON-LD are present and avoid unverified room details.
- `/stay` and all six Stay photographs are included in `sitemap.xml`.
- Homepage desktop, footer and mobile-menu Stay links now open `/stay`.
- Reduced-motion users receive a normal stacked story instead of a pinned animated sequence.
- ESLint passes, production build passes and the route appears in the static build output.

## Celebrate page QA

### Comparison set

- Visual source truth: `/Users/sumangaldey/.codex/generated_images/01a07f2f-936d-7151-ab53-0b40e43d1d76/exec-9f4d1b57-2d1d-4470-bd15-b43dd0316b28.png`, the selected option 1 ivory celebration journey.
- Implementation: `http://localhost:3001/celebrate?qa=final` in the Codex in-app Browser.
- Implementation evidence: desktop review at `1440 × 1000` and mobile review at `390 × 844`, with the source and implementation compared for hierarchy, palette, photography, editorial rhythm, image stacking and scroll storytelling.
- States checked: hero after entrance motion, all four story chapters, gallery before and after navigation, FAQ expanded, mobile menu open, enquiry form validation, and local success state.

### Findings

- No P0, P1 or P2 visual or functional findings remain.
- P3 launch follow-up: replace the local demonstration submission with the client's enquiry service and add verified telephone, address and capacity details when supplied.

### Visual and interaction match

- The source's ivory editorial mood is carried into a full-screen wedding arrival, quiet paper sections, a central gold story thread, alternating photography and a dark closing enquiry scene.
- Five new photographs form one coherent celebration from planning and family arrival through the ceremony and night reception. They are purpose-generated assets, not reused homepage photographs.
- The story chapters reveal on scroll, while reduced-motion users receive a stable stacked layout.
- The gallery uses five layered photo cards with working previous, next and direct-select controls. A conflicting card entrance animation found during QA was removed so direct section navigation never leaves the images hidden.
- Desktop navigation, mobile menu, fixed route rail, custom cursor states, FAQ accordion and enquiry modal follow the existing Imperial Satyendra interaction language.
- Both tested viewports have no horizontal overflow. Typography, button sizing, image crops and route-rail clearance remain readable on mobile.

### Functional and technical checks

- All fourteen rendered images report successful natural dimensions after the lazy-loaded sections enter the viewport.
- The enquiry form enforces its required fields and reaches the intended local success state with test data.
- The canonical URL resolves to `https://www.imperialsatyendra.com/celebrate`.
- Event venue, breadcrumb and FAQ structured data are included without invented contact, pricing or capacity claims.
- `/celebrate` and its five JPEG photographs are included in `sitemap.xml`; navigation links from the homepage and Stay page point to the new route.
- Browser console warnings/errors: none.
- ESLint passes.
- Production build passes and statically generates `/`, `/stay`, `/celebrate`, `/robots.txt` and `/sitemap.xml`.

final result: passed
