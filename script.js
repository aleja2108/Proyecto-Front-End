// =========================================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO - TechNova
// =========================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const mensajeInput = document.getElementById('mensaje');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');
  const errorMensaje = document.getElementById('errorMensaje');

  const successMessage = document.getElementById('successMessage');

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let formularioValido = true;

    limpiarErrores();
    ocultarMensajeExito();

    const nombre = nombreInput.value.trim();
    if (nombre === '') {
      mostrarError(errorNombre, 'El nombre es obligatorio.');
      formularioValido = false;
    }

    const correo = correoInput.value.trim();
    if (correo === '') {
      mostrarError(errorCorreo, 'El correo electrónico es obligatorio.');
      formularioValido = false;
    } else if (!regexCorreo.test(correo)) {
      mostrarError(errorCorreo, 'Debe ser un correo válido (ej. usuario@dominio.com)');
      formularioValido = false;
    }

    const mensaje = mensajeInput.value.trim();
    if (mensaje === '') {
      mostrarError(errorMensaje, 'El mensaje es obligatorio.');
      formularioValido = false;
    }

    if (formularioValido) {
      limpiarErrores();
      mostrarMensajeExito();
      contactForm.reset();
    }
  });

  function mostrarError(elemento, texto) {
    elemento.textContent = texto;
  }

  function limpiarErrores() {
    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorMensaje.textContent = '';
  }

  function mostrarMensajeExito() {
    successMessage.style.display = 'block';
  }

  function ocultarMensajeExito() {
    successMessage.style.display = 'none';
  }
}

// =========================================================
// LÓGICA DEL CATÁLOGO DE NOTICIAS (LISTADO)
// =========================================================

const noticias = [
  { id: 1, titulo: "Noticia 1", desc: "Descripción breve ...", categoria: "tecnologia" },
  { id: 2, titulo: "Noticia 2", desc: "Descripción breve ...", categoria: "ciencia" },
  { id: 3, titulo: "Noticia 3", desc: "Descripción breve ...", categoria: "videojuegos" },
  { id: 4, titulo: "Noticia 4", desc: "Descripción breve ...", categoria: "tecnologia" },
  { id: 5, titulo: "Noticia 5", desc: "Descripción breve ...", categoria: "ciencia" },
  { id: 6, titulo: "Noticia 6", desc: "Descripción breve ...", categoria: "videojuegos" },
  { id: 7, titulo: "Noticia 7", desc: "Descripción breve ...", categoria: "tecnologia" },
  { id: 8, titulo: "Noticia 8", desc: "Descripción breve ...", categoria: "ciencia" },
  { id: 9, titulo: "Noticia 9", desc: "Descripción breve ...", categoria: "videojuegos" }
];

let paginaActual = 1;
const itemsPorPagina = 6;
let filtroTexto = "";
let filtroCategoria = "todas";

const grid = document.getElementById('newsGrid');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

if (grid) {
  function renderizarNoticias() {
    const noticiasFiltradas = noticias.filter(noticia => {
      const coincideTexto = noticia.titulo.toLowerCase().includes(filtroTexto.toLowerCase());
      const coincideCategoria = filtroCategoria === "todas" || noticia.categoria === filtroCategoria;
      return coincideTexto && coincideCategoria;
    });

    const totalPaginas = Math.ceil(noticiasFiltradas.length / itemsPorPagina);
    if (paginaActual > totalPaginas && totalPaginas > 0) paginaActual = totalPaginas;
    if (paginaActual < 1) paginaActual = 1;

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const noticiasPaginadas = noticiasFiltradas.slice(inicio, fin);

    grid.innerHTML = "";
    paginationContainer.innerHTML = "";

    if (noticiasPaginadas.length === 0) {
      grid.innerHTML = "<p>No se encontraron noticias.</p>";
    } else {
      noticiasPaginadas.forEach(noticia => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-image">IMAGE</div>
          <div class="card-content">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.desc}</p>
            <button class="btn-ver-mas">Ver Mas</button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    if (totalPaginas > 1) {
      for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.classList.add('page-btn');
        if (i === paginaActual) btn.classList.add('active');
        btn.textContent = i;
        btn.addEventListener('click', () => {
          paginaActual = i;
          renderizarNoticias();
        });
        paginationContainer.appendChild(btn);
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filtroTexto = e.target.value;
      paginaActual = 1;
      renderizarNoticias();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      filtroCategoria = e.target.value;
      paginaActual = 1;
      renderizarNoticias();
    });
  }

  renderizarNoticias();
}