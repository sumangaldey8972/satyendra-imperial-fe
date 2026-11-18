import { InstagramLogo, Phone, WhatsappLogo } from "@phosphor-icons/react";

const phoneNumbers = [
  { label: "+91 90316 31896", href: "tel:+919031631896" },
  { label: "+91 99316 31897", href: "tel:+919931631897" },
];

const whatsappHref = "https://wa.me/919955992715";
const instagramHref = "https://www.instagram.com/imperialsatyendra/";

export function HeaderContactLinks() {
  return (
    <div className="header-contact-links" aria-label="Contact Imperial Satyendra">
      <div className="header-phone-links">
        {phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}
      </div>
      <a className="header-social-link" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Imperial Satyendra on WhatsApp"><WhatsappLogo size={19} weight="regular" /></a>
      <a className="header-social-link" href={instagramHref} target="_blank" rel="noreferrer" aria-label="Follow Imperial Satyendra on Instagram"><InstagramLogo size={19} weight="regular" /></a>
    </div>
  );
}

export function FooterContactLinks() {
  return (
    <div className="footer-contact-links" aria-label="Contact Imperial Satyendra">
      {phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}><Phone size={15} weight="light" />{phone.label}</a>)}
      <a href={whatsappHref} target="_blank" rel="noreferrer"><WhatsappLogo size={16} weight="regular" />WhatsApp</a>
      <a href={instagramHref} target="_blank" rel="noreferrer"><InstagramLogo size={16} weight="regular" />Instagram</a>
    </div>
  );
}

export function MenuContactLinks() {
  return (
    <div className="menu-contact-links" aria-label="Contact Imperial Satyendra">
      {phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}
      <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={instagramHref} target="_blank" rel="noreferrer">Instagram</a>
    </div>
  );
}
