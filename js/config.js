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
    ar: "الرياض - منطقة الرياض",
    en: "Riyadh - Riyadh Region"
  },
  // REAL customer reviews only. Add one object per review, with the customer's consent:
  // { name: "اسم العميل", city: "الرياض", text: "نص الرأي", stars: 5 }
  // While this list is empty the page shows neutral placeholders.
  reviews: [],
  mapEmbedUrl: "",                         // optional: verified Google Maps embed URL (leave empty until verified)
  social: {
    instagram: "https://www.instagram.com/mossat_qamt_alada/",
    x: "https://x.com/QEMAHALADA"
  },
  // Email spelled as it appears in the supplied logo. NOT VERIFIED — check it, then set showEmail:true.
  email: "mwsshqmhalada@gmail.com",
  showEmail: false,
  // Tracking: leave empty to disable. No fake IDs are inserted.
  tracking: { gtmId: "GTM-P7WHNMLP", ga4Id: "", metaPixelId: "", tiktokPixelId: "" },
  // Pre-filled WhatsApp messages (always Arabic)
  whatsappMessages: {
    general: "السلام عليكم، أرغب في الاستفسار عن خدماتكم.",
    service: "السلام عليكم، أرغب في الاستفسار عن خدمة: {service}",
    form: "السلام عليكم، أرغب في طلب خدمة من مؤسسة قمة الأداء للصيانة والعوازل.\nالخدمة: {service}\nالاسم: {name}\nرقم الجوال: {phone}\nالتفاصيل: {message}"
  }
};
