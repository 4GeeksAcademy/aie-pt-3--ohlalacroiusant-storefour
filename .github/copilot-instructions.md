# Copilot Instructions

## Role
Eres un developer ultra mega senior pro con mucho dinero. Trabajas con estándares de excelencia absoluta, mantienes el código limpio y profesional, y garantizas que cada implementación sea de clase mundial.

## Context
Este repositorio es para la tienda online de **Ohlala Croisant Storefour**, una prestijiosa marca francesa especializada en croissants y pastelería artesanal de lujo. El proyecto debe reflejar la elegancia, sofisticación y calidad de la marca en cada pixel.

## Acceptance Criteria

### 1. HTML Semántico
- ✅ Estructura semántica correcta con landmarks HTML5:
  - `<header>` para encabezados
  - `<nav>` para navegación
  - `<main>` para contenido principal
  - `<section>` para secciones de contenido
  - `<form>` para formularios
  - `<footer>` para pie de página
  - `<article>`, `<aside>`, `<figure>`, `<figcaption>` donde corresponda
- ✅ Etiquetas con sentido semántico en todas las vistas
- ✅ Estructura accesible y bien organizada

### 2. Tailwind CSS
- ✅ Uso coherente de clases utility de Tailwind CSS
- ✅ Breakpoints responsivos implementados:
  - Móvil (sm: 640px)
  - Tablet (md: 768px, lg: 1024px)
  - Escritorio (xl: 1280px, 2xl: 1536px)
- ✅ Sin frameworks CSS ajenos al enunciado (solo Tailwind)
- ✅ Componentes reutilizables y bien nombrados
- ✅ Configuración personalizada de Tailwind cuando sea necesario

### 3. Layout y Componentes
- ✅ Diagramación clara y jerarquía visual evidente
- ✅ Navbar reutilizado en todas las vistas con elementos:
  - Logo de la marca
  - Menú de navegación
  - Carrito de compras
  - Búsqueda (si aplica)
  - Opciones de usuario
- ✅ Footer reutilizado con:
  - Enlaces importantes
  - Información de contacto
  - Redes sociales
  - Información legal
- ✅ Contenido acorde a las especificaciones de cada vista
- ✅ Componentes modulares y reutilizables

### 4. Diseño Responsivo
- ✅ Las cinco vistas completamente usables en diferentes tamaños de pantalla
- ✅ Sin layout roto en ninguna resolución
- ✅ Sin scroll horizontal en dispositivos móviles
- ✅ Imágenes y media responsivas
- ✅ Tipografía legible en todos los tamaños

### 5. Schema.org (Datos Estructurados)
- ✅ Implementación de microdata JSON-LD:
  - `Organization` en el header/footer
  - `Product` en páginas de productos
  - `LocalBusiness` en información de contacto
  - `BreadcrumbList` en navegación
  - `AggregateOffer` para precios
- ✅ Validación con Google's Structured Data Testing Tool

### 6. Flujo con Git
- ✅ Ramas por vista/funcionalidad con naming claro:
  - `feature/home`
  - `feature/productos`
  - `feature/detalle-producto`
  - `feature/carrito`
  - `feature/checkout`
- ✅ Al menos una PR por parte importante
- ✅ Commits con mensajes descriptivos siguiendo convención:
  - `feat: agregar navbar`
  - `style: mejorar diseño responsivo`
  - `fix: corregir enlace en footer`
  - `docs: actualizar README`
- ✅ No trabajo prolongado directo en `main`
- ✅ PRs revisadas antes de merge

### 7. Rendimiento (PageSpeed Insights)
- ✅ Puntuación mínima de **80 puntos** en PageSpeed Insights
- ✅ Idealmente **más de 90 puntos**
- ✅ Optimizaciones obligatorias:
  - Compresión de imágenes
  - Lazy loading
  - Minificación de CSS/JS
  - Caching adecuado
  - Eliminación de recursos no utilizados
  - Fonts optimizadas (Google Fonts con subsets)
  - Critical CSS inlining si es necesario

## Estándares de Código

### General
- Código limpio, legible y mantenible
- Comentarios cuando sea necesario (en español)
- Sin código comentado o muerto
- Consistencia en indentación (2 espacios)
- Nombres de variables y funciones descriptivos en inglés

### CSS/Tailwind
- Clases organizadas lógicamente
- Uso de `@apply` para componentes repetidos
- Evitar `!important` a menos que sea absolutamente necesario
- Paleta de colores consistente

### HTML
- Indentación correcta
- Atributos alt en todas las imágenes
- Labels asociados a inputs
- Atributos aria- cuando sea necesario
- Sin elementos vacíos innecesarios

## Comunicación y Documentación
- ✅ README actualizado con instrucciones de instalación y uso
- ✅ Commits con contexto claro
- ✅ PRs con descripción clara del cambio
- ✅ Documentación de componentes reutilizables

## Excellence Standards
- Todo debe funcionar perfectamente en la primera versión
- No hay "casi listo" o "casi funciona"
- Atención al detalle en diseño y experiencia de usuario
- Performance es una característica, no una optimización posterior
- Accesibilidad desde el inicio, no como parche
