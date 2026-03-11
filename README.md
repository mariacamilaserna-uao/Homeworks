# 📱 Gestor de Contactos

Una aplicación React moderna para gestionar tus contactos de forma sencilla y eficiente.

## Características

✅ **Cargador animado** - Simula la carga inicial de datos con un spinner profesional
✅ **Lista de contactos** - Visualiza todos tus contactos organizados
✅ **Añadir contactos** - Formulario intuitivo para crear nuevos contactos
✅ **Eliminar contactos** - Elimina contactos con un solo clic
✅ **Componentes modulares** - Estructura limpia y reutilizable
✅ **Diseño responsivo** - Funciona perfectamente en cualquier dispositivo

## Estructura del Proyecto

```
src/
├── components/
│   ├── Loading.tsx        # Componente de cargador
│   ├── ContactForm.tsx    # Formulario para añadir contactos
│   ├── ContactList.tsx    # Lista de contactos
│   └── ContactItem.tsx    # Componente individual de contacto
├── styles/
│   ├── App.css           # Estilos principales
│   ├── Loading.css       # Estilos del cargador
│   ├── ContactForm.css   # Estilos del formulario
│   ├── ContactList.css   # Estilos de la lista
│   └── ContactItem.css   # Estilos del elemento
├── App.tsx               # Componente principal
└── main.tsx              # Punto de entrada
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

## Construcción

```bash
npm run build
```

## Conceptos React Utilizados

- **useState** - Gestión de estado de contactos y cargador
- **useEffect** - Simulación de carga de datos asincrónica
- **Props** - Comunicación entre componentes
- **Type TypeScript** - Tipado seguro de la aplicación

## Flujo de la Aplicación

1. Al cargar la aplicación, se muestra un cargador durante 2 segundos
2. Después se carga la lista inicial de contactos
3. Los usuarios pueden:
   - Ver todos los contactos en la lista
   - Añadir nuevos contactos mediante el formulario
   - Eliminar contactos existentes

## Datos Iniciales

La aplicación carga con 4 contactos de ejemplo:
- Juan García
- María López
- Carlos Rodríguez
- Ana Martínez

## Estilos

La aplicación utiliza:
- CSS moderno con gradientes y transiciones
- Diseño limpio y minimalista
- Colores: púrpura (#667eea), rojo (#ff6b6b) y grises
- Fuente: Segoe UI / Sistema de fuentes del dispositivo
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
