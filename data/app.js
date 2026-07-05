const STORAGE_KEY = "ideal-moreno-content";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ideal_moreno/",
  facebook: "https://www.facebook.com/idealmorenoo",
  whatsapp: "https://wa.me/5491164049329",
};

const IDEAL_LINKS = {
  avellaneda: "https://www.idealavellaneda.com.ar/",
  bahia: "https://www.idealbahiablanca.com.ar/",
  quilmes: "https://www.idealquilmes.com.ar/",
  lanus: "https://www.instagram.com/idealanus/",
  matanza: "https://www.idealmatanza.org.ar/",
  brown: "https://www.instagram.com/ideal_brown/",
  inicio: "#inicio",
};

const MAPS_QUERY = "Sanabria+942,+Moreno,+Buenos+Aires,+Argentina";
const DIRECTIONS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

function getDataBasePath() {
  const script = document.currentScript;
  if (!script || !script.src) {
    return "data/";
  }
  const url = new URL(script.src, window.location.href);
  return url.pathname.replace(/\/[^/]*$/, "/");
}

const CONTENT_PATH = `${getDataBasePath()}content.json`;

let currentPage = null;

const defaultContent = {
  areas: [
    {
      key: "identidad-local",
      title: "Identidad local, participación ciudadana y comunidad organizada",
      description:
        "Promueve el sentido de pertenencia morenense, la participación ciudadana activa y la organización comunitaria como herramientas para transformar la realidad local. Genera espacios de encuentro, debate y acción colectiva para abordar problemáticas, demandas, proyectos y sueños de la comunidad, trabajando de forma transversal con otras comisiones.",
    },
    {
      key: "generos-y-diversidad",
      title: "Géneros, nuevas masculinidades y diversidad sexual",
      description:
        "Trabaja para construir una comunidad con igualdad de géneros, respeto por la diversidad y vínculos libres de violencias. Promueve debates, talleres, campañas y redes de acompañamiento sobre feminismos populares, diversidad sexual, derechos conquistados y nuevas masculinidades, incorporando esta mirada de forma transversal en todas las áreas del Instituto.",
    },
    {
      key: "derechos-humanos",
      title: "Derechos humanos, acceso a la justicia y democracia",
      description:
        "Promueve el ejercicio pleno de los derechos individuales y colectivos, el acceso a la justicia y la participación democrática. Brinda orientación, acompañamiento y formación ciudadana, articulando con instituciones locales y mesas de trabajo sobre ciclo de vida, migrantes, economía, empleo y cooperativismo para fortalecer una comunidad más justa, solidaria y democrática.",
    },
    {
      key: "ambiente",
      title: "Ambiente",
      description:
        "Impulsa un ambientalismo popular con justicia social, entendiendo el ambiente como parte del derecho a vivir dignamente. Desarrolla proyectos de educación ambiental, cuidado del agua y el suelo, reforestación, manejo integral de residuos, prevención de la contaminación y propuestas de políticas públicas con participación comunitaria.",
    },
    {
      key: "salud-habitat",
      title: "Salud, hábitat y desarrollo comunitario",
      description:
        "Aborda la salud como un derecho humano integral, ligado al territorio, el ambiente y las condiciones de vida. Promueve prevención, formación, acompañamiento y redes institucionales mediante consejería en salud, trabajo sobre discapacidad, consumos problemáticos, hábitat y vivienda, fortaleciendo cuidados comunitarios y políticas públicas participativas.",
    },
    {
      key: "educacion-cultura-deporte",
      title: "Educación, cultura y deporte",
      description:
        "Concibe la educación, la cultura y el deporte como derechos y herramientas de transformación social. Impulsa experiencias de educación popular, talleres comunitarios y acciones contra la desigualdad educativa; promueve la cultura como identidad, memoria, resistencia y creatividad; y fortalece el deporte como espacio de inclusión, bienestar, valores y organización comunitaria, articulando con escuelas, clubes, centros culturales y organizaciones barriales.",
    },
  ],
  news: [
    {
      title: "Torneo de fútbol juvenil 2024",
      category: "Publicación",
      date: "2026-05-10",
      summary: "Una jornada a puro deporte, compañerismo y diversión.",
      image:
        "https://commons.wikimedia.org/wiki/Special:Redirect/file/Plaza%20San%20Mart%C3%ADn%20-%20panoramio%20(4).jpg",
      link: "#",
    },
    {
      title: "Jornada de ambientación",
      category: "Institucional",
      date: "2026-04-25",
      summary: "Plantamos futuro en comunidad con actividades para todas las edades.",
      image:
        "https://commons.wikimedia.org/wiki/Special:Redirect/file/Estaci%C3%B3n%20Moreno.jpg",
      link: "#",
    },
    {
      title: "Taller de escritura creativa",
      category: "Formación",
      date: "2026-04-15",
      summary: "Exploramos ideas y damos forma a nuevas historias.",
      image:
        "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moreno%2C%20Buenos%20Aires%20Province%2C%20Argentina%20-%20panoramio%20%28226%29.jpg",
      link: "#",
    },
  ],
  workshops: [
    {
      title: "Taller de herramientas digitales para organizaciones",
      date: "Sábado 6 de junio | 10:00 hs",
      place: "Moreno centro",
      description:
        "Uso práctico de formularios, redes sociales y piezas de comunicación para actividades barriales.",
      formUrl: "https://forms.gle/",
    },
    {
      title: "Introducción a la gestión de proyectos comunitarios",
      date: "Miércoles 17 de junio | 18:00 hs",
      place: "Modalidad híbrida",
      description:
        "Planificación, objetivos, cronograma y seguimiento para iniciativas sociales y educativas.",
      formUrl: "https://forms.gle/",
    },
  ],
};

function loadLocalContent() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

async function getContent() {
  const local = loadLocalContent();
  if (local) return local;

  try {
    const response = await fetch(CONTENT_PATH);
    if (response.ok) return await response.json();
  } catch {
    return defaultContent;
  }

  return defaultContent;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function renderSocialLinks() {
  document.querySelectorAll("[data-social-instagram]").forEach((link) => {
    link.href = SOCIAL_LINKS.instagram;
  });
  document.querySelectorAll("[data-social-facebook]").forEach((link) => {
    link.href = SOCIAL_LINKS.facebook;
  });
  document.querySelectorAll("[data-social-whatsapp]").forEach((link) => {
    link.href = SOCIAL_LINKS.whatsapp;
  });
}

function renderIdealLinks() {
  document.querySelectorAll("[data-ideal-link]").forEach((link) => {
    const key = link.dataset.idealLink;
    link.href = IDEAL_LINKS[key] || "#";
  });
}

function renderMapLinks() {
  document.querySelectorAll("[data-directions-link]").forEach((link) => {
    link.href = DIRECTIONS_LINK;
  });
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseHash() {
  const hash = window.location.hash.slice(1);
  const [page = "", query = ""] = hash.split("?");
  return {
    page: page || "inicio",
    params: new URLSearchParams(query),
  };
}

function getSelectedAreaKey(content, selectedKey) {
  if (!selectedKey) return content.areas[0]?.key || slugify(content.areas[0]?.title || "");
  const normalized = String(selectedKey).toLowerCase();
  const areaKeys = content.areas.map((area) => (area.key || slugify(area.title)).toLowerCase());
  return areaKeys.includes(normalized) ? normalized : areaKeys[0];
}

function renderAreas(content, selectedKey) {
  const normalizedKey = selectedKey ? String(selectedKey).toLowerCase() : "";
  const selected =
    content.areas.find((area) => (area.key || slugify(area.title)).toLowerCase() === normalizedKey) ||
    content.areas[0];
  const areas = document.querySelector("[data-areas]");
  if (!areas) return;

  areas.innerHTML = `
    <div class="area-page-intro">
      <article class="area-intro-card">
        <div>
          <p>Las Comisiones de Trabajo del Instituto de Estudios y Administración Local de Moreno son el motor que impulsa el pensamiento crítico, la producción de conocimiento y la participación activa en nuestra comunidad. Concebidas como espacios de estudio, consulta y formación, están integradas por voluntarios, profesionales, técnicos y expertos unidos por un propósito común: aportar a la transformación de Moreno desde el conocimiento, el diálogo y la acción colectiva.</p>
          <p>Su objetivo principal es elaborar diagnósticos, propuestas y análisis que respondan directamente a la historia y a la agenda local. En estas comisiones, el saber técnico y el saber popular se complementan, promoviendo el trabajo colaborativo, la multidisciplina y un profundo compromiso con el territorio.</p>
          <p>A través de la investigación, la divulgación y el intercambio de ideas, construimos herramientas concretas para entender y actuar sobre las características sociales, ambientales, productivas, culturales y económicas de nuestro municipio. Se trata, en definitiva, de pensar y hacer, de reflexionar y proponer, y de escuchar para construir en conjunto.</p>
          <p>Para abarcar de manera integral los desafíos de la realidad local, el trabajo se organiza en las siguientes áreas temáticas:</p>
        </div>
      </article>
      <div class="area-layout">
        <aside class="area-menu">
          <div class="area-menu-list">
            ${content.areas
              .map((area) => {
                const areaKey = area.key || slugify(area.title);
                const isActive = areaKey === (selected.key || slugify(selected.title));
                return `
                  <button type="button" class="area-menu-item${isActive ? " is-active" : ""}" data-area-key="${areaKey}">
                    <span>${area.title}</span>
                    <span class="area-menu-icon">›</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </aside>
        <section class="area-detail">
          <div class="area-detail-card">
            <h3>${selected.title}</h3>
            <p>${selected.description}</p>
          </div>
        </section>
      </div>
    </div>
  `;

  areas.querySelectorAll("[data-area-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const cardKey = button.dataset.areaKey;
      window.location.hash = `areas?area=${cardKey}`;
    });
  });
}

function createNewsCard(item, index) {
  return `
    <article class="news-card" data-news-card="${index}">
      <img src="${item.image}" alt="" loading="lazy" />
      <div>
        <p class="card-meta">${item.category} · ${formatDate(item.date)}</p>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <button class="news-open-button" type="button" data-news-open="${index}">Abrir noticia</button>
      </div>
    </article>
  `;
}

let currentNewsItems = [];

function renderPublicSite(content) {
  currentNewsItems = content.news || [];
  const areas = document.querySelector("[data-areas]");
  const news = document.querySelector("[data-news]");
  const homeNews = document.querySelector("[data-home-news]");
  const workshops = document.querySelector("[data-workshops]");
  const { page, params } = parseHash();

  if (areas) {
    if (page === "areas") {
      renderAreas(content, params.get("area"));
    } else {
      areas.innerHTML = `
        <div class="area-commission-list standalone">
          ${content.areas
            .map(
              (area) => `
                <article class="area-commission-card">
                  <h3>${area.title}</h3>
                  <p>${area.description || "Próximamente se agregará la información de esta comisión."}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      `;
    }
  }

  if (homeNews) {
    homeNews.innerHTML = content.news.slice(0, 3).map(createNewsCard).join("");
  }

  if (news) {
    news.innerHTML = content.news.map(createNewsCard).join("");
  }

  if (workshops) {
    workshops.innerHTML = content.workshops
      .map(
        (item) => `
          <article class="workshop-card">
            <div>
              <p class="card-meta">${item.date}</p>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <small>${item.place}</small>
            </div>
            <a class="button button-primary" href="${item.formUrl}" target="_blank" rel="noreferrer">
              Inscribirme
            </a>
          </article>
        `,
      )
      .join("");
  }
}

function openNewsModal(index) {
  const item = currentNewsItems[index];
  const modal = document.querySelector("[data-news-modal]");
  if (!item || !modal) return;

  modal.querySelector("[data-news-modal-image]").src = item.image || "";
  modal.querySelector("[data-news-modal-meta]").textContent = `${item.category} · ${formatDate(item.date)}`;
  modal.querySelector("[data-news-modal-title]").textContent = item.title || "";
  modal.querySelector("[data-news-modal-summary]").textContent = item.summary || "";

  const link = modal.querySelector("[data-news-modal-link]");
  if (item.useLink && item.link && item.link !== "#") {
    link.hidden = false;
    link.href = item.link;
    link.textContent = item.linkLabel || "Ver más";
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeNewsModal() {
  const modal = document.querySelector("[data-news-modal]");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function showPage(page, params = new URLSearchParams()) {
  const availablePages = [...document.querySelectorAll("[data-view]")].map((view) => view.dataset.view);
  const nextPage = availablePages.includes(page) ? page : "inicio";

  document.querySelectorAll("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== nextPage;
  });

  if (nextPage === "areas") {
    getContent().then((content) => renderAreas(content, params.get("area")));
  }

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isActive =
      href === `#${nextPage}` ||
      (nextPage === "areas" && href.startsWith("#areas"));
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const pageChanged = nextPage !== currentPage;

  if (pageChanged) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentPage = nextPage;
  }
}

function initNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
  });

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      toggle?.classList.remove("is-active");
    });
  });

  window.addEventListener("hashchange", () => {
    const { page, params } = parseHash();
    showPage(page, params);
  });

  const { page, params } = parseHash();
  showPage(page, params);
}

function initNewsModal() {
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-news-open]");
    if (openButton) openNewsModal(Number(openButton.dataset.newsOpen));

    if (event.target.closest("[data-news-modal-close]")) closeNewsModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNewsModal();
  });
}

function initForms() {
  const contactForm = document.querySelector("[data-contact-form]");
  const note = document.querySelector("[data-form-note]");
  const newsletter = document.querySelector("[data-newsletter-form]");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:idealmoreno.instituto@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Se abrió tu cliente de correo para completar el envío.";
  });

  newsletter?.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletter.reset();
    newsletter.querySelector("input").placeholder = "Gracias por sumarte";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initNavigation();
  initForms();
  initNewsModal();
  renderSocialLinks();
  renderIdealLinks();
  renderMapLinks();
  renderPublicSite(await getContent());
});
