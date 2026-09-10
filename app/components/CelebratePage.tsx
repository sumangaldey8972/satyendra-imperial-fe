"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  CheckCircle,
  Diamond,
  Heart,
  List,
  MapPin,
  Sparkle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra-imperial-logo.png";

const celebrateRoute = [
  ["celebrate-top", "Celebrate"],
  ["celebrate-plan", "Plan"],
  ["celebrate-story", "The day"],
  ["celebrate-gallery", "Moments"],
  ["celebrate-steps", "Steps"],
  ["celebrate-faq", "Questions"],
  ["celebrate-enquire", "Enquire"],
];

const story = [
  {
    number: "02",
    label: "Decoration",
    title: "A setting that feels like you.",
    copy: "Choose flowers, colours, seating and light with our team. We help turn the courtyard or hall into a setting that suits your family and your celebration.",
    image: "/images/celebrate-hero-arrival.jpg",
    alt: "Wedding flowers and a decorated courtyard at Imperial Satyendra in Patna",
  },
  {
    number: "03",
    label: "Family arrival",
    title: "A warm welcome for every guest.",
    copy: "Your family should feel comfortable from the moment they arrive. Our team can guide guests, help with rooms and keep the main moments running smoothly.",
    image: "/images/celebrate-family-arrival.jpg",
    alt: "Indian family welcomed at a wedding hotel in Patna",
  },
  {
    number: "04",
    label: "The ceremony",
    title: "Traditions, held with care.",
    copy: "From the mandap to the seating around it, each part is planned around your customs, your people and the way you want the day to feel.",
    image: "/images/celebrate-ceremony.jpg",
    alt: "Indian wedding ceremony in a flower-covered courtyard in Patna",
  },
  {
    number: "05",
    label: "Dinner and reception",
    title: "Good food. Easy conversation.",
    copy: "Bring everyone together around a meal. Ask our team about menu choices, service and a dinner layout that works for your guest list.",
    image: "/images/celebrate-reception-night.jpg",
    alt: "Candlelit Indian wedding reception dinner at Imperial Satyendra",
  },
];

const gallery = [
  ["/images/celebrate-hero-arrival.jpg", "A joyful wedding arrival at Imperial Satyendra"],
  ["/images/celebrate-planning.jpg", "A couple planning their wedding with the hotel team"],
  ["/images/celebrate-family-arrival.jpg", "Family members arriving for a wedding in Patna"],
  ["/images/celebrate-ceremony.jpg", "A flower-filled Indian wedding ceremony"],
  ["/images/celebrate-reception-night.jpg", "A candlelit wedding dinner in the courtyard"],
];

export default function CelebratePage() {
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
      gsap.from(".celebrate-hero-kicker, .celebrate-hero-title span, .celebrate-hero-copy, .celebrate-hero-actions", {
        y: 48,
        opacity: 0,
        duration: 1.15,
        stagger: 0.11,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.to(".celebrate-hero-media", {
        scale: 1.1,
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: ".celebrate-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-celebrate-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 58,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".celebrate-chapter").forEach((chapter, index) => {
        const media = chapter.querySelector(".celebrate-chapter-media");
        const copy = chapter.querySelector(".celebrate-chapter-copy");
        gsap.from(media, {
          clipPath: index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: chapter, start: "top 82%", end: "center 58%", scrub: 1 },
        });
        gsap.from(copy, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: chapter, start: "top 72%", once: true },
        });
      });
      gsap.to(".celebrate-thread-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".celebrate-story-list", start: "top center", end: "bottom center", scrub: true },
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
      celebrateRoute.forEach(([id], index) => {
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
    <div ref={root} className="site-shell celebrate-page">
      <div ref={cursor} className="custom-cursor" aria-hidden="true"><ArrowUpRight size={15} weight="bold" /><span ref={cursorLabel} /></div>

      <nav className="scroll-route celebrate-route" aria-label="Celebrate page journey">
        <div className="scroll-route-track" aria-hidden="true"><span style={{ height: `${(activeSection / (celebrateRoute.length - 1)) * 100}%` }} /></div>
        {celebrateRoute.map(([id, label], index) => (
          <a key={id} href={`#${id}`} className={activeSection === index ? "active" : ""} aria-label={`Go to ${label} section`} aria-current={activeSection === index ? "location" : undefined} data-cursor="Go">
            <Diamond size={activeSection === index ? 11 : 7} weight={activeSection === index ? "fill" : "regular"} />
            <span className="route-number">{String(index).padStart(2, "0")}</span><span className="route-label">{label}</span>
          </a>
        ))}
      </nav>

      <a className="skip-link" href="#celebrate-main">Skip to content</a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/stay">Stay</Link><Link className="nav-active" href="/celebrate">Celebrate</Link><Link href="/#dine">Dine</Link><Link href="/#gallery">Gallery</Link>
        </nav>
        <div className="header-actions">
          <button className="text-button" data-cursor="Plan" onClick={() => setEnquiryOpen(true)}>Plan your celebration</button>
          <button className="menu-button" data-cursor="Menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light" /></button>
        </div>
      </header>

      <main id="celebrate-main">
        <section className="celebrate-hero" id="celebrate-top" aria-labelledby="celebrate-title">
          <Image className="celebrate-hero-media" src="/images/celebrate-hero-arrival.jpg" alt="Grand Indian wedding arrival at Imperial Satyendra in Patna" fill sizes="100vw" priority />
          <div className="celebrate-hero-shade" />
          <div className="celebrate-hero-content">
            <p className="eyebrow light celebrate-hero-kicker">Wedding venue in Patna</p>
            <h1 id="celebrate-title" className="celebrate-hero-title"><span>A beautiful place</span><span>for your celebration.</span></h1>
            <p className="celebrate-hero-copy">Plan your wedding, reception or family event at Imperial Satyendra in Patna. Bring your people together in a setting made for happy moments.</p>
            <div className="celebrate-hero-actions">
              <button className="primary-button gold" data-cursor="Plan" onClick={() => setEnquiryOpen(true)}>Plan your celebration <ArrowRight size={18} /></button>
              <a className="circle-link" href="#celebrate-plan" aria-label="See how we plan celebrations"><ArrowDown size={20} /></a>
            </div>
          </div>
          <p className="celebrate-hero-note">Patna · Bihar · India</p>
        </section>

        <section className="celebrate-plan section-pad" id="celebrate-plan">
          <div className="celebrate-plan-copy" data-celebrate-reveal>
            <p className="eyebrow">Your celebration, our care</p>
            <h2>From the first plan<br />to the final farewell.</h2>
            <p>Planning a wedding can feel like a lot. Our team keeps each step clear. Tell us your date, guest count and the kind of function you want. We will help you understand the spaces, food and setup options.</p>
            <button className="inline-link" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Start a conversation <ArrowRight size={17} /></button>
          </div>
          <div className="celebrate-plan-image" data-celebrate-reveal><Image src="/images/celebrate-planning.jpg" alt="Couple discussing their wedding plan with the Imperial Satyendra team" fill sizes="(max-width: 900px) 90vw, 48vw" /></div>
          <div className="celebrate-plan-note" data-celebrate-reveal><span>01</span><p>Share your date, guest count and ideas. We will explain the next step in simple words.</p></div>
        </section>

        <section className="celebrate-story" id="celebrate-story" aria-labelledby="celebrate-story-title">
          <div className="celebrate-story-head section-pad" data-celebrate-reveal>
            <p className="eyebrow">One day, thoughtfully joined</p>
            <h2 id="celebrate-story-title">Follow the celebration.</h2>
            <p>Scroll through the main parts of a wedding day at Imperial Satyendra.</p>
          </div>
          <div className="celebrate-story-list">
            <div className="celebrate-thread" aria-hidden="true"><span className="celebrate-thread-fill" /></div>
            {story.map((item, index) => (
              <article className={`celebrate-chapter ${index % 2 ? "chapter-reverse" : ""}`} key={item.number}>
                <div className="celebrate-chapter-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 58vw" /></div>
                <div className="celebrate-chapter-copy"><span className="chapter-number">{item.number}</span><p className="eyebrow">{item.label}</p><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="celebrate-gallery section-pad" id="celebrate-gallery">
          <div className="celebrate-gallery-head" data-celebrate-reveal>
            <div><p className="eyebrow">Celebration moments</p><h2>A closer look<br />at the day.</h2></div>
            <div className="gallery-controls"><button data-cursor="Previous" onClick={() => nextImage(-1)} aria-label="Previous celebration photograph"><ArrowLeft size={20} /></button><span>{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span><button data-cursor="Next" onClick={() => nextImage(1)} aria-label="Next celebration photograph"><ArrowRight size={20} /></button></div>
          </div>
          <div className="celebrate-gallery-stage" aria-live="polite">
            {gallery.map(([src, alt], index) => {
              const offset = (index - activeImage + gallery.length) % gallery.length;
              return <button key={src} className={`celebrate-gallery-card celebrate-gallery-offset-${offset}`} onClick={() => setActiveImage(index)} data-cursor="View" aria-label={`View photograph ${index + 1}: ${alt}`}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 76vw, 38vw" /></button>;
            })}
          </div>
        </section>

        <section className="celebrate-steps section-pad" id="celebrate-steps">
          <div className="celebrate-steps-head" data-celebrate-reveal><p className="eyebrow">A simple way to plan</p><h2>Four steps to your celebration.</h2></div>
          <div className="celebrate-steps-grid" data-celebrate-reveal>
            <article><span>01</span><CalendarBlank size={27} weight="thin" /><h3>Enquire</h3><p>Share your date, guest count and type of event.</p></article>
            <article><span>02</span><UsersThree size={27} weight="thin" /><h3>Discuss</h3><p>Speak with our team and understand your options.</p></article>
            <article><span>03</span><Sparkle size={27} weight="thin" /><h3>Personalise</h3><p>Choose the space, menu, decoration and details.</p></article>
            <article><span>04</span><Heart size={27} weight="thin" /><h3>Celebrate</h3><p>Welcome your guests and enjoy the day together.</p></article>
          </div>
        </section>

        <section className="celebrate-faq section-pad" id="celebrate-faq">
          <div className="celebrate-faq-head" data-celebrate-reveal><p className="eyebrow">Frequently asked questions</p><h2>Let us make<br />it simple.</h2><p>Clear answers for families looking for a wedding or event venue in Patna.</p></div>
          <div className="stay-faq-list" data-celebrate-reveal>
            <details><summary>What celebrations can we plan here?<span>+</span></summary><p>You can ask about weddings, receptions, engagement functions, anniversaries, birthdays and family gatherings.</p></details>
            <details><summary>Can you help with wedding guest rooms?<span>+</span></summary><p>Yes. Share your event dates and expected room count. Our team will explain the stay options available for your group.</p></details>
            <details><summary>Can we discuss food and decoration?<span>+</span></summary><p>Yes. Tell us what you have in mind. The team will guide you through suitable menu and decoration options for your event.</p></details>
            <details><summary>How do we check the venue and available dates?<span>+</span></summary><p>Send an enquiry with your preferred date and phone number. Our team can confirm the next step and help arrange a venue visit.</p></details>
          </div>
        </section>

        <section className="celebrate-enquire" id="celebrate-enquire">
          <Image src="/images/celebrate-reception-night.jpg" alt="Imperial Satyendra wedding reception courtyard at night" fill sizes="100vw" />
          <div className="celebrate-enquire-shade" />
          <div className="celebrate-enquire-copy" data-celebrate-reveal><p className="eyebrow light">Begin your story</p><h2>Plan your celebration<br />at Imperial Satyendra.</h2><p>Tell us your preferred date, type of event and guest count. Our team will help you take the next step.</p><button className="primary-button gold" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Send an enquiry <ArrowRight size={18} /></button></div>
          <div className="celebrate-location"><MapPin size={18} /> Patna, Bihar</div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><Link href="/"><Image src={logo} alt="Imperial Satyendra" /></Link><p>Stay beautifully. Celebrate grandly.</p></div>
        <div className="footer-links"><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/#dine">Dine</Link><Link href="/#gallery">Gallery</Link></div>
        <p className="footer-location">Patna, Bihar, India</p><p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p>
      </footer>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
        <nav><Link href="/stay">Stay</Link><Link href="/celebrate" onClick={() => setMenuOpen(false)}>Celebrate</Link><Link href="/#dine">Dine</Link><Link href="/#gallery">Gallery</Link></nav>
        <button className="primary-button gold" onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}>Plan your celebration</button>
      </div>

      <div className={`enquiry-overlay ${enquiryOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Plan a wedding or celebration in Patna">
        <button className="close-dialog" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }} aria-label="Close enquiry"><X size={24} /></button>
        {submitted ? <div className="success-state"><CheckCircle size={48} weight="thin" /><p className="eyebrow">Thank you</p><h2>We have your celebration request.</h2><p>Your enquiry has been noted in this preview. Connect the hotel enquiry service before launch to receive submissions.</p><button className="primary-button" onClick={() => { setEnquiryOpen(false); setSubmitted(false); }}>Return to the page</button></div> :
          <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); }}><p className="eyebrow">Celebration enquiry</p><h2>Tell us what you are planning.</h2><label>Name<input required name="name" autoComplete="name" /></label><label>Phone number<input required type="tel" name="phone" autoComplete="tel" /></label><div className="celebrate-form-row"><label>Preferred date<input required type="date" name="date" /></label><label>Number of guests<input required min="1" type="number" name="guests" placeholder="For example, 200" /></label></div><label>Type of celebration<select name="eventType" defaultValue="wedding"><option value="wedding">Wedding</option><option value="reception">Reception</option><option value="engagement">Engagement</option><option value="family">Family event</option><option value="other">Other celebration</option></select></label><label>Anything else we should know?<textarea name="message" rows={3} /></label><button className="primary-button" type="submit">Send celebration enquiry <ArrowRight size={18} /></button><small>Demo form — connect the hotel enquiry service before launch.</small></form>}
      </div>
    </div>
  );
}
