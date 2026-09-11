"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarBlank, CheckCircle, Diamond, List, MapPin, Quotes, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra-imperial-logo.png";

const gallery = [
  ["/images/imperial-arrival-hall.png", "Grand arched arrival hall at Imperial Satyendra"],
  ["/images/imperial-suite.png", "Warm and spacious luxury suite in Patna"],
  ["/images/imperial-celebration.png", "Floral wedding celebration courtyard in Patna"],
  ["/images/imperial-dining.png", "Elegant all-day dining restaurant at Imperial Satyendra"],
  ["/images/imperial-corridor.png", "Ivory arched corridor with warm evening light"],
];

const scrollRoute = [
  ["top", "Arrival"],
  ["arrival", "Welcome"],
  ["story", "Our story"],
  ["stay", "Stay"],
  ["celebrate", "Celebrate"],
  ["dine", "Dine"],
  ["gallery", "Gallery"],
  ["patna", "Patna"],
  ["enquire", "Invitation"],
];

export default function ImperialHome() {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title span, .hero-copy, .hero-actions", {
        y: 44, opacity: 0, duration: 1.15, stagger: 0.12, ease: "power3.out", delay: 0.25,
      });
      gsap.to(".hero-media", {
        scale: 1.08, yPercent: 7, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true },
        });
      });
      gsap.from(".arrival-frame", {
        clipPath: "inset(22% 18% 18% 18% round 18rem 18rem 0 0)", scale: 0.9,
        scrollTrigger: { trigger: ".arrival", start: "top 75%", end: "center 55%", scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>(".room-card").forEach((card, index) => {
        gsap.fromTo(card,
          { y: 120 + index * 35, rotate: index % 2 ? 5 : -5, opacity: 0.25 },
          {
            y: 0, rotate: index % 2 ? 1.5 : -1.5, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".rooms-stack", start: `top ${82 - index * 9}%`, end: "bottom 75%", scrub: 1 }
          },
        );
      });

      const storyScenes = gsap.utils.toArray<HTMLElement>(".story-scene");
      gsap.set(storyScenes, { zIndex: (index) => index + 1 });
      gsap.set(storyScenes.slice(1), { clipPath: "inset(100% 0 0 0)", scale: 1.06 });
      const firstStoryCopy = storyScenes[0]?.querySelector(".story-copy");
      if (firstStoryCopy) {
        gsap.from(firstStoryCopy, {
          y: 45, opacity: 0, duration: 1,
          scrollTrigger: { trigger: ".story-journey", start: "top 75%", once: true },
        });
      }
      const storyTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".story-journey", start: "top top", end: "bottom bottom", scrub: 1 },
      });
      storyScenes.slice(1).forEach((scene, index) => {
        storyTimeline
          .to(scene, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1, ease: "none" }, index)
          .from(scene.querySelector(".story-copy"), { y: 48, opacity: 0, duration: 0.38, ease: "power2.out" }, index + 0.28);
      });
      gsap.to(".story-progress span", {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".story-journey", start: "top top", end: "bottom bottom", scrub: true },
      });
    }, root);

    return () => { ctx.revert(); gsap.ticker.remove(ticker); lenis.destroy(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || enquiryOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setEnquiryOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen, enquiryOpen]);

  useEffect(() => {
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.46;
      let current = 0;
      scrollRoute.forEach(([id], index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = index;
      });
      setActiveSection((previous) => previous === current ? previous : current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const cursorNode = cursor.current;
    const labelNode = cursorLabel.current;
    const canUseCursor = window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursorNode || !labelNode || !canUseCursor) return;

    document.documentElement.classList.add("has-custom-cursor");
    const moveX = gsap.quickTo(cursorNode, "x", { duration: 0.22, ease: "power3.out" });
    const moveY = gsap.quickTo(cursorNode, "y", { duration: 0.22, ease: "power3.out" });

    const moveCursor = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      cursorNode.classList.add("visible");
    };
    const updateCursorMode = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null;
      const label = target?.dataset.cursor ?? (target ? "Select" : "");
      labelNode.textContent = label;
      cursorNode.classList.toggle("interactive", Boolean(target));
      cursorNode.classList.toggle("labelled", Boolean(label));
    };
    const hideCursor = () => cursorNode.classList.remove("visible");

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", updateCursorMode, { passive: true });
    document.addEventListener("pointerout", updateCursorMode, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", updateCursorMode);
      document.removeEventListener("pointerout", updateCursorMode);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  const nextImage = (direction: number) => {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);
  };

  return (
    <div ref={root} className="site-shell">
      <div ref={cursor} className="custom-cursor" aria-hidden="true">
        <ArrowUpRight size={15} weight="bold" />
        <span ref={cursorLabel} />
      </div>
      <nav className="scroll-route" aria-label="Page journey">
        <div className="scroll-route-track" aria-hidden="true">
          <span style={{ height: `${(activeSection / (scrollRoute.length - 1)) * 100}%` }} />
        </div>
        {scrollRoute.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === index ? "active" : ""}
            aria-label={`Go to ${label} section`}
            aria-current={activeSection === index ? "location" : undefined}
            data-cursor="Go"
          >
            <Diamond size={activeSection === index ? 11 : 7} weight={activeSection === index ? "fill" : "regular"} />
            <span className="route-number">{String(index).padStart(2, "0")}</span>
            <span className="route-label">{label}</span>
          </a>
        ))}
      </nav>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/stay">Stay</a><a href="/celebrate">Celebrate</a><a href="/dine">Dine</a><a href="#gallery">Gallery</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" data-cursor="Open" onClick={() => setEnquiryOpen(true)}>Enquire</button>
          <button className="menu-button" data-cursor="Menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light" /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image className="hero-media" src="/images/imperial-courtyard-day.png" alt="Grand ivory courtyard of Imperial Satyendra hotel in Patna" fill sizes="100vw" priority />
          <div className="hero-wash" />
          <div className="hero-content">
            <p className="eyebrow hero-kicker">Patna · Bihar · India</p>
            <h1 id="hero-title" className="hero-title"><span>Arrive as a guest.</span><span>Leave with a story.</span></h1>
            <p className="hero-copy">A new expression of gracious hospitality—crafted for unhurried stays, luminous celebrations and moments that deserve to feel imperial.</p>
            <div className="hero-actions">
              <button className="primary-button" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Plan your stay <ArrowRight size={18} /></button>
              <a className="circle-link" href="#arrival" aria-label="Explore Imperial Satyendra"><ArrowDown size={20} /></a>
            </div>
          </div>
          <p className="hero-note">A landmark in the making</p>
        </section>

        <section className="arrival section-pad" id="arrival">
          <div className="section-intro centered" data-reveal>
            <p className="eyebrow">The arrival</p>
            <h2>Patna, welcomed<br />with new grandeur.</h2>
            <p>Rooted in Bihar&apos;s generous spirit and shaped with a contemporary eye, Imperial Satyendra turns every arrival into a sense of occasion.</p>
          </div>
          <div className="arrival-frame">
            <Image src="/images/imperial-arrival-hall.png" alt="Sunlit arched lobby and lounge at Imperial Satyendra" fill sizes="(max-width: 800px) 88vw, 58vw" />
            <div className="image-caption"><span>01</span> A warm welcome, beautifully composed</div>
          </div>
        </section>

        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-intro section-pad" data-reveal>
            <p className="eyebrow">The Imperial rhythm</p>
            <h2 id="story-title">One stay.<br />Five moments.</h2>
            <p>Move through a day shaped by thoughtful service, beautiful spaces and the generous spirit of Patna.</p>
          </div>
          <div className="story-journey">
            <div className="story-pin">
              <div className="story-progress" aria-hidden="true"><span /></div>

              <article className="story-scene align-right">
                <Image src="/images/story-morning-suite.png" alt="Indian couple enjoying breakfast in a sunlit Imperial Satyendra suite" fill sizes="100vw" />
                <div className="story-copy">
                  <p className="story-index">01 · Morning</p>
                  <h3>Wake slowly.</h3>
                  <p>Spacious rooms, natural light and quiet corners create a restorative stay for couples, families and business travellers visiting Patna.</p>
                  <span>Rooms & suites</span>
                </div>
              </article>

              <article className="story-scene align-left">
                <Image src="/images/story-welcome-family.png" alt="Hotel host welcoming a multigenerational Indian family in the grand lobby" fill sizes="100vw" />
                <div className="story-copy">
                  <p className="story-index">02 · Welcome</p>
                  <h3>Feel expected.</h3>
                  <p>From a smooth family arrival to local guidance for exploring Bihar’s capital, service is warm, personal and naturally attentive.</p>
                  <span>Patna hospitality</span>
                </div>
              </article>

              <article className="story-scene align-left">
                <Image src="/images/story-afternoon-dining.png" alt="Chef finishing a contemporary Indian dish at Imperial Satyendra" fill sizes="100vw" />
                <div className="story-copy">
                  <p className="story-index">03 · Afternoon</p>
                  <h3>Taste the craft.</h3>
                  <p>Contemporary Indian cooking and familiar favourites come together for elegant lunches, family tables and private dining in Patna.</p>
                  <span>Restaurant & dining</span>
                </div>
              </article>

              <article className="story-scene align-left">
                <Image src="/images/story-wedding-arrival.png" alt="Bride arriving with family at an elegant courtyard wedding in Patna" fill sizes="100vw" />
                <div className="story-copy">
                  <p className="story-index">04 · Golden hour</p>
                  <h3>Make it yours.</h3>
                  <p>Versatile celebration spaces and considered planning support ceremonies, receptions and destination weddings rooted in family tradition.</p>
                  <span>Weddings & events</span>
                </div>
              </article>

              <article className="story-scene align-right story-night">
                <Image src="/images/story-moonlit-balcony.png" alt="Guest overlooking the moonlit Imperial Satyendra courtyard at night" fill sizes="100vw" />
                <div className="story-copy">
                  <p className="story-index">05 · Night</p>
                  <h3>Hold onto the feeling.</h3>
                  <p>When the celebration softens and Patna settles into the evening, calm spaces invite you to linger for one more unhurried moment.</p>
                  <span>The day, beautifully complete</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="rooms section-pad" id="stay">
          <div className="rooms-heading" data-reveal>
            <p className="eyebrow">Rooms & suites</p>
            <h2>Space to exhale.<br />Details to remember.</h2>
            <p>Calm palettes, tactile finishes and considered comfort create an elegant base for business visits, family stays and weekends in Patna.</p>
          </div>
          <div className="rooms-stack">
            <article className="room-card room-card-wide">
              <Image src="/images/imperial-suite.png" alt="Elegant king suite with warm natural light" fill sizes="70vw" />
              <div className="card-copy"><span>Signature stay</span><h3>The Imperial Suite</h3></div>
            </article>
            <article className="room-card room-card-tall">
              <Image src="/images/imperial-suite-lounge.png" alt="Private lounge inside a luxury suite" fill sizes="35vw" />
              <div className="card-copy"><span>Room to linger</span><h3>Private Lounge</h3></div>
            </article>
            <div className="rooms-seal" aria-hidden="true"><span>IS</span><small>Patna</small></div>
          </div>
        </section>

        <section className="celebrate" id="celebrate" aria-labelledby="celebrate-title">
          <Image src="/images/imperial-celebration.png" alt="An elegant floral wedding celebration in the hotel courtyard" fill sizes="100vw" />
          <div className="celebrate-shade" />
          <div className="celebrate-copy" data-reveal>
            <p className="eyebrow light">Weddings & celebrations</p>
            <h2 id="celebrate-title">For the day<br />everyone remembers.</h2>
            <p>From intimate rituals to magnificent receptions, discover a wedding venue in Patna designed for heartfelt traditions and unforgettable photographs.</p>
            <button className="outline-button light" data-cursor="Plan" onClick={() => setEnquiryOpen(true)}>Begin planning <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="dining section-pad" id="dine">
          <div className="dining-image" data-reveal>
            <Image src="/images/imperial-dining.png" alt="Refined restaurant with arched windows and elegant tables" fill sizes="(max-width: 900px) 90vw, 56vw" />
            <div className="dining-number">03</div>
          </div>
          <div className="dining-copy" data-reveal>
            <p className="eyebrow">Dining</p><h2>Flavours that feel familiar. Plates that feel new.</h2>
            <p>Thoughtful Indian and global cuisine meets warm, intuitive service—whether it is a celebratory dinner, an easy breakfast or a long table with family.</p>
            <button className="inline-link" data-cursor="Reserve" onClick={() => setEnquiryOpen(true)}>Reserve a table <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="quote-band"><Quotes size={32} weight="thin" /><blockquote data-reveal>Luxury is not how much you add.<br />It is how deeply you make someone feel at home.</blockquote></section>

        <section className="gallery section-pad" id="gallery">
          <div className="gallery-head" data-reveal>
            <div><p className="eyebrow">A closer look</p><h2>Scenes from<br />Imperial Satyendra.</h2></div>
            <div className="gallery-controls">
              <button data-cursor="Previous" onClick={() => nextImage(-1)} aria-label="Previous gallery image"><ArrowLeft size={20} /></button>
              <span>{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
              <button data-cursor="Next" onClick={() => nextImage(1)} aria-label="Next gallery image"><ArrowRight size={20} /></button>
            </div>
          </div>
          <div className="gallery-stage" aria-live="polite">
            {gallery.map(([src, alt], index) => {
              const offset = (index - activeImage + gallery.length) % gallery.length;
              return <button className={`gallery-card offset-${offset}`} data-cursor="View" key={src} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}: ${alt}`}>
                <Image src={src} alt={alt} fill sizes="(max-width: 760px) 76vw, 44vw" />
              </button>;
            })}
          </div>
        </section>

        <section className="patna-story section-pad" id="patna">
          <div className="patna-visual" data-reveal><Image src="/images/imperial-corridor.png" alt="Architectural corridor inspired by timeless Indian hospitality" fill sizes="(max-width: 800px) 86vw, 38vw" /></div>
          <div className="patna-copy" data-reveal>
            <p className="eyebrow">Hotel in Patna, Bihar</p><h2>At the heart of where Bihar is going.</h2>
            <p>Imperial Satyendra brings together modern comfort and a distinctly local warmth. Created for travellers exploring Patna, families gathering from across Bihar and hosts seeking an elevated celebration venue, the hotel is designed to make every occasion feel effortless.</p>
            <div className="patna-points"><span><MapPin size={20} /> Patna, Bihar</span><span><CalendarBlank size={20} /> Stays & occasions</span></div>
          </div>
        </section>

        <section className="finale" id="enquire">
          <Image src="/images/imperial-courtyard-night.png" alt="Imperial Satyendra hotel illuminated at blue hour" fill sizes="100vw" />
          <div className="finale-shade" />
          <div className="finale-copy" data-reveal>
            <p className="eyebrow light">Your invitation</p><h2>There is a story<br />waiting for you here.</h2>
            <p>Tell us what you are planning. We will help shape the beginning.</p>
            <button className="primary-button gold" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Enquire now <ArrowRight size={18} /></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><Image src={logo} alt="Imperial Satyendra" /><p>Stay beautifully. Celebrate grandly.</p></div>
        <div className="footer-links"><a href="/stay">Stay</a><a href="/celebrate">Celebrate</a><a href="/dine">Dine</a><a href="#gallery">Gallery</a></div>
        <p className="footer-location">Patna, Bihar, India</p>
        <p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p>
      </footer>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
        <nav>{[["Stay", "/stay"], ["Celebrate", "/celebrate"], ["Dine", "/dine"], ["Gallery", "#gallery"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <button className="primary-button gold" onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}>Make an enquiry</button>
      </div>

      <div className={`enquiry-overlay ${enquiryOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Plan your Imperial Satyendra visit">
        <button className="close-dialog" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }} aria-label="Close enquiry"><X size={24} /></button>
        {submitted ? <div className="success-state">
          <CheckCircle size={48} weight="thin" /><p className="eyebrow">Thank you</p><h2>Your story starts here.</h2>
          <p>Your enquiry has been noted in this preview. Connect the live booking endpoint before launch to receive submissions.</p>
          <button className="primary-button" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }}>Return to the hotel</button>
        </div> : <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); }}>
          <p className="eyebrow">Enquire</p><h2>What brings you to Imperial Satyendra?</h2>
          <label>Name<input required name="name" autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Planning for<select name="interest" defaultValue="stay"><option value="stay">A stay in Patna</option><option value="wedding">A wedding or celebration</option><option value="dining">A dining experience</option><option value="event">A private event</option></select></label>
          <label>Tell us a little more<textarea name="message" rows={3} /></label>
          <button className="primary-button" type="submit">Send enquiry <ArrowRight size={18} /></button>
          <small>Demo form — booking integration will be connected for launch.</small>
        </form>}
      </div>
    </div>
  );
}
