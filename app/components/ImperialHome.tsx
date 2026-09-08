"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarBlank, CheckCircle, List, MapPin, Quotes, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra_imperial_logo.jpeg";

const gallery = [
  ["/images/imperial-arrival-hall.png", "Grand arched arrival hall at Imperial Satyendra"],
  ["/images/imperial-suite.png", "Warm and spacious luxury suite in Patna"],
  ["/images/imperial-celebration.png", "Floral wedding celebration courtyard in Patna"],
  ["/images/imperial-dining.png", "Elegant all-day dining restaurant at Imperial Satyendra"],
  ["/images/imperial-corridor.png", "Ivory arched corridor with warm evening light"],
];

export default function ImperialHome() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
          { y: 0, rotate: index % 2 ? 1.5 : -1.5, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".rooms-stack", start: `top ${82 - index * 9}%`, end: "bottom 75%", scrub: 1 } },
        );
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

  const nextImage = (direction: number) => {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);
  };

  return (
    <div ref={root} className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#stay">Stay</a><a href="#celebrate">Celebrate</a><a href="#dine">Dine</a><a href="#gallery">Gallery</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => setEnquiryOpen(true)}>Enquire</button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light" /></button>
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
              <button className="primary-button" onClick={() => setEnquiryOpen(true)}>Plan your stay <ArrowRight size={18} /></button>
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
            <button className="outline-button light" onClick={() => setEnquiryOpen(true)}>Begin planning <ArrowRight size={17} /></button>
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
            <button className="inline-link" onClick={() => setEnquiryOpen(true)}>Reserve a table <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="quote-band"><Quotes size={32} weight="thin" /><blockquote data-reveal>Luxury is not how much you add.<br />It is how deeply you make someone feel at home.</blockquote></section>

        <section className="gallery section-pad" id="gallery">
          <div className="gallery-head" data-reveal>
            <div><p className="eyebrow">A closer look</p><h2>Scenes from<br />Imperial Satyendra.</h2></div>
            <div className="gallery-controls">
              <button onClick={() => nextImage(-1)} aria-label="Previous gallery image"><ArrowLeft size={20} /></button>
              <span>{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
              <button onClick={() => nextImage(1)} aria-label="Next gallery image"><ArrowRight size={20} /></button>
            </div>
          </div>
          <div className="gallery-stage" aria-live="polite">
            {gallery.map(([src, alt], index) => {
              const offset = (index - activeImage + gallery.length) % gallery.length;
              return <button className={`gallery-card offset-${offset}`} key={src} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}: ${alt}`}>
                <Image src={src} alt={alt} fill sizes="(max-width: 760px) 76vw, 44vw" />
              </button>;
            })}
          </div>
        </section>

        <section className="patna-story section-pad">
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
            <button className="primary-button gold" onClick={() => setEnquiryOpen(true)}>Enquire now <ArrowRight size={18} /></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><Image src={logo} alt="Imperial Satyendra" /><p>Stay beautifully. Celebrate grandly.</p></div>
        <div className="footer-links"><a href="#stay">Stay</a><a href="#celebrate">Celebrate</a><a href="#dine">Dine</a><a href="#gallery">Gallery</a></div>
        <p className="footer-location">Patna, Bihar, India</p>
        <p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p>
      </footer>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
        <nav>{[["Stay", "#stay"], ["Celebrate", "#celebrate"], ["Dine", "#dine"], ["Gallery", "#gallery"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
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
