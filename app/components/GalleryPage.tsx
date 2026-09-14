"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Diamond, Images, List, MapPin, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "../asset/satyendra-imperial-logo.png";
import { useEnquiryForm } from "../lib/useEnquiryForm";
import PhoneField from "./PhoneField";

type GalleryPhoto = { src: string; alt: string; caption: string };
type GalleryChapter = { id: string; number: string; label: string; title: string; copy: string; photos: GalleryPhoto[]; dark?: boolean };

const chapters: GalleryChapter[] = [
  { id: "gallery-rooms", number: "01", label: "Rooms & suites", title: "Room to rest well.", copy: "See calm bedrooms, useful spaces and thoughtful details for a comfortable stay in Patna.", photos: [
    { src: "/images/stay-hero-room.jpg", alt: "Hotel room at Imperial Satyendra in Patna", caption: "A calm room for your stay" },
    { src: "/images/imperial-suite.jpg", alt: "Spacious suite at Imperial Satyendra", caption: "Space to settle in" },
    { src: "/images/stay-bathroom.jpg", alt: "Hotel bathroom at Imperial Satyendra", caption: "Useful details, simply arranged" },
  ]},
  { id: "gallery-celebrations", number: "02", label: "Celebrations", title: "Days shared together.", copy: "Look through wedding settings, family arrivals and evening celebrations at Imperial Satyendra.", photos: [
    { src: "/images/celebrate-ceremony.jpg", alt: "Wedding ceremony at Imperial Satyendra in Patna", caption: "A setting for the ceremony" },
    { src: "/images/celebrate-family-arrival.jpg", alt: "Family arriving for a celebration at Imperial Satyendra", caption: "Warm welcomes for the family" },
    { src: "/images/celebrate-reception-night.jpg", alt: "Evening wedding reception at Imperial Satyendra", caption: "The celebration after sunset" },
  ]},
  { id: "gallery-dining", number: "03", label: "Dining", title: "Food around the table.", copy: "Explore breakfast, shared Indian meals and relaxed dining spaces made for time together.", photos: [
    { src: "/images/dine-hero.jpg", alt: "Restaurant dining at Imperial Satyendra in Patna", caption: "A table ready for you" },
    { src: "/images/dine-lunch.jpg", alt: "Indian lunch served at Imperial Satyendra", caption: "Lunch made for sharing" },
    { src: "/images/dine-tea.jpg", alt: "Evening tea at Imperial Satyendra", caption: "A quiet break over tea" },
  ]},
  { id: "gallery-architecture", number: "04", label: "Architecture", title: "A closer look at the hotel.", copy: "See the courtyard, arches and corridors that shape the Imperial Satyendra experience.", dark: true, photos: [
    { src: "/images/imperial-courtyard-night.jpg", alt: "Imperial Satyendra hotel courtyard at night", caption: "The hotel after sunset" },
    { src: "/images/imperial-arrival-hall.jpg", alt: "Arched arrival hall at Imperial Satyendra", caption: "A welcoming first view" },
    { src: "/images/imperial-corridor.jpg", alt: "Arched hotel corridor at Imperial Satyendra", caption: "Light through every passage" },
  ]},
  { id: "gallery-moments", number: "05", label: "Guest moments", title: "The people make the memory.", copy: "From a family welcome to a wedding arrival, these are the moments that bring the hotel to life.", photos: [
    { src: "/images/story-welcome-family.jpg", alt: "Family welcomed at Imperial Satyendra in Patna", caption: "A welcome that feels warm" },
    { src: "/images/celebrate-planning.jpg", alt: "Family planning a celebration with the hotel team", caption: "Planning the day together" },
    { src: "/images/story-wedding-arrival.jpg", alt: "Wedding guests arriving at Imperial Satyendra", caption: "A joyful arrival" },
  ]},
];

const allPhotos = [
  { src: "/images/imperial-courtyard-day.jpg", alt: "Imperial Satyendra courtyard in Patna", caption: "The hotel in daylight", category: "Architecture" },
  ...chapters.flatMap((chapter) => chapter.photos.map((photo) => ({ ...photo, category: chapter.label }))),
];
const galleryRoute = [["gallery-top", "Welcome"], ["gallery-index", "Explore"], ...chapters.map((chapter) => [chapter.id, chapter.label]), ["gallery-album", "Full album"], ["gallery-enquire", "Enquire"]];

export default function GalleryPage() {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { submitted, submitting, submitError, handleSubmit, resetSubmission } = useEnquiryForm("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker); gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.from(".gallery-page-kicker, .gallery-page-title span, .gallery-page-copy, .gallery-page-actions", { y: 44, opacity: 0, duration: 1.05, stagger: .1, ease: "power3.out", delay: .2 });
      gsap.from(".gallery-hero-card", { x: 80, y: 90, rotate: 0, opacity: 0, duration: 1.2, stagger: .13, ease: "power3.out", delay: .35 });
      gsap.utils.toArray<HTMLElement>("[data-gallery-reveal]").forEach((node) => gsap.from(node, { y: 58, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 86%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".gallery-chapter").forEach((chapter) => {
        const cluster = chapter.querySelector(".gallery-photo-cluster");
        gsap.from(cluster, { y: 130, opacity: 0, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 84%", once: true } });
      });
      gsap.from(".gallery-mosaic-tile", { scale: .82, opacity: 0, stagger: .035, duration: .75, ease: "power3.out", scrollTrigger: { trigger: ".gallery-mosaic", start: "top 74%", once: true } });
      gsap.to(".gallery-finale img", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".gallery-finale", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => { context.revert(); gsap.ticker.remove(ticker); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const locked = menuOpen || enquiryOpen || lightboxIndex !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setEnquiryOpen(false); setLightboxIndex(null); }
      if (lightboxIndex !== null && event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % allPhotos.length);
      if (lightboxIndex !== null && event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + allPhotos.length) % allPhotos.length);
    };
    addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", keydown); };
  }, [menuOpen, enquiryOpen, lightboxIndex]);

  useEffect(() => {
    const update = () => { const line = innerHeight * .46; let current = 0; galleryRoute.forEach(([id], index) => { const section = document.getElementById(id); if (section && section.getBoundingClientRect().top <= line) current = index; }); setActiveSection(current); };
    update(); addEventListener("scroll", update, { passive: true }); addEventListener("resize", update);
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    const node = cursor.current, labelNode = cursorLabel.current;
    if (!node || !labelNode || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    const moveX = gsap.quickTo(node, "x", { duration: .22, ease: "power3.out" }); const moveY = gsap.quickTo(node, "y", { duration: .22, ease: "power3.out" });
    const move = (event: PointerEvent) => { moveX(event.clientX); moveY(event.clientY); node.classList.add("visible"); };
    const mode = (event: PointerEvent) => { const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null; const text = target?.dataset.cursor ?? (target ? "Select" : ""); labelNode.textContent = text; node.classList.toggle("interactive", Boolean(target)); node.classList.toggle("labelled", Boolean(text)); };
    addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerover", mode, { passive: true }); document.addEventListener("pointerout", mode, { passive: true });
    return () => { document.documentElement.classList.remove("has-custom-cursor"); removeEventListener("pointermove", move); document.removeEventListener("pointerover", mode); document.removeEventListener("pointerout", mode); };
  }, []);

  const openPhoto = (src: string) => setLightboxIndex(allPhotos.findIndex((photo) => photo.src === src));
  const movePhoto = (direction: number) => setLightboxIndex((current) => current === null ? null : (current + direction + allPhotos.length) % allPhotos.length);

  return <div ref={root} className="site-shell gallery-page">
    <div ref={cursor} className="custom-cursor" aria-hidden="true"><ArrowUpRight size={15} weight="bold"/><span ref={cursorLabel}/></div>
    <nav className="scroll-route gallery-route" aria-label="Gallery page journey"><div className="scroll-route-track" aria-hidden="true"><span style={{ height: `${activeSection / (galleryRoute.length - 1) * 100}%` }}/></div>{galleryRoute.map(([id,label], index) => <a key={id} href={`#${id}`} className={activeSection === index ? "active" : ""} aria-label={`Go to ${label} section`} aria-current={activeSection === index ? "location" : undefined} data-cursor="Go"><Diamond size={activeSection === index ? 11 : 7} weight={activeSection === index ? "fill" : "regular"}/><span className="route-number">{String(index).padStart(2,"0")}</span><span className="route-label">{label}</span></a>)}</nav>
    <a className="skip-link" href="#gallery-main">Skip to content</a>
    <header className="site-header gallery-header"><Link href="/" className="brand" aria-label="Imperial Satyendra home"><Image src={logo} alt="Imperial Satyendra" priority/></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/dine">Dine</Link><Link className="nav-active" href="/gallery">Gallery</Link></nav><div className="header-actions"><button className="text-button" data-cursor="Enquire" onClick={() => setEnquiryOpen(true)}>Plan your visit</button><button className="menu-button" data-cursor="Menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={23} weight="light"/></button></div></header>

    <main id="gallery-main">
      <section className="gallery-page-hero" id="gallery-top" aria-labelledby="gallery-title"><div className="gallery-hero-copy"><p className="eyebrow gallery-page-kicker">The curated album</p><h1 className="gallery-page-title" id="gallery-title"><span>Every corner</span><span>has a story.</span></h1><p className="gallery-page-copy">See the rooms, celebrations, food, spaces and people that make Imperial Satyendra in Patna feel special.</p><div className="gallery-page-actions"><a className="primary-button gold" href="#gallery-index" data-cursor="Explore">Explore the gallery <ArrowDown size={18}/></a></div></div><div className="gallery-hero-stack" aria-label="A preview of the Imperial Satyendra gallery"><button className="gallery-hero-card hero-card-one" onClick={() => openPhoto("/images/imperial-arrival-hall.jpg")} data-cursor="View"><Image src="/images/imperial-arrival-hall.jpg" alt="Arched arrival hall at Imperial Satyendra" fill sizes="28vw" loading="eager"/></button><button className="gallery-hero-card hero-card-two" onClick={() => openPhoto("/images/imperial-courtyard-day.jpg")} data-cursor="View"><Image src="/images/imperial-courtyard-day.jpg" alt="Imperial Satyendra courtyard in Patna" fill sizes="35vw" loading="eager"/></button><button className="gallery-hero-card hero-card-three" onClick={() => openPhoto("/images/celebrate-ceremony.jpg")} data-cursor="View"><Image src="/images/celebrate-ceremony.jpg" alt="Wedding setting at Imperial Satyendra" fill sizes="26vw" loading="eager"/></button></div><p className="gallery-hero-note">One place. Many memories.</p></section>

      <nav className="gallery-index" id="gallery-index" aria-label="Browse gallery categories"><p>Explore by theme</p>{chapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id} data-cursor="Go"><span>{chapter.number}</span>{chapter.label}</a>)}</nav>

      <section className="gallery-chapters" aria-label="Imperial Satyendra photo collections">{chapters.map((chapter) => <article className={`gallery-chapter ${chapter.dark ? "gallery-chapter-dark" : ""}`} id={chapter.id} key={chapter.id}><div className="gallery-chapter-copy" data-gallery-reveal><span>{chapter.number}</span><p className={`eyebrow ${chapter.dark ? "light" : ""}`}>{chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.copy}</p><button className="inline-link" onClick={() => openPhoto(chapter.photos[0].src)} data-cursor="View">View photographs <ArrowRight size={16}/></button></div><div className="gallery-photo-cluster">{chapter.photos.map((photo,index) => <button className={`gallery-cluster-photo gallery-cluster-photo-${index+1}`} key={photo.src} onClick={() => openPhoto(photo.src)} data-cursor="Open" aria-label={`Open photograph: ${photo.caption}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 72vw, 38vw" loading="eager"/><span>{photo.caption}</span></button>)}</div></article>)}</section>

      <section className="gallery-album section-pad" id="gallery-album"><div className="gallery-album-copy" data-gallery-reveal><p className="eyebrow">The full album</p><h2>One place.<br/>Many ways to remember it.</h2><p>Browse a wider view of Imperial Satyendra, from quiet rooms to shared tables and joyful gatherings.</p><button className="inline-link" onClick={() => setLightboxIndex(0)} data-cursor="Browse">Browse all photographs <Images size={17}/></button></div><div className="gallery-mosaic">{allPhotos.slice(0,12).map((photo,index) => <button className={`gallery-mosaic-tile tile-${index+1}`} key={`${photo.src}-mosaic`} onClick={() => setLightboxIndex(index)} aria-label={`Open ${photo.caption}`} data-cursor="Open"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 32vw, 16vw" loading={index === 0 || index === 11 ? "eager" : "lazy"}/></button>)}</div></section>

      <section className="gallery-finale" id="gallery-enquire"><Image src="/images/imperial-courtyard-night.jpg" alt="Imperial Satyendra hotel in Patna at night" fill sizes="100vw"/><div className="gallery-finale-shade"/><div className="gallery-finale-copy" data-gallery-reveal><p className="eyebrow light">Plan your visit</p><h2>Come and see it<br/>for yourself.</h2><p>Tell us whether you are planning a stay, meal or celebration. Our team will help you with the next step.</p><button className="primary-button gold" onClick={() => setEnquiryOpen(true)} data-cursor="Enquire">Make an enquiry <ArrowRight size={18}/></button></div><div className="gallery-location"><MapPin size={18}/> Patna, Bihar</div></section>
    </main>

    <footer><div className="footer-brand"><Link href="/"><Image src={logo} alt="Imperial Satyendra"/></Link><p>Stay beautifully. Celebrate grandly.</p></div><div className="footer-links"><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/dine">Dine</Link><Link href="/gallery">Gallery</Link></div><p className="footer-location">Patna, Bihar, India</p><p className="copyright">© {new Date().getFullYear()} Imperial Satyendra. All rights reserved.</p></footer>

    <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26}/></button><nav><Link href="/stay">Stay</Link><Link href="/celebrate">Celebrate</Link><Link href="/dine">Dine</Link><Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></nav><button className="primary-button gold" onClick={() => {setMenuOpen(false);setEnquiryOpen(true);}}>Plan your visit</button></div>

    {lightboxIndex !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer"><button className="gallery-lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close photograph"><X size={25}/></button><button className="gallery-lightbox-arrow previous" onClick={() => movePhoto(-1)} aria-label="Previous photograph" data-cursor="Previous"><ArrowLeft size={28}/></button><figure><div><Image src={allPhotos[lightboxIndex].src} alt={allPhotos[lightboxIndex].alt} fill sizes="92vw" priority/></div><figcaption><span>{String(lightboxIndex+1).padStart(2,"0")} / {String(allPhotos.length).padStart(2,"0")}</span><p>{allPhotos[lightboxIndex].category}</p><strong>{allPhotos[lightboxIndex].caption}</strong></figcaption></figure><button className="gallery-lightbox-arrow next" onClick={() => movePhoto(1)} aria-label="Next photograph" data-cursor="Next"><ArrowRight size={28}/></button></div>}

    <div className={`enquiry-overlay ${enquiryOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Plan a visit to Imperial Satyendra"><button className="close-dialog" onClick={() => {setEnquiryOpen(false);resetSubmission();}} aria-label="Close enquiry"><X size={24}/></button>{submitted ? <div className="success-state"><CheckCircle size={48} weight="thin"/><p className="eyebrow">Thank you</p><h2>We have your enquiry.</h2><p>Your enquiry has been sent to the Imperial Satyendra team. They will contact you using the details you provided.</p><button className="primary-button" onClick={() => {setEnquiryOpen(false);resetSubmission();}}>Return to the gallery</button></div> : <form onSubmit={handleSubmit}><p className="eyebrow">Plan your visit</p><h2>How can we help?</h2><div className="gallery-form-row"><label>Name<input name="name" required autoComplete="name"/></label><PhoneField /></div><div className="gallery-form-row"><label>Email<input name="email" type="email" autoComplete="email"/></label><label>I am interested in<select name="interest"><option>A hotel stay</option><option>A celebration</option><option>Restaurant dining</option><option>Something else</option></select></label></div><label>Tell us a little more<textarea name="message" rows={3}/></label><label className="enquiry-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>{submitError && <p className="enquiry-form-error" role="alert">{submitError}</p>}<button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send enquiry"} {!submitting && <ArrowRight size={17}/>}</button><small>The Imperial Satyendra team will receive this enquiry by email.</small></form>}</div>
  </div>;
}
