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
      mostrarError(
        errorCorreo,
        'Debe ser un correo válido (ej. usuario@dominio.com)'
      );
      formularioValido = false;
    }

    const mensaje = mensajeInput.value.trim();
    if (mensaje === '') {
      mostrarError(errorMensaje, 'El mensaje es obligatorio.');
      formularioValido = false;
    }

    if (formularioValido) {
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
// DATOS DE NOTICIAS
// =========================================================

const noticias = [
  {
    id: 1,
    titulo: "Noticia 1",
    desc: "Descripción breve de la noticia 1",
    categoria: "tecnologia",
    fecha: "2026-09-01",
    contenido: "Contenido completo de la noticia 1."
  },
  {
    id: 2,
    titulo: "Noticia 2",
    desc: "Descripción breve de la noticia 2",
    categoria: "ciencia",
    fecha: "2026-09-02",
    contenido: "Contenido completo de la noticia 2."
  },
  {
    id: 3,
    titulo: "Noticia 3",
    desc: "Descripción breve de la noticia 3",
    categoria: "videojuegos",
    fecha: "2026-09-03",
    contenido: "Contenido completo de la noticia 3."
  },
  {
    id: 4,
    titulo: "Noticia 4",
    desc: "Descripción breve de la noticia 4",
    categoria: "tecnologia",
    fecha: "2026-09-04",
    contenido: "Contenido completo de la noticia 4."
  },
  {
    id: 5,
    titulo: "Noticia 5",
    desc: "Descripción breve de la noticia 5",
    categoria: "ciencia",
    fecha: "2026-09-05",
    contenido: "Contenido completo de la noticia 5."
  },
  {
    id: 6,
    titulo: "Noticia 6",
    desc: "Descripción breve de la noticia 6",
    categoria: "videojuegos",
    fecha: "2026-09-06",
    contenido: "Contenido completo de la noticia 6."
  },
  {
    id: 7,
    titulo: "Noticia 7",
    desc: "Descripción breve de la noticia 7",
    categoria: "tecnologia",
    fecha: "2026-09-07",
    contenido: "Contenido completo de la noticia 7."
  },
  {
    id: 8,
    titulo: "Noticia 8",
    desc: "Descripción breve de la noticia 8",
    categoria: "ciencia",
    fecha: "2026-09-08",
    contenido: "Contenido completo de la noticia 8."
  },
  {
    id: 9,
    titulo: "Noticia 9",
    desc: "Descripción breve de la noticia 9",
    categoria: "videojuegos",
    fecha: "2026-09-09",
    contenido: "Contenido completo de la noticia 9."
  }
];

// =========================================================
// LISTADO DE NOTICIAS
// =========================================================

let paginaActual = 1;
const itemsPorPagina = 6;
let filtroTexto = '';
let filtroCategoria = 'todas';

const grid = document.getElementById('newsGrid');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

if (grid && paginationContainer) {
  function renderizarNoticias() {
    const noticiasFiltradas = noticias.filter((noticia) => {
      const coincideTexto = noticia.titulo
        .toLowerCase()
        .includes(filtroTexto.toLowerCase());

      const coincideCategoria =
        filtroCategoria === 'todas' ||
        noticia.categoria === filtroCategoria;

      return coincideTexto && coincideCategoria;
    });

    const totalPaginas =
      Math.ceil(noticiasFiltradas.length / itemsPorPagina);

    if (paginaActual > totalPaginas && totalPaginas > 0) {
      paginaActual = totalPaginas;
    }

    if (paginaActual < 1) {
      paginaActual = 1;
    }

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;

    const noticiasPaginadas =
      noticiasFiltradas.slice(inicio, fin);

    grid.innerHTML = '';
    paginationContainer.innerHTML = '';

    if (noticiasPaginadas.length === 0) {
      grid.innerHTML = '<p>No se encontraron noticias.</p>';
    } else {
      noticiasPaginadas.forEach((noticia) => {
        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
          <div class="card-image">IMAGE</div>
          <div class="card-content">
              <h3>${noticia.titulo}</h3>
              <p>${noticia.desc}</p>
              <button class="btn-ver-mas" data-id="${noticia.id}">
                Ver Más
              </button>
          </div>
        `;

        grid.appendChild(card);

        const botonVerMas =
          card.querySelector('.btn-ver-mas');

        botonVerMas.addEventListener('click', () => {
          window.location.href =
            `detallenoticia.html?id=${noticia.id}`;
        });
      });
    }

    if (totalPaginas > 1) {
      for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');

        btn.classList.add('page-btn');

        if (i === paginaActual) {
          btn.classList.add('active');
        }

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

// =========================================================
// DETALLE DE NOTICIA
// =========================================================


const detalleNoticia = document.getElementById('detalleNoticia');

if (detalleNoticia) {

    // Obtener ID desde la URL
    const parametros = new URLSearchParams(window.location.search);

    const idNoticia = parametros.get('id');


    // Buscar noticia
    const noticia = noticias.find(
        n => n.id == idNoticia
    );


    // Si existe la noticia
    if (noticia) {

        // Buscar noticias relacionadas
        const noticiasRelacionadas = noticias
            .filter(n => 
                n.categoria === noticia.categoria && 
                n.id !== noticia.id
            )
            .slice(0, 3);


        // Construir noticias relacionadas

        let relacionadasHTML = '';

        noticiasRelacionadas.forEach(relacionada => {

            relacionadasHTML += `

                <a 
                    href="detalleNoticia.html?id=${relacionada.id}"
                    class="noticia-relacionada"
                >

                    <div class="relacionada-imagen">
                        IMAGE
                    </div>

                    <div class="relacionada-titulo">
                        ${relacionada.titulo}
                    </div>

                </a>

            `;

        });


        // Si no hay relacionadas

        if (noticiasRelacionadas.length === 0) {

            relacionadasHTML = `
                <p class="text-muted">
                    No hay noticias relacionadas.
                </p>
            `;

        }


        // Construir detalle

        detalleNoticia.innerHTML = `

            <!-- IMAGEN PRINCIPAL -->

            <div class="detalle-imagen-principal">

                ${
                    noticia.imagen

                    ?

                    `<img 
                        src="${noticia.imagen}" 
                        alt="${noticia.titulo}"
                    >`

                    :

                    `<span class="detalle-imagen-placeholder">
                        IMAGE
                    </span>`
                }

            </div>


            <!-- TITULO -->

            <h1 class="detalle-titulo">
                ${noticia.titulo}
            </h1>


            <!-- FECHA Y CATEGORIA -->

            <div class="detalle-meta">

                Publicado:
                <strong>
                    ${noticia.fecha || '10/09/2026'}
                </strong>

                &nbsp; | &nbsp;

                Categoría:
                <strong>
                    ${noticia.categoria}
                </strong>

            </div>


            <!-- CONTENIDO + RELACIONADAS -->

            <div class="detalle-layout">


                <!-- CONTENIDO PRINCIPAL -->

                <div class="detalle-contenido">

                    <p>
                        ${noticia.desc}
                    </p>


                    <p>
                        ${noticia.contenido || `
                            Este es el contenido completo de la noticia.
                            Aquí se puede mostrar toda la información
                            relacionada con la noticia seleccionada.
                        `}
                    </p>


                    <!-- IMAGEN SECUNDARIA -->

                    <div class="detalle-imagen-secundaria">

                        IMAGE

                    </div>


                    <!-- BOTONES -->

                    <div class="detalle-acciones">

                        <button 
                            class="btn-favorito-noticia"
                            onclick="agregarFavorito(${noticia.id})"
                        >

                            ★ Agregar a Favoritos

                        </button>


                        <a 
                            href="Contacto.html"
                            class="btn-contactar-noticia"
                        >

                            Contactar

                        </a>

                    </div>

                </div>


                <!-- NOTICIAS RELACIONADAS -->

                <aside class="noticias-relacionadas">

                    <h3>
                        Noticias Relacionadas
                    </h3>

                    ${relacionadasHTML}

                </aside>


            </div>

        `;

    } 
    
    else {

        // Si no existe la noticia

        detalleNoticia.innerHTML = `

            <div class="alert alert-danger">

                <h4>
                    Noticia no encontrada
                </h4>

                <p>
                    La noticia que estás buscando no existe.
                </p>

                <a 
                    href="listadoNoticias.html"
                    class="btn btn-primary"
                >
                    Volver a noticias
                </a>

            </div>

        `;

    }

}
