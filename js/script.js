(() => {
  "use strict";

  const whatsappNumber = "212665805158";
  const generalMessage =
    "Bonjour, je souhaite prendre rendez-vous au barbershop. Pourriez-vous me communiquer les disponibilités, s’il vous plaît ?";

  const whatsappUrl = (message) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll(".js-wa-general").forEach((link) => {
    link.href = whatsappUrl(generalMessage);
  });

  document.querySelectorAll(".js-service-wa").forEach((link) => {
    const service = link.dataset.service;
    if (!service) return;

    const message = `Bonjour, je souhaite prendre rendez-vous pour la prestation « ${service} ». Pourriez-vous me communiquer les disponibilités, s’il vous plaît ?`;
    link.href = whatsappUrl(message);
  });

  document.querySelectorAll(".js-product-wa").forEach((link) => {
    const product = link.dataset.product;
    if (!product) return;

    const message = `Bonjour, je souhaite obtenir des informations sur le produit « ${product} » présenté sur votre page. Est-il disponible au salon, s’il vous plaît ?`;
    link.href = whatsappUrl(message);
    link.setAttribute("aria-label", `Demander sur WhatsApp : ${product}`);
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const sectionIds = ["accueil", "services", "produits", "localisation"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = [...document.querySelectorAll(".bottom-nav__link[data-section]")];

  const setActiveSection = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  let scrollFrame = 0;
  const updateActiveSection = () => {
    scrollFrame = 0;
    const marker = window.scrollY + window.innerHeight * 0.38;
    let active = sections[0]?.id || "accueil";

    sections.forEach((section) => {
      if (section.offsetTop <= marker) active = section.id;
    });

    setActiveSection(active);
  };

  const queueActiveUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateActiveSection);
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveSection(link.dataset.section));
  });

  window.addEventListener("scroll", queueActiveUpdate, { passive: true });
  window.addEventListener("resize", queueActiveUpdate, { passive: true });
  updateActiveSection();
})();
