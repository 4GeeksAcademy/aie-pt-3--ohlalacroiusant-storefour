// Espera a que todo el contenido del HTML se haya cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA PARA EL MENÚ DESPLEGABLE DE USUARIO ---

  // Seleccionamos los elementos del DOM que necesitamos: el botón y el menú desplegable.
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenuDropdown = document.getElementById('user-menu-dropdown');

  /**
   * Muestra u oculta el menú desplegable con una transición suave.
   * @param {boolean} show - Si es `true`, muestra el menú; si es `false`, lo oculta.
   */
  function toggleDropdown(show) {
    // Verificamos si el menú ya está en el estado deseado para no hacer trabajo innecesario.
    const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';
    if (show === isExpanded) return;

    // Actualizamos el atributo 'aria-expanded' para mejorar la accesibilidad.
    userMenuButton.setAttribute('aria-expanded', show);

    if (show) {
      // Si vamos a mostrar el menú:
      // 1. Quitamos la clase 'hidden' para que sea visible.
      userMenuDropdown.classList.remove('hidden');
      
      // 2. Usamos `requestAnimationFrame` para asegurarnos de que el navegador aplique la transición CSS.
      requestAnimationFrame(() => {
        // Añadimos las clases que definen la animación de entrada.
        userMenuDropdown.classList.add('transition', 'ease-out', 'duration-100', 'transform', 'opacity-100', 'scale-100');
        // Quitamos las clases del estado inicial (oculto).
        userMenuDropdown.classList.remove('opacity-0', 'scale-95');
      });
    } else {
      // Si vamos a ocultar el menú:
      // 1. Quitamos las clases de la animación de entrada.
      userMenuDropdown.classList.remove('ease-out', 'duration-100', 'opacity-100', 'scale-100');
      // 2. Añadimos las clases que definen la animación de salida.
      userMenuDropdown.classList.add('ease-in', 'duration-75', 'opacity-0', 'scale-95');
      
      // 3. Después de que termine la animación (75ms), volvemos a añadir la clase 'hidden'.
      setTimeout(() => {
        userMenuDropdown.classList.add('hidden');
      }, 75);
    }
  }

  // --- EVENT LISTENERS ---

  // 1. Clic en el botón del menú:
  //    Abre o cierra el menú dependiendo de su estado actual.
  userMenuButton.addEventListener('click', (event) => {
    // Evitamos que el clic se propague al 'document' y cierre el menú inmediatamente.
    event.stopPropagation();
    const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';
    toggleDropdown(!isExpanded);
  });

  // 2. Clic fuera del menú:
  //    Si se hace clic en cualquier lugar del documento que no sea el menú o el botón, se cierra.
  document.addEventListener('click', (event) => {
    if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
      toggleDropdown(false);
    }
  });

  // 3. Tecla 'Escape':
  //    Permite al usuario cerrar el menú presionando la tecla Escape para mejorar la accesibilidad.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleDropdown(false);
    }
  });
});
