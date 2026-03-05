const setSeoMeta = (seo) => {
  if (!seo) return;

  document.title = seo.title || document.title;
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag && seo.description) descTag.setAttribute("content", seo.description);

  const metaMap = {
    "og:title": seo.title,
    "og:description": seo.description,
    "og:url": seo.url,
    "og:image": seo.image,
    "og:site_name": "OlmedoDev",
    "twitter:card": seo.twitterCard,
    "twitter:title": seo.title,
    "twitter:description": seo.description,
    "twitter:image": seo.image
  };

  Object.entries(metaMap).forEach(([key, value]) => {
    if (!value) return;
    const selector = key.startsWith("og:")
      ? `meta[property="${key}"]`
      : `meta[name="${key}"]`;
    const tag = document.querySelector(selector);
    if (tag) tag.setAttribute("content", value);
  });

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && seo.url) canonical.setAttribute("href", seo.url);
};

const injectSchema = (data) => {
  if (!data || !data.staff || !data.staff.length) return;
  const person = data.staff[0] || { name: "Ulises Olmedo" };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role || "Ingeniero Independiente",
    url: data.seo?.url,
    image: data.seo?.image,
    knowsAbout: ["Laravel", "Linux", "Backend", "Infraestructura", "Bases de Datos"]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Person",
        name: person.name,
        url: data.seo?.url
      }
    }))
  };

  const personNode = document.getElementById("schema-person");
  const serviceNode = document.getElementById("schema-service");
  if (personNode) personNode.textContent = JSON.stringify(personSchema);
  if (serviceNode) serviceNode.textContent = JSON.stringify(serviceSchema);
};

const renderHero = (data) => {
  const hero = document.querySelector("#hero");
  if (!hero) return;

  hero.innerHTML = `
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <span class="hero-badge">${data.brand.tagline}</span>
        <h1 class="hero-title">${data.hero.title}</h1>
        <p class="hero-subtitle">${data.hero.subtitle}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">${data.hero.ctaPrimary}</a>
          <a class="btn btn-ghost" href="#services">${data.hero.ctaSecondary}</a>
        </div>
        <div class="hero-tags">
          ${data.hero.badges.map((item) => `<span class="hero-tag">${item}</span>`).join("")}
        </div>
      </div>
      <div class="hero-card glass reveal">
        <div class="profile-frame">
          <img class="profile-image" src="assets/profile.jpg" alt="Ulises Olmedo" />
        </div>
        <div class="profile-info">
          <div class="profile-name">Ulises Olmedo</div>
          <div class="profile-role">Ingenieria directa para backend y sistemas</div>
        </div>
      </div>
    </div>
  `;
};

const renderServices = (data) => {
  const services = document.querySelector("#services");
  if (!services) return;

  services.innerHTML = `
    <div class="container">
      <h2 class="section-title reveal">Desarrollador Freelance Laravel y Administracion de Servidores Linux</h2>
      <p class="section-lead reveal">Servicios tecnicos enfocados en estabilidad, rendimiento y operaciones confiables.</p>
      <div class="services-slider">
        <div class="slider-viewport" data-slider>
          <div class="slider-track">
            ${data.services
              .map(
                (service) => `
                  <article class="slider-card skill-card glass reveal">
                    <div class="icon-badge"><i data-lucide="${service.icon}"></i></div>
                    <h3 class="card-title">${service.title}</h3>
                    <p class="card-text">${service.description}</p>
                    <ul class="service-points">
                      ${service.points.map((point) => `<li>${point}</li>`).join("")}
                    </ul>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="slider-footer reveal">
          <div class="slider-controls">
            <button class="slider-btn" type="button" data-dir="prev" aria-label="Servicio anterior">
              <i data-lucide="chevron-left"></i>
            </button>
            <button class="slider-btn" type="button" data-dir="next" aria-label="Servicio siguiente">
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
          <div class="slider-dots" data-dots></div>
        </div>
      </div>
    </div>
  `;
};

const renderAbout = (data) => {
  const about = document.querySelector("#about");
  if (!about) return;

  about.innerHTML = `
    <div class="container split">
      <div class="split-content reveal">
        <h2 class="section-title">${data.about.title}</h2>
        <p class="section-lead">${data.about.intro}</p>
        <div class="about-list">
          ${data.about.bullets.map((item) => `<div class="about-item">${item}</div>`).join("")}
        </div>
        <div class="experience-pill">
          <i data-lucide="badge-check"></i>
          <span>${data.experience}</span>
        </div>
      </div>
      <div class="split-media reveal">
        <div class="profile-frame">
          <img class="profile-image" src="assets/profile.jpg" alt="Ulises Olmedo" />
        </div>
      </div>
    </div>
  `;
};

const renderStack = (data) => {
  const stack = document.querySelector("#stack");
  if (!stack) return;

  const items = data.techStack.items;
  const sequence = items.concat(items);
  const duplicated = sequence.concat(sequence);

  stack.innerHTML = `
    <div class="container">
      <div class="stack-header reveal">
        <h2 class="section-title">${data.techStack.title}</h2>
        <p class="section-lead">${data.techStack.intro}</p>
        <p class="card-text">Stack elegido por estabilidad y costo operativo real en produccion.</p>
      </div>
    </div>
    <div class="stack-panel glass reveal" role="region" aria-label="Stack tecnologico preferido">
      <div class="stack-slider">
        <div class="stack-track">
          ${duplicated
            .map(
              (item, index) => `
                <div class="stack-item" ${index >= items.length ? 'aria-hidden="true"' : ""}>
                  <img class="stack-logo" src="${item.logo}" alt="${item.name} logo" loading="lazy" />
                  <span>${item.name}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
};

const renderContact = (data) => {
  const contact = document.querySelector("#contact");
  if (!contact) return;

  contact.innerHTML = `
    <div class="container">
      <div class="contact-shell">
        <div class="contact-aside reveal">
          <h2 class="section-title">Contacto directo para proyectos de backend</h2>
          <p class="section-lead">${data.contact.intro}</p>
          <div class="contact-info">
            <div>Respuesta directa a ${data.contact.email}.</div>
            <div>Agendemos un espacio y revisamos tu stack.</div>
          </div>
          <a class="whatsapp-card" href="${data.contact.whatsappLink}" target="_blank" rel="noreferrer">
            <span class="whatsapp-icon">
              <img src="${data.contact.whatsappIcon}" alt="WhatsApp" loading="lazy" />
            </span>
            <span class="whatsapp-meta">
              <span class="whatsapp-label">WhatsApp directo</span>
              <span class="whatsapp-value">${data.contact.phone}</span>
            </span>
          </a>
        </div>
        <form class="contact-form reveal" action="${data.contact.formAction}" method="POST">
          <div class="contact-grid">
            <div class="form-field">
              <label for="name">Nombre</label>
              <input id="name" name="name" type="text" placeholder="Tu nombre" required />
            </div>
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div class="form-field">
              <label for="project">Tipo de proyecto</label>
              <select id="project" name="project" required>
                ${data.contact.projectTypes.map((type) => `<option value="${type}">${type}</option>`).join("")}
              </select>
            </div>
            <div class="form-field full">
              <label for="message">Mensaje</label>
              <textarea id="message" name="message" placeholder="Contexto, objetivos y tiempos" required></textarea>
            </div>
            <div class="form-field full form-actions">
              <button class="btn btn-primary" type="submit">${data.hero.ctaPrimary}</button>
              <div class="form-note">Tambien puedes escribir por WhatsApp si prefieres.</div>
              <div class="form-status" role="status" aria-live="polite"></div>
            </div>
          </div>
        </form>
        <div class="form-modal" id="formModal" aria-hidden="true">
          <div class="form-modal-card glass">
            <div class="form-modal-icon">
              <i data-lucide="check-circle"></i>
            </div>
            <h3>Mensaje enviado</h3>
            <p>Gracias, te respondere pronto.</p>
            <button class="btn btn-primary" type="button" data-modal-close>Listo</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const setupServicesSlider = () => {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const cards = Array.from(slider.querySelectorAll(".slider-card"));
  const buttons = slider.parentElement?.querySelectorAll(".slider-btn");
  const dotsContainer = slider.parentElement?.querySelector("[data-dots]");
  const dots = [];

  const getStep = () => {
    const card = cards[0];
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const setActive = (index) => {
    cards.forEach((card, i) => card.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  const getActiveIndex = () => {
    const step = getStep() || 1;
    return Math.max(0, Math.min(cards.length - 1, Math.round(slider.scrollLeft / step)));
  };

  if (dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Ir al servicio ${index + 1}`);
      dot.addEventListener("click", () => {
        const step = getStep();
        const target = step * index;
        if (window.gsap) {
          gsap.to(slider, {
            scrollLeft: target,
            duration: 0.6,
            ease: "power2.out"
          });
        } else {
          slider.scrollLeft = target;
        }
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  buttons?.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.dir === "next" ? 1 : -1;
      const step = getStep();
      if (window.gsap) {
        gsap.to(slider, {
          scrollLeft: slider.scrollLeft + step * direction,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        slider.scrollLeft += step * direction;
      }
    });
  });

  const syncActive = () => {
    const index = getActiveIndex();
    setActive(index);
  };

  slider.addEventListener("scroll", () => {
    if (slider._raf) cancelAnimationFrame(slider._raf);
    slider._raf = requestAnimationFrame(syncActive);
  });

  window.addEventListener("resize", () => syncActive());
  syncActive();
};

const setupCursorGlow = () => {
  const cards = document.querySelectorAll(".skill-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
      card.style.setProperty("--glow", "1");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--glow", "0");
    });
  });
};

const setupLazyBackgrounds = () => {
  const sections = document.querySelectorAll("[data-bg]");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const url = entry.target.dataset.bg;
        if (url) {
          entry.target.style.setProperty("--section-bg", `url('${url}')`);
        }
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "200px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
};

const setupScrollReveal = () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(
      element,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

const setupFormValidation = () => {
  const form = document.querySelector("form.contact-form");
  if (!form) return;

  const fields = Array.from(form.querySelectorAll("input, select, textarea"));
  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector("button[type=\"submit\"]");
  const modal = document.getElementById("formModal");
  const modalClose = modal?.querySelector("[data-modal-close]");
  let modalTimer;

  const markField = (field, isValid) => {
    field.classList.toggle("is-invalid", !isValid);
    field.setAttribute("aria-invalid", String(!isValid));
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    if (modalTimer) clearTimeout(modalTimer);
    modalTimer = setTimeout(() => closeModal(), 3500);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
  };

  const validateField = (field) => {
    if (!field.required) return true;
    const value = field.value.trim();
    const isValid = value.length > 0 && (field.type !== "email" || field.checkValidity());
    markField(field, isValid);
    return isValid;
  };

  const setStatus = (type, message) => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status ${type}`;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    let isFormValid = true;
    fields.forEach((field) => {
      const valid = validateField(field);
      if (!valid) isFormValid = false;
    });
    if (!isFormValid) {
      event.preventDefault();
      setStatus("error", "Completa los campos marcados.");
      return;
    }
    event.preventDefault();

    try {
      if (submitBtn) submitBtn.disabled = true;
      setStatus("pending", "Enviando...");
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        setStatus("success", "Gracias, mensaje enviado.");
        openModal();
        form.reset();
        fields.forEach((field) => markField(field, true));
      } else {
        setStatus("error", "No se pudo enviar. Intenta de nuevo.");
      }
    } catch (error) {
      setStatus("error", "Error de red. Intenta de nuevo.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const data = window.landingData;
  if (!data) return;

  setSeoMeta(data.seo);
  injectSchema(data);

  renderHero(data);
  renderServices(data);
  renderAbout(data);
  renderStack(data);
  renderContact(data);

  if (window.lucide) {
    lucide.createIcons();
  }

  setupLazyBackgrounds();
  setupCursorGlow();
  setupServicesSlider();
  setupScrollReveal();
  setupFormValidation();
});
