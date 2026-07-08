let adminContent = loadLocalContent() || JSON.parse(JSON.stringify(defaultContent));

const newsEditor = document.querySelector("[data-news-editor]");
const workshopEditor = document.querySelector("[data-workshop-editor]");

function createEditorCard(templateId, item, onUpdate, onRemove) {
  const template = document.getElementById(templateId);
  const node = template.content.firstElementChild.cloneNode(true);
  const linkConfigFields = node.querySelectorAll("[data-link-config]");

  function syncLinkConfig() {
    const enabled = Boolean(item.useLink);
    linkConfigFields.forEach((field) => {
      field.hidden = !enabled;
    });
  }

  node.querySelectorAll("[data-field]").forEach((field) => {
    const key = field.dataset.field;

    if (field.type === "checkbox") {
      field.checked = Boolean(item[key]);
      field.addEventListener("change", () => {
        onUpdate(key, field.checked);
        item[key] = field.checked;
        syncLinkConfig();
      });
      return;
    }

    field.value = item[key] || "";
    field.addEventListener("input", () => onUpdate(key, field.value));
  });

  node.querySelector("[data-image-file]")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      item.image = reader.result;
      const imageInput = node.querySelector('[data-field="image"]');
      if (imageInput) imageInput.value = item.image;
    });
    reader.readAsDataURL(file);
  });

  node.querySelector("[data-remove]").addEventListener("click", onRemove);
  syncLinkConfig();
  return node;
}

function showAdminPanel(panelName) {
  document.querySelectorAll("[data-admin-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.adminPanel !== panelName;
  });

  document.querySelectorAll("[data-admin-panel-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.adminPanelTarget === panelName);
  });
}

function renderAdmin() {
  newsEditor.innerHTML = "";
  workshopEditor.innerHTML = "";

  adminContent.news.forEach((item, index) => {
    newsEditor.append(
      createEditorCard(
        "news-template",
        item,
        (key, value) => {
          adminContent.news[index][key] = value;
        },
        () => {
          adminContent.news.splice(index, 1);
          renderAdmin();
        },
      ),
    );
  });

  adminContent.workshops.forEach((item, index) => {
    workshopEditor.append(
      createEditorCard(
        "workshop-template",
        item,
        (key, value) => {
          adminContent.workshops[index][key] = value;
        },
        () => {
          adminContent.workshops.splice(index, 1);
          renderAdmin();
        },
      ),
    );
  });
}

document.querySelector("[data-save]").addEventListener("click", () => {
  // Guarda en el navegador (como ya lo hacía)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(adminContent));
  
  // Envía los datos al archivo api.php en Hostinger
  saveToHostinger(adminContent);
  
  alert("Contenido guardado en el navegador y sincronizado en el servidor.");
});

document.querySelector("[data-add-news]").addEventListener("click", () => {
  adminContent.news.unshift({
    title: "Nueva noticia",
    category: "Novedad",
    date: new Date().toISOString().slice(0, 10),
    summary: "",
    image: "",
    useLink: false,
    linkLabel: "Ver más",
    link: "",
  });
  renderAdmin();
});

document.querySelector("[data-add-workshop]").addEventListener("click", () => {
  adminContent.workshops.unshift({
    title: "Nuevo taller",
    date: "",
    place: "",
    description: "",
    formUrl: "https://forms.gle/",
  });
  renderAdmin();
});

document.querySelectorAll("[data-admin-panel-target]").forEach((button) => {
  button.addEventListener("click", () => showAdminPanel(button.dataset.adminPanelTarget));
});

showAdminPanel("noticias");
renderAdmin();
// Función para guardar directamente en la base de datos de Hostinger
function saveToHostinger(data) {
    fetch('/api.php', { // <--- Le sacamos un punto y dejamos una sola barra "/"
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'ideal-moreno-content',
            content: data
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            console.log('Sincronizado con Hostinger correctamente.');
        } else {
            console.error('Error en el servidor:', result.message);
        }
    })
    .catch(error => {
        console.error('Error de red al conectar con Hostinger:', error);
    });
}
