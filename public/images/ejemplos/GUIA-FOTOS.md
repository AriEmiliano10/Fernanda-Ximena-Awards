# 📸 Guía de Links para Ejemplos de Vestuario

## 🌐 Sistema Optimizado con URLs Externas

Este proyecto usa links directos de imágenes para mejor rendimiento y facilidad de actualización.

## 📝 Cómo Agregar tus Imágenes

### Opción 1: Usar Google Drive (Recomendado)
1. Sube tu imagen a Google Drive
2. Click derecho → "Obtener enlace" → Cambiar a "Cualquier persona con el enlace"
3. Copia el ID del link (la parte entre `/d/` y `/view`)
4. Usa este formato: `https://drive.google.com/uc?export=view&id=TU_ID_AQUI`

**Ejemplo:**
- Link original: `https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing`
- ID: `1ABC123xyz`
- Link para usar: `https://drive.google.com/uc?export=view&id=1ABC123xyz`

### Opción 2: Imgur (Gratis y Rápido)
1. Ve a [imgur.com](https://imgur.com)
2. Sube tu imagen (no necesitas cuenta)
3. Click derecho en la imagen → "Copiar enlace de imagen"
4. Pega el link directo (debe terminar en `.jpg`, `.png`, etc.)

### Opción 3: Otros servicios
- **Dropbox**: Cambia `dl=0` por `dl=1` al final del link
- **OneDrive**: Usa el enlace de descarga directa
- **imgbb.com**: Hosting gratuito de imágenes
- **cloudinary.com**: CDN profesional

## 🎯 Dónde Pegar los Links

Ve al archivo **`constants.tsx`** y busca estas secciones:

### 📁 Categoría CLÁSICOS (6 imágenes)
```tsx
{ character: 'Audrey Hepburn', movie: 'Desayuno con Diamantes', image: 'TU_LINK_AQUI' },
{ character: 'James Dean', movie: 'Rebelde sin Causa', image: 'TU_LINK_AQUI' },
{ character: 'Marilyn Monroe', movie: 'La Tentación Vive Arriba', image: 'TU_LINK_AQUI' },
{ character: 'Vito Corleone', movie: 'El Padrino', image: 'TU_LINK_AQUI' },
{ character: 'Holly Golightly', movie: 'Breakfast at Tiffany\'s', image: 'TU_LINK_AQUI' },
{ character: 'Charlie Chaplin', movie: 'El Vagabundo', image: 'TU_LINK_AQUI' }
```

### 📁 Categoría MODERNOS (6 imágenes)
```tsx
{ character: 'Barbie', movie: 'Barbie', image: 'TU_LINK_AQUI' },
{ character: 'Ken', movie: 'Barbie', image: 'TU_LINK_AQUI' },
{ character: 'Harley Quinn', movie: 'Escuadrón Suicida', image: 'TU_LINK_AQUI' },
{ character: 'Wednesday Addams', movie: 'Wednesday', image: 'TU_LINK_AQUI' },
{ character: 'Cruella de Vil', movie: 'Cruella', image: 'TU_LINK_AQUI' },
{ character: 'Mia Wallace', movie: 'Pulp Fiction', image: 'TU_LINK_AQUI' }
```

### 📁 Categoría SCI-FI (6 imágenes)
```tsx
{ character: 'Neo', movie: 'The Matrix', image: 'TU_LINK_AQUI' },
{ character: 'Trinity', movie: 'The Matrix', image: 'TU_LINK_AQUI' },
{ character: 'Leia Organa', movie: 'Star Wars', image: 'TU_LINK_AQUI' },
{ character: 'Darth Vader', movie: 'Star Wars', image: 'TU_LINK_AQUI' },
{ character: 'Leeloo', movie: 'El Quinto Elemento', image: 'TU_LINK_AQUI' },
{ character: 'Furiosa', movie: 'Mad Max', image: 'TU_LINK_AQUI' }
```

### 📁 Categoría FANTASÍA (6 imágenes)
```tsx
{ character: 'Harry Potter', movie: 'Harry Potter', image: 'TU_LINK_AQUI' },
{ character: 'Hermione Granger', movie: 'Harry Potter', image: 'TU_LINK_AQUI' },
{ character: 'Elphaba', movie: 'Wicked', image: 'TU_LINK_AQUI' },
{ character: 'Glinda (RESERVADO)', movie: 'Wicked', image: 'TU_LINK_AQUI' },
{ character: 'Maleficent', movie: 'Maléfica', image: 'TU_LINK_AQUI' },
{ character: 'Gandalf', movie: 'El Señor de los Anillos', image: 'TU_LINK_AQUI' }
```

## ⚙️ Especificaciones Técnicas

### Formato de Imagen Recomendado:
- **Formato:** JPG, PNG o WebP
- **Aspecto:** 2:3 (vertical/retrato)
- **Resolución:** 600x900px o superior
- **Peso:** Menor a 1MB (idealmente 500KB)

### Consejos para Mejores Resultados:
1. ✅ Fotos de cuerpo completo del vestuario
2. ✅ Buena iluminación y calidad
3. ✅ Fondo neutro o que no distraiga
4. ✅ Usar URLs directas (que terminen en .jpg, .png, etc.)
5. ✅ Probar el link en el navegador antes de pegarlo

## 🚀 Ventajas de Usar Links Externos

- ⚡ **Carga más rápida**: Las imágenes se descargan desde CDNs optimizados
- 📦 **Proyecto más liviano**: No ocupas espacio en tu repositorio
- 🔄 **Fácil actualización**: Cambias el link y listo
- 🌐 **Compatible con hosting**: Funciona en cualquier servidor

## ✨ Placeholder Automático

Si un link no funciona o no has agregado la imagen todavía, el sistema automáticamente muestra un placeholder elegante con el mensaje "Agrega tu foto aquí".

## 🎨 Personalización

Puedes cambiar los nombres de personajes y películas editando directamente en `constants.tsx`. Solo reemplaza el texto entre comillas.
