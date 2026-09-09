"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bed,
  Briefcase,
  CheckCircle,
  Diamond,
  List,
  MoonStars,
  Sun,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra-imperial-logo.png";

const stayRoute = [
  ["stay-top", "Rooms"],
  ["stay-welcome", "Welcome"],
  ["stay-choices", "Choose"],
  ["stay-day", "Your day"],
  ["stay-details", "Details"],
  ["stay-faq", "Questions"],
  ["stay-enquire", "Enquire"],
];

const gallery = [
  ["/images/stay-hero-room.png", "Spacious hotel room with a king bed and seating area in Patna"],
  ["/images/stay-bathroom.png", "Clean hotel bathroom with a walk-in shower and stone vanity"],
  ["/images/stay-workspace.png", "Quiet desk and work area inside an Imperial Satyendra guest room"],
  ["/images/stay-breakfast.png", "Indian breakfast served beside the window of a hotel room in Patna"],
];

export default function StayPage() {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.from(".stay-hero-kicker, .stay-hero-title span, .stay-hero-copy, .stay-hero-actions", {
        y: 45,
        opacity: 0,
        duration: 1.1,
        stagger: 0.11,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.to(".stay-hero-media", {
        scale: 1.09,
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: ".stay-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-stay-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 58,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stay-choice-card").forEach((card, index) => {
        gsap.from(card, {
          y: 90 + index * 25,
          rotate: index === 1 ? 2.5 : index === 2 ? 4 : -3,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stay-choice-grid", start: "top 82%", once: true },
        });
      });

      const scenes = gsap.utils.toArray<HTMLElement>(".stay-day-scene");
      gsap.set(scenes, { zIndex: (index) => index + 1 });
      gsap.set(scenes.slice(1), { clipPath: "inset(100% 0 0 0)", scale: 1.05 });
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: ".stay-day-journey", start: "top top", end: "bottom bottom", scrub: 1 },
      });
      scenes.slice(1).forEach((scene, index) => {
        timeline
          .to(scene, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1, ease: "none" }, index)
          .from(scene.querySelector(".stay-day-copy"), { y: 44, opacity: 0, duration: 0.35 }, index + 0.3);
      });
      gsap.to(".stay-day-progress span", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".stay-day-journey", start: "top top", end: "bottom bottom", scrub: true },
      });
    }, root);

    return () => {
      context.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || enquiryOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setEnquiryOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen, enquiryOpen]);

  useEffect(() => {
    const update = () => {
      const readingLine = window.innerHeight * 0.46;
      let current = 0;
      stayRoute.forEach(([id], index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = index;
      });
      setActiveSection((previous) => previous === current ? previous : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
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
    const move = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      cursorNode.classList.add("visible");
    };
    const updateMode = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null;
      const label = target?.dataset.cursor ?? (target ? "Select" : "");
      labelNode.textContent = label;
      cursorNode.classList.toggle("interactive", Boolean(target));
      cursorNode.classList.toggle("labelled", Boolean(label));
    };
    const hide = () => cursorNode.classList.remove("visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", updateMode, { passive: true });
    document.addEventListener("pointerout", updateMode, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", updateMode);
      document.removeEventListener("pointerout", updateMode);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  const nextImage = (direction: number) => {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);
  };

  return (
    <div ref={root} className="site-shell stay-page">
      <div ref={cursor} className="custom-cursor" aria-hidden="true">
        <ArrowUpRight size={15} weight="bold" />
        <span ref={cursorLabel} />
      </div>

      <nav className="scroll-route stay-route" aria-label="Stay page journey">
        <div className="scroll-route-track" aria-hidden="true">
          <span style={{ height: `${(activeSection / (stayRoute.length - 1)) * 100}%` }} />
        </div>
        {stayRoute.map(([id, label], index) => (
          <a key={id} href={`#${id}`} className={activeSection === index ? "active" : ""}
            aria-label={`Go to ${label} section`} aria-current={activeSection === index ? "location" : undefined} data-cursor="Go">
            <Diamond size={activeSection === index ? 11 : 7} weight={activeSection === index ? "fill" : "regular"} />
            <span className="route-number">{String(index).padStart(2, "0")}</span>
            <span className="route-label">{label}</span>
          </a>
        ))}
      </nav>

      <a className="skip-link" href="#stay-main">Skip to content</a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className="nav-active" href="/stay">Stay</Link>
          <Link href="/#celebrate">Celebrate</Link>
          <Link href="/#dine">Dine</Link>
          <Link href="/#gallery">Gallery</Link>
        </nav>
        <div className="header-actions">
          <button className="text-button" data-cursor="Open" onClick={() => setEnquiryOpen(true)}>Ask about rooms</button>
          <button className="menu-button" data-cursor="Menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light" /></button>
        </div>
      </header>

      <main id="stay-main">
        <section className="stay-hero" id="stay-top" aria-labelledby="stay-title">
          <Image className="stay-hero-media" src="/images/stay-hero-room.png" alt="Comfortable hotel room with a king bed at Imperial Satyendra in Patna" fill sizes="100vw" priority />
          <div className="stay-hero-shade" />
          <div className="stay-hero-content">
            <p className="eyebrow light stay-hero-kicker">Hotel rooms in Patna</p>
            <h1 id="stay-title" className="stay-hero-title"><span>A comfortable room.</span><span>A quieter day.</span></h1>
            <p className="stay-hero-copy">Rest in a calm room made for couples, families and people visiting Patna for work. Tell us what you need and our team will help you choose.</p>
            <div className="stay-hero-actions">
              <button className="primary-button" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Ask about rooms <ArrowRight size={18} /></button>
              <a className="circle-link" href="#stay-welcome" aria-label="Explore rooms"><ArrowDown size={20} /></a>
            </div>
          </div>
          <p className="stay-hero-note">Imperial Satyendra · Patna, Bihar</p>
        </section>

        <section className="stay-welcome section-pad" id="stay-welcome">
          <div className="stay-welcome-copy" data-stay-reveal>
            <p className="eyebrow">A simple promise</p>
            <h2>Rest well.<br />Wake ready.</h2>
          </div>
          <div className="stay-welcome-text" data-stay-reveal>
            <p>A good hotel room should make your day easier. It should give you a clean place to rest, enough room for your things and a team you can speak to when you need help.</p>
            <p>Imperial Satyendra welcomes people visiting Patna for family time, celebrations, work and short breaks.</p>
          </div>
        </section>

        <section className="stay-choices section-pad" id="stay-choices" aria-labelledby="stay-choice-title">
          <div className="stay-section-head" data-stay-reveal>
            <p className="eyebrow">Choose by need</p>
            <h2 id="stay-choice-title">What brings you<br />to Patna?</h2>
            <p>You do not need to know a room name. Start with the kind of stay you are planning.</p>
          </div>
          <div className="stay-choice-grid">
            <article className="stay-choice-card stay-choice-large">
              <Image src="/images/stay-hero-room.png" alt="Room for two with a king bed and seating area" fill sizes="(max-width: 800px) 90vw, 48vw" />
              <div className="stay-choice-shade" />
              <div className="stay-choice-copy"><Bed size={25} weight="thin" /><span>Rooms for two</span><h3>Time to rest together.</h3><button onClick={() => setEnquiryOpen(true)}>Ask our team <ArrowRight size={16} /></button></div>
            </article>
            <article className="stay-choice-card">
              <Image src="/images/stay-family-room.png" alt="Indian family settling into a comfortable hotel room in Patna" fill sizes="(max-width: 800px) 90vw, 36vw" />
              <div className="stay-choice-shade" />
              <div className="stay-choice-copy"><UsersThree size={25} weight="thin" /><span>Family stays</span><h3>Stay close to the people you came with.</h3><button onClick={() => setEnquiryOpen(true)}>Plan a family stay <ArrowRight size={16} /></button></div>
            </article>
            <article className="stay-choice-card">
              <Image src="/images/stay-workspace.png" alt="Hotel room workspace for a business trip in Patna" fill sizes="(max-width: 800px) 90vw, 36vw" />
              <div className="stay-choice-shade" />
              <div className="stay-choice-copy"><Briefcase size={25} weight="thin" /><span>Work trips</span><h3>A quiet place to work and sleep.</h3><button onClick={() => setEnquiryOpen(true)}>Ask about a work stay <ArrowRight size={16} /></button></div>
            </article>
          </div>
        </section>

        <section className="stay-day" id="stay-day" aria-labelledby="stay-day-title">
          <div className="stay-day-intro section-pad" data-stay-reveal>
            <p className="eyebrow">From morning to night</p>
            <h2 id="stay-day-title">Your room through<br />the day.</h2>
            <p>Breakfast by the window, a quiet hour for work and a comfortable bed when the day is done.</p>
          </div>
          <div className="stay-day-journey">
            <div className="stay-day-pin">
              <div className="stay-day-progress" aria-hidden="true"><span /></div>
              <article className="stay-day-scene">
                <Image src="/images/stay-breakfast.png" alt="Indian breakfast served in a hotel room in Patna" fill sizes="100vw" />
                <div className="stay-day-copy"><Sun size={24} weight="thin" /><p>01 · Morning</p><h3>Start slowly.</h3><span>Ask our team about breakfast and meal options for your stay.</span></div>
              </article>
              <article className="stay-day-scene stay-day-right">
                <Image src="/images/stay-workspace.png" alt="Desk for working inside a comfortable hotel room" fill sizes="100vw" />
                <div className="stay-day-copy"><Briefcase size={24} weight="thin" /><p>02 · Afternoon</p><h3>Make time for work.</h3><span>A separate desk gives you a clear place for calls, notes and planning.</span></div>
              </article>
              <article className="stay-day-scene">
                <Image src="/images/stay-evening-room.png" alt="Hotel room prepared for a peaceful night in Patna" fill sizes="100vw" />
                <div className="stay-day-copy"><MoonStars size={24} weight="thin" /><p>03 · Night</p><h3>Come back to calm.</h3><span>Close the door, put the day down and settle in for the night.</span></div>
              </article>
            </div>
          </div>
        </section>

        <section className="stay-details section-pad" id="stay-details">
          <div className="stay-detail-copy" data-stay-reveal>
            <p className="eyebrow">See the room</p>
            <h2>Small details make<br />a stay easier.</h2>
            <p>Look through the sleeping area, bathroom, work space and breakfast setting. Exact room features can differ, so our team will confirm what is available before you book.</p>
            <div className="stay-gallery-controls">
              <button data-cursor="Previous" onClick={() => nextImage(-1)} aria-label="Previous room photograph"><ArrowLeft size={19} /></button>
              <span>{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
              <button data-cursor="Next" onClick={() => nextImage(1)} aria-label="Next room photograph"><ArrowRight size={19} /></button>
            </div>
          </div>
          <div className="stay-gallery-stage" aria-live="polite">
            {gallery.map(([src, alt], index) => {
              const offset = (index - activeImage + gallery.length) % gallery.length;
              return <button key={src} className={`stay-gallery-card stay-offset-${offset}`} onClick={() => setActiveImage(index)} data-cursor="View" aria-label={`View photograph ${index + 1}: ${alt}`}>
                <Image src={src} alt={alt} fill sizes="(max-width: 850px) 82vw, 47vw" />
              </button>;
            })}
          </div>
        </section>

        <section className="stay-faq section-pad" id="stay-faq">
          <div className="stay-faq-head" data-stay-reveal><p className="eyebrow">Before you book</p><h2>Simple questions.<br />Clear answers.</h2></div>
          <div className="stay-faq-list" data-stay-reveal>
            <details><summary>How do I choose the right room?<span>+</span></summary><p>Tell us how many people are staying and why you are visiting Patna. Our team will explain the suitable room options.</p></details>
            <details><summary>Can I ask about a family stay?<span>+</span></summary><p>Yes. Share the number of adults and children in your group. We will confirm the room setup available for your dates.</p></details>
            <details><summary>Can wedding guests stay together?<span>+</span></summary><p>You can ask about rooms for a wedding group. Please share the dates and expected number of guests so the team can guide you.</p></details>
            <details><summary>Where can I confirm facilities and meal options?<span>+</span></summary><p>Use the enquiry form or speak with the hotel team. They will confirm current room facilities, food options and any special request before booking.</p></details>
          </div>
        </section>

        <section className="stay-enquire" id="stay-enquire">
          <Image src="/images/stay-evening-room.png" alt="Warm and comfortable hotel room at night" fill sizes="100vw" />
          <div className="stay-enquire-shade" />
          <div className="stay-enquire-copy" data-stay-reveal>
            <p className="eyebrow light">Plan your stay in Patna</p>
            <h2>Tell us what<br />you need.</h2>
            <p>Share your dates, guest count and reason for visiting. Our team will help you with the next step.</p>
            <button className="primary-button gold" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Ask about rooms <ArrowRight size={18} /></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><Link href="/"><Image src={logo} alt="Imperial Satyendra" /></Link><p>Stay beautifully. Celebrate grandly.</p></div>
        <div className="footer-links"><Link href="/stay">Stay</Link><Link href="/#celebrate">Celebrate</Link><Link href="/#dine">Dine</Link><Link href="/#gallery">Gallery</Link></div>
        <p className="footer-location">Patna, Bihar, India</p>
        <p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p>
      </footer>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
        <nav><Link href="/stay" onClick={() => setMenuOpen(false)}>Stay</Link><Link href="/#celebrate">Celebrate</Link><Link href="/#dine">Dine</Link><Link href="/#gallery">Gallery</Link></nav>
        <button className="primary-button gold" onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}>Ask about rooms</button>
      </div>

      <div className={`enquiry-overlay ${enquiryOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Ask about hotel rooms in Patna">
        <button className="close-dialog" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }} aria-label="Close enquiry"><X size={24} /></button>
        {submitted ? <div className="success-state">
          <CheckCircle size={48} weight="thin" /><p className="eyebrow">Thank you</p><h2>We have your room request.</h2>
          <p>Your enquiry has been noted in this preview. Connect the live booking service before launch to receive submissions.</p>
          <button className="primary-button" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }}>Return to rooms</button>
        </div> : <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); }}>
          <p className="eyebrow">Room enquiry</p><h2>Tell us about your stay.</h2>
          <label>Name<input required name="name" autoComplete="name" /></label>
          <label>Phone number<input required type="tel" name="phone" autoComplete="tel" /></label>
          <div className="stay-form-row"><label>Arrival date<input required type="date" name="arrival" /></label><label>Guests<select name="guests" defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4+">4 or more</option></select></label></div>
          <label>Reason for your stay<select name="stayType" defaultValue="couple"><option value="couple">Stay for two</option><option value="family">Family stay</option><option value="work">Work trip</option><option value="wedding">Wedding group</option></select></label>
          <label>Anything else we should know?<textarea name="message" rows={3} /></label>
          <button className="primary-button" type="submit">Send room enquiry <ArrowRight size={18} /></button>
          <small>Demo form — connect the hotel booking service before launch.</small>
        </form>}
      </div>
    </div>
  );
}
