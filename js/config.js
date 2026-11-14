/* ==========================================================================
   SITE CONFIG — the single place to edit business details.
   Everything here is read by js/main.js and applied to the page.
   ========================================================================== */
window.SITE_CONFIG = {
  nameAr: "مؤسسة قمة الأداء للصيانة والعوازل",
  nameEn: "Qimma Performance Maintenance & Insulation",
  siteUrl: "https://kdmat.com",           // shown in the company branding; change if the site is hosted elsewhere
  phones: [
    { display: "0551212168", tel: "+966551212168", wa: "966551212168" }
  ],
  primaryPhone: 0,                         // index used by the header, floating buttons and the contact form
  address: {
    ar: "طريق الأمير محمد بن عبدالرحمن - حي اليمامة - الرياض",
    en: "Prince Mohammed bin Abdulrahman Road - Al Yamamah District - Riyadh"
  },
  // Opens a Google Maps SEARCH for the address (not a pinned location).
  // Replace with a verified Google Maps share link / embed URL once the exact pin is confirmed.
  mapsLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("طريق الأمير محمد بن عبدالرحمن حي اليمامة الرياض"),
  mapEmbedUrl: "",                         // optional: verified Google Maps embed URL (leave empty until verified)
  social: {
    instagram: "https://www.instagram.com/mossat_qamt_alada/",
    x: "https://x.com/QEMAHALADA"
  },
  // Email spelled as it appears in the supplied logo. NOT VERIFIED — check it, then set showEmail:true.
  email: "mwsshqmhalada@gmail.com",
  showEmail: false,
  // Tracking: leave empty to disable. No fake IDs are inserted.
  tracking: { gtmId: "", ga4Id: "", metaPixelId: "", tiktokPixelId: "" },
  // Pre-filled WhatsApp messages (always Arabic)
  whatsappMessages: {
    general: "السلام عليكم، أرغب في الاستفسار عن خدماتكم.",
    service: "السلام عليكم، أرغب في الاستفسار عن خدمة: {service}",
    form: "السلام عليكم، أرغب في طلب خدمة من مؤسسة قمة الأداء للصيانة والعوازل.\nالخدمة: {service}\nالاسم: {name}\nرقم الجوال: {phone}\nالتفاصيل: {message}"
  }
};
