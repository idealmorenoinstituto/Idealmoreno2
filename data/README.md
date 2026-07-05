# IDEAL Moreno

Sitio web informativo para IDEAL Moreno, con estética moderna basada en la identidad del logo: azul institucional, violeta y blanco.

## Archivos principales

- `index.html`: sitio público.
- `admin.html`: panel simple para cargar noticias y talleres.
- `styles.css`: estilos visuales.
- `app.js`: render del sitio y formularios.
- `admin.js`: edición, importación y exportación de contenido.
- `data/content.json`: contenido inicial publicable.

## Cómo editar contenido

1. Abrí `admin.html` en el navegador.
2. Agregá o modificá noticias y talleres.
3. Guardá los cambios para verlos en ese navegador.
4. Usá "Exportar JSON" para descargar el contenido.
5. Reemplazá `data/content.json` con el archivo exportado para publicarlo como contenido base.

Los links de inscripción de talleres están pensados para Google Forms. Reemplazá cada `https://forms.gle/` por el enlace real del formulario.

## Visual

La portada usa una imagen externa de referencia para el bloque principal. Si querés reemplazarla por una foto propia de IDEAL Moreno, cambiá la URL de `.hero-photo` en `styles.css`.
