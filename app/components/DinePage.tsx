"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Diamond, List, MapPin, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra-imperial-logo.png";

const dineRoute = [
  ["dine-top", "Welcome"], ["dine-day", "The day"], ["dine-morning", "Morning"],
  ["dine-lunch", "Lunch"], ["dine-tea", "Tea"], ["dine-dinner", "Dinner"],
  ["dine-kitchen", "Kitchen"], ["dine-gallery", "Gallery"], ["dine-faq", "Questions"], ["dine-reserve", "Reserve"],
];

const moments = [
  { id: "dine-morning", number: "01", label: "Morning", title: "A brighter beginning.", copy: "Start your day with a calm table, fresh breakfast choices and warm service. Ask our team about the breakfast options available during your visit.", image: "/images/dine-breakfast.jpg", alt: "Indian breakfast served in the Imperial Satyendra restaurant in Patna" },
  { id: "dine-lunch", number: "02", label: "Lunch", title: "Familiar flavours, shared together.", copy: "Lunch is a time to slow down and share. Speak with our team about Indian food, lighter meals and choices that suit your family.", image: "/images/dine-lunch.jpg", alt: "Shared Indian lunch at Imperial Satyendra in Patna" },
  { id: "dine-tea", number: "03", label: "Evening tea", title: "A pause, well served.", copy: "Meet over tea, small bites and easy conversation. It is a simple way to take a break between a busy day and the evening ahead.", image: "/images/dine-tea.jpg", alt: "Afternoon tea and small bites at Imperial Satyendra" },
  { id: "dine-dinner", number: "04", label: "Dinner", title: "An evening to remember.", copy: "Come together for dinner in a warm setting. Tell us about your group and food preferences when you reserve your table.", image: "/images/dine-dinner.jpg", alt: "Candlelit dinner in the Imperial Satyendra restaurant" },
];

const gallery = [
  ["/images/dine-breakfast.jpg", "Breakfast table in the sunlit restaurant"],
  ["/images/dine-lunch.jpg", "Indian lunch served for sharing"],
  ["/images/dine-tea.jpg", "Afternoon tea with sweet and savoury bites"],
  ["/images/dine-dinner.jpg", "Candlelit dinner at Imperial Satyendra"],
  ["/images/dine-feast.jpg", "Indian dishes shared around one table"],
];

export default function DinePage() {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker); gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.from(".dine-hero-kicker, .dine-hero-title span, .dine-hero-copy, .dine-hero-actions", { y: 48, opacity: 0, duration: 1.1, stagger: .1, ease: "power3.out", delay: .2 });
      gsap.to(".dine-hero-media", { scale: 1.1, yPercent: 7, ease: "none", scrollTrigger: { trigger: ".dine-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-dine-reveal]").forEach((node) => gsap.from(node, { y: 58, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 86%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".dine-moment").forEach((chapter, index) => {
        const media = chapter.querySelector(".dine-moment-media");
        const copy = chapter.querySelector(".dine-moment-copy");
        gsap.from(media, { clipPath: index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.06, ease: "none", scrollTrigger: { trigger: chapter, start: "top 84%", end: "center 58%", scrub: 1 } });
        gsap.from(copy, { y: 64, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 72%", once: true } });
      });
      gsap.to(".dine-thread-fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".dine-moments", start: "top center", end: "bottom center", scrub: true } });
      gsap.from(".dine-kitchen-card", { y: 90, opacity: 0, rotate: 8, stagger: .15, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".dine-kitchen", start: "top 64%", once: true } });
      gsap.to(".dine-feast img", { scale: 1.09, ease: "none", scrollTrigger: { trigger: ".dine-feast", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => { context.revert(); gsap.ticker.remove(ticker); lenis.destroy(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || reserveOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); setReserveOpen(false); } };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [menuOpen, reserveOpen]);

  useEffect(() => {
    const update = () => { const line = innerHeight * .46; let current = 0; dineRoute.forEach(([id], index) => { const section = document.getElementById(id); if (section && section.getBoundingClientRect().top <= line) current = index; }); setActiveSection(current); };
    update(); addEventListener("scroll", update, { passive: true }); addEventListener("resize", update);
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    const node = cursor.current, labelNode = cursorLabel.current;
    const enabled = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || !labelNode || !enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const moveX = gsap.quickTo(node, "x", { duration: .22, ease: "power3.out" }); const moveY = gsap.quickTo(node, "y", { duration: .22, ease: "power3.out" });
    const move = (event: PointerEvent) => { moveX(event.clientX); moveY(event.clientY); node.classList.add("visible"); };
    const mode = (event: PointerEvent) => { const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null; const text = target?.dataset.cursor ?? (target ? "Select" : ""); labelNode.textContent = text; node.classList.toggle("interactive", Boolean(target)); node.classList.toggle("labelled", Boolean(text)); };
    addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerover", mode, { passive: true }); document.addEventListener("pointerout", mode, { passive: true });
    return () => { document.documentElement.classList.remove("has-custom-cursor"); removeEventListener("pointermove", move); document.removeEventListener("pointerover", mode); document.removeEventListener("pointerout", mode); };
  }, []);

  const moveGallery = (direction: number) => setActiveImage((current) => (current + direction + gallery.length) % gallery.length);

  return <div ref={root} className="site-shell dine-page">
    <div ref={cursor} className="custom-cursor" aria-hidden="true"><ArrowUpRight size={15} weight="bold" /><span ref={cursorLabel} /></div>
    <nav className="scroll-route dine-route" aria-label="Dine page journey"><div className="scroll-route-track" aria-hidden="true"><span style={{ height: `${activeSection / (dineRoute.length - 1) * 100}%` }} /></div>{dineRoute.map(([id,label], index) => <a key={id} href={`#${id}`} className={activeSection === index ? "active" : ""} aria-label={`Go to ${label} section`} aria-current={activeSection === index ? "location" : undefined} data-cursor="Go"><Diamond size={activeSection === index ? 11 : 7} weight={activeSection === index ? "fill" : "regular"}/><span className="route-number">{String(index).padStart(2,"0")}</span><span className="route-label">{label}</span></a>)}</nav>
    <a className="skip-link" href="#dine-main">Skip to content</a>
    <header className="site-header"><Link href="/" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority /></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link className="nav-active" href="/dine">Dine</Link><Link href="/#gallery">Gallery</Link></nav><div className="header-actions"><button className="text-button" data-cursor="Reserve" onClick={() => setReserveOpen(true)}>Reserve a table</button><button className="menu-button" data-cursor="Menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light" /></button></div></header>

    <main id="dine-main">
      <section className="dine-hero" id="dine-top" aria-labelledby="dine-title"><Image className="dine-hero-media" src="/images/dine-hero.jpg" alt="Indian food served in the Imperial Satyendra restaurant in Patna" fill sizes="100vw" priority /><div className="dine-hero-shade"/><div className="dine-hero-content"><p className="eyebrow dine-hero-kicker">Restaurant and dining in Patna</p><h1 id="dine-title" className="dine-hero-title"><span>Made with care.</span><span>Shared with joy.</span></h1><p className="dine-hero-copy">Enjoy a relaxed meal at Imperial Satyendra in Patna. Come for breakfast, lunch, evening tea or dinner and spend good time around the table.</p><div className="dine-hero-actions"><button className="primary-button gold" data-cursor="Reserve" onClick={() => setReserveOpen(true)}>Reserve a table <ArrowRight size={18}/></button><a className="circle-link" href="#dine-day" aria-label="Explore the dining day"><ArrowDown size={20}/></a></div></div></section>

      <section className="dine-day section-pad" id="dine-day" data-dine-reveal><div><p className="eyebrow">A day at the table</p><h2>From the first cup<br/>to the final course.</h2></div><p>Good food brings people together. Follow the table from a fresh morning breakfast to a warm evening meal.</p></section>

      <section className="dine-moments" aria-label="Dining moments through the day"><div className="dine-thread" aria-hidden="true"><span className="dine-thread-fill"/></div>{moments.map((item,index) => <article id={item.id} className={`dine-moment ${index % 2 ? "dine-moment-reverse" : ""}`} key={item.id}><div className="dine-moment-copy"><span>{item.number}</span><p className="eyebrow">{item.label}</p><h2>{item.title}</h2><p>{item.copy}</p><button className="inline-link" data-cursor="Reserve" onClick={() => setReserveOpen(true)}>Ask about {item.label.toLowerCase()} <ArrowRight size={16}/></button></div><div className="dine-moment-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 58vw" loading={item.id === "dine-dinner" ? "eager" : "lazy"}/></div></article>)}</section>

      <section className="dine-kitchen" id="dine-kitchen"><Image className="dine-kitchen-main" src="/images/dine-chef.jpg" alt="Indian chef preparing a dish at Imperial Satyendra" fill sizes="100vw"/><div className="dine-kitchen-shade"/><div className="dine-kitchen-copy" data-dine-reveal><p className="eyebrow light">From our kitchen</p><h2>Care in every step.</h2><p>Every meal begins with preparation. Our kitchen team brings attention to the ingredients, the cooking and the final plate.</p></div><div className="dine-kitchen-stack" aria-hidden="true"><div className="dine-kitchen-card card-one"><Image src="/images/dine-lunch.jpg" alt="" fill sizes="280px"/></div><div className="dine-kitchen-card card-two"><Image src="/images/dine-dinner.jpg" alt="" fill sizes="240px"/></div><div className="dine-kitchen-card card-three"><Image src="/images/dine-tea.jpg" alt="" fill sizes="220px"/></div></div></section>

      <section className="dine-feast" aria-labelledby="feast-title"><Image src="/images/dine-feast.jpg" alt="Indian dishes shared around a table at Imperial Satyendra" fill sizes="100vw"/><div className="dine-feast-copy" data-dine-reveal><p className="eyebrow light">The shared table</p><h2 id="feast-title">Better together.</h2><p>Family meals, friendly conversations and food passed from one person to another.</p></div></section>

      <section className="dine-gallery section-pad" id="dine-gallery"><div className="dine-gallery-head" data-dine-reveal><div><p className="eyebrow">A glimpse at our table</p><h2>Food, space<br/>and good moments.</h2></div><div className="gallery-controls"><button onClick={() => moveGallery(-1)} aria-label="Previous dining photograph" data-cursor="Previous"><ArrowLeft size={20}/></button><span>{String(activeImage+1).padStart(2,"0")} / 05</span><button onClick={() => moveGallery(1)} aria-label="Next dining photograph" data-cursor="Next"><ArrowRight size={20}/></button></div></div><div className="dine-gallery-stage" aria-live="polite">{gallery.map(([src,alt],index) => { const offset=(index-activeImage+gallery.length)%gallery.length; return <button key={src} className={`dine-gallery-card dine-gallery-offset-${offset}`} onClick={() => setActiveImage(index)} data-cursor="View" aria-label={`View photograph ${index+1}: ${alt}`}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 70vw, 36vw"/></button>; })}</div></section>

      <section className="dine-faq section-pad" id="dine-faq"><div className="dine-faq-head" data-dine-reveal><p className="eyebrow">Frequently asked questions</p><h2>Your dining questions, answered.</h2><p>Simple information before you plan a meal at Imperial Satyendra in Patna.</p></div><div className="stay-faq-list" data-dine-reveal><details><summary>Do I need to reserve a table?<span>+</span></summary><p>A reservation is helpful, especially for a family meal or group. Send your date, time and guest count so our team can guide you.</p></details><details><summary>What kind of food can we ask about?<span>+</span></summary><p>You can speak with the team about Indian food, lighter meals and suitable choices for your group. Available options can be explained when you enquire.</p></details><details><summary>Can we discuss food preferences?<span>+</span></summary><p>Yes. Share important food preferences while making your reservation. The team will explain what can be arranged.</p></details><details><summary>Can we plan a family or group meal?<span>+</span></summary><p>Yes. Tell us your expected guest count and the kind of meal you are planning so we can help with the next step.</p></details></div></section>

      <section className="dine-reserve" id="dine-reserve"><Image src="/images/dine-dinner.jpg" alt="Evening dining at Imperial Satyendra in Patna" fill sizes="100vw" loading="eager"/><div className="dine-reserve-shade"/><div className="dine-reserve-copy" data-dine-reveal><p className="eyebrow light">A table awaits</p><h2>Reserve your table<br/>at Imperial Satyendra.</h2><p>Share your preferred date, time and number of guests. Our team will help you plan the meal.</p><button className="primary-button gold" data-cursor="Reserve" onClick={() => setReserveOpen(true)}>Reserve a table <ArrowRight size={18}/></button></div><div className="dine-location"><MapPin size={18}/> Patna, Bihar</div></section>
    </main>

    <footer><div className="footer-brand"><Link href="/"><Image src={logo} alt="Imperial Satyendra"/></Link><p>Stay beautifully. Celebrate grandly.</p></div><div className="footer-links"><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/dine">Dine</Link><Link href="/#gallery">Gallery</Link></div><p className="footer-location">Patna, Bihar, India</p><p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p></footer>

    <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26}/></button><nav><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/dine" onClick={() => setMenuOpen(false)}>Dine</Link><Link href="/#gallery">Gallery</Link></nav><button className="primary-button gold" onClick={() => {setMenuOpen(false);setReserveOpen(true);}}>Reserve a table</button></div>

    <div className={`enquiry-overlay ${reserveOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Reserve a table at Imperial Satyendra"><button className="close-dialog" onClick={() => {setReserveOpen(false);setSubmitted(false);}} aria-label="Close reservation"><X size={24}/></button>{submitted ? <div className="success-state"><CheckCircle size={48} weight="thin"/><p className="eyebrow">Thank you</p><h2>We have your table request.</h2><p>Your request has been noted in this preview. Connect the hotel reservation service before launch to receive submissions.</p><button className="primary-button" onClick={() => {setReserveOpen(false);setSubmitted(false);}}>Return to the page</button></div> : <form onSubmit={(event:FormEvent<HTMLFormElement>) => {event.preventDefault();setSubmitted(true);}}><p className="eyebrow">Table reservation</p><h2>Plan your meal.</h2><div className="dine-form-row"><label>Name<input name="name" required autoComplete="name"/></label><label>Phone number<input name="phone" type="tel" required autoComplete="tel"/></label></div><div className="dine-form-row"><label>Preferred date<input name="date" type="date" required/></label><label>Preferred time<input name="time" type="time" required/></label></div><div className="dine-form-row"><label>Number of guests<input name="guests" type="number" min="1" required/></label><label>Meal<select name="meal"><option>Breakfast</option><option>Lunch</option><option>Evening tea</option><option>Dinner</option></select></label></div><label>Anything we should know?<textarea name="message" rows={2}/></label><button className="primary-button" type="submit">Send table request <ArrowRight size={17}/></button><small>Demo form — connect the hotel reservation service before launch.</small></form>}</div>
  </div>;
}
