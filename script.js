// =========================================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO - TechNova
// =========================================================

// 1. Referencias a los elementos del DOM
const contactForm = document.getElementById('contactForm');

const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const mensajeInput = document.getElementById('mensaje');

const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorMensaje = document.getElementById('errorMensaje');

const successMessage = document.getElementById('successMessage');

// 2. Expresión regular para validar el formato de correo electrónico
//    Estructura esperada: usuario@dominio.extension
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 3. Capturamos el evento 'submit' del formulario
contactForm.addEventListener('submit', function (event) {
  // Evitamos que la página se recargue al enviar el formulario
  event.preventDefault();

  // Bandera que indica si el formulario es válido en su totalidad
  let formularioValido = true;

  // ---------------------------------------------------------
  // Reiniciamos los mensajes de error y de éxito en cada envío
  // ---------------------------------------------------------
  limpiarErrores();
  ocultarMensajeExito();

  // ---------------------------------------------------------
  // Validación: Nombre no debe estar vacío
  // ---------------------------------------------------------
  const nombre = nombreInput.value.trim();
  if (nombre === '') {
    mostrarError(errorNombre, 'El nombre es obligatorio.');
    formularioValido = false;
  }

  // ---------------------------------------------------------
  // Validación: Correo no debe estar vacío y debe tener formato válido
  // ---------------------------------------------------------
  const correo = correoInput.value.trim();
  if (correo === '') {
    mostrarError(errorCorreo, 'El correo electrónico es obligatorio.');
    formularioValido = false;
  } else if (!regexCorreo.test(correo)) {
    mostrarError(errorCorreo, 'Debe ser un correo válido (ej. usuario@dominio.com)');
    formularioValido = false;
  }

  // ---------------------------------------------------------
  // Validación: Mensaje no debe estar vacío
  // (El campo "Asunto" es opcional, por lo tanto no se valida)
  // ---------------------------------------------------------
  const mensaje = mensajeInput.value.trim();
  if (mensaje === '') {
    mostrarError(errorMensaje, 'El mensaje es obligatorio.');
    formularioValido = false;
  }

  // ---------------------------------------------------------
  // Si todas las validaciones pasaron correctamente:
  // ---------------------------------------------------------
  if (formularioValido) {
    // Limpiamos cualquier mensaje de error remanente
    limpiarErrores();

    // Mostramos el mensaje de éxito en verde
    mostrarMensajeExito();

    // Reseteamos el formulario (deja los campos vacíos)
    contactForm.reset();
  }
});

// =========================================================
// FUNCIONES AUXILIARES
// =========================================================

/**
 * Muestra un mensaje de error dentro del contenedor indicado.
 * @param {HTMLElement} elemento - Contenedor donde se mostrará el error.
 * @param {string} texto - Mensaje de error a mostrar.
 */
function mostrarError(elemento, texto) {
  elemento.textContent = texto;
}

/**
 * Limpia todos los mensajes de error del formulario.
 */
function limpiarErrores() {
  errorNombre.textContent = '';
  errorCorreo.textContent = '';
  errorMensaje.textContent = '';
}

/**
 * Muestra el mensaje de confirmación de envío exitoso.
 */
function mostrarMensajeExito() {
  successMessage.style.display = 'block';
}

/**
 * Oculta el mensaje de confirmación de envío exitoso.
 */
function ocultarMensajeExito() {
  successMessage.style.display = 'none';
}