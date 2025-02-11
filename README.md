# Encuesta de Satisfacción

Este proyecto es una aplicación de encuesta de satisfacción creada con Next.js y React.

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Crea una nueva carpeta para el proyecto y abre VS Code**:

   \`\`\`shellscript
   mkdir encuesta-satisfaccion
   cd encuesta-satisfaccion
   code .
   \`\`\`

2. **Crea un nuevo proyecto Next.js**:

   \`\`\`shellscript
   npx create-next-app@latest .
   \`\`\`

   Selecciona estas opciones:
   - Would you like to use TypeScript? → Yes
   - Would you like to use ESLint? → Yes
   - Would you like to use Tailwind CSS? → Yes
   - Would you like to use \`src/\` directory? → No
   - Would you like to use App Router? → Yes
   - Would you like to customize the default import alias? → No

3. **Instala las dependencias adicionales**:

   \`\`\`shellscript
   npm install framer-motion lucide-react @radix-ui/react-radio-group
   \`\`\`

4. **Instala los componentes de shadcn/ui**:

   \`\`\`shellscript
   npx shadcn@latest init
   \`\`\`

   (Acepta las opciones predeterminadas)

   \`\`\`shellscript
   npx shadcn@latest add card button radio-group label
   \`\`\`

5. **Crea la estructura de archivos**:

   - Crea una carpeta \`components\` si no existe
   - Copia el código de \`survey-form.tsx\` en \`components/survey-form.tsx\`
   - Modifica \`app/layout.tsx\` con el código proporcionado
   - Modifica \`next.config.mjs\` con el código proporcionado

6. **Modifica \`app/page.tsx\`**:

   Reemplaza el contenido con el código proporcionado.

7. **Para cambiar el puerto a 3010**, modifica el script "dev" en \`package.json\`:

   \`\`\`json
   {
     "scripts": {
       "dev": "next dev -p 3010",
       "build": "next build",
       "start": "next start",
       "lint": "next lint"
     }
   }
   \`\`\`

8. **Ejecuta el proyecto**:

   \`\`\`shellscript
   npm run dev
   \`\`\`

9. **Abre tu navegador** y ve a:

   \`\`\`plaintext
   http://localhost:3010
   \`\`\`

Ahora deberías ver la encuesta con:

- Un fondo de restaurante
- Imágenes relacionadas con cada pregunta
- Efectos de desenfoque y transparencia
- Animaciones suaves
- Iconos de emoticonos coloridos
- El título "Encuesta de Satisfacción" en el navegador
- Ejecutándose en el puerto 3010

Si encuentras algún error o necesitas ayuda adicional, ¡házmelo saber!

