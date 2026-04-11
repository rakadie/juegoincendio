LISTADO EXHAUSTIVO DE COMPONENTES Y EXTENSIONES PARA VS CODE
PROYECTO "GUARDIÁN DEL BOSQUE" - SIMULADOR NEXT.JS/REACT/TYPESCRIPT
Tabla de Contenidos
Metodología de Selección

Extensiones Core (Imprescindibles)

Extensiones para Next.js/React

Extensiones para TypeScript

Extensiones para Tailwind CSS

Extensiones para Testing (Jest/Cypress)

Extensiones para UI/UX y Visualización

Extensiones para Git y Colaboración

Extensiones de Productividad

Extensiones con IA (Opcional pero Recomendado)

Configuración Recomendada (settings.json)

Extension Packs Recomendados

1. Metodología de Selección
Este listado ha sido elaborado específicamente para el stack tecnológico definido en el documento de especificaciones:

Tecnología	Versión	Rol en el proyecto
Next.js	14.x	Framework principal
React	18.x	Librería UI
TypeScript	5.x	Lenguaje
Tailwind CSS	3.x	Estilos
Zustand	4.x	Estado global
Framer Motion	10.x	Animaciones
D3.js / Recharts	7.x / 2.x	Visualizaciones
Jest + React Testing Library	29.x	Testing unitario
Cypress	13.x	Testing E2E
Criterios de inclusión:

Relevancia directa con el stack tecnológico

Popularidad y mantenimiento activo (2024-2026)

Integración nativa con VS Code

Utilidad específica para las tareas del roadmap

2. Extensiones Core (Imprescindibles)
Estas extensiones son la base mínima para cualquier proyecto profesional. Deben instalarse primero. 

Extensión	ID en Marketplace	Por qué es necesaria	Configuración recomendada
ESLint	dbaeumer.vscode-eslint	IMPrescindible. Linting en tiempo real para TypeScript/JavaScript. Atrapa errores de sintaxis y malas prácticas antes de ejecutar el código. 	Habilitar "eslint.validate": ["typescript", "typescriptreact"]
Prettier - Code formatter	esbenp.prettier-vscode	IMPrescindible. Formateo automático de código. Garantiza consistencia en todo el equipo. 	"editor.formatOnSave": true, "prettier.requireConfig": true
Error Lens	usernamehw.errorlens	ALTAMENTE RECOMENDADO. Muestra los errores y warnings inline, directamente en la línea de código, no solo en el panel de problemas. 	"errorLens.enabled": true
Path Intellisense	christian-kohler.path-intellisense	ALTAMENTE RECOMENDADO. Autocompleta rutas de archivos en imports. Esencial en proyectos con estructura de carpetas compleja. 	"path-intellisense.autoSlashAfterDirectory": true
npm Intellisense	christian-kohler.npm-intellisense	Autocompleta módulos de npm en sentencias import/require. 	-
Version Lens	pflannery.vscode-versionlens	Muestra la versión más reciente de cada dependencia en package.json. Útil para mantener actualizado el stack. 	"versionlens.showVersionLensAtStart": true
DotENV	mikestead.dotenv	Resaltado de sintaxis para archivos .env. Ayuda a gestionar variables de entorno de forma segura. 	-
EditorConfig for VS Code	EditorConfig.EditorConfig	Aplica estilos de codificación consistentes (indentación, saltos de línea) mediante archivo .editorconfig. 	Requiere archivo .editorconfig en la raíz
3. Extensiones para Next.js/React
Específicas para el desarrollo frontend con el stack elegido. 

Extensión	ID en Marketplace	Por qué es necesaria	Uso específico en el proyecto
ES7+ React/Redux/React-Native snippets	dsznajder.es7-react-js-snippets	ALTAMENTE RECOMENDADO. Snippets para React moderno. rfc → componente funcional, rfce → componente con export, usestate, useeffect, etc. 	Creación rápida de componentes: NodeRenderer, ResourceDisplay, HeatMap
Next.js snippets	PulkitGangwar.nextjs-snippets	Snippets específicos para Next.js 13/14 (App Router, Server Components, API routes). 	Creación de páginas, layouts, rutas API (si se implementa backend ligero)
T3 Stack / Next.js / React File Generator	imgildev.vscode-nextjs-generator	MUY ÚTIL. Genera automáticamente componentes, páginas, hooks, API routes con estructura predefinida. 	Acelera la creación de la estructura de carpetas del proyecto. Comando: "T3: Generate Component"
Auto Import	steoates.autoimport	Importa automáticamente tipos y módulos al escribir.	Ahorra tiempo al usar TypeScript, especialmente con tipos complejos (GameNode, ResourceDelta)
Simple React Snippets	burkeholland.simple-react-snippets	Alternativa ligera a ES7+ snippets.	-
React Developer Tools	(Extensión de navegador, no de VS Code)	IMPrescindible para debugging. Permite inspeccionar el árbol de componentes, props y state en el navegador. 	Instalar en Chrome/Edge/Firefox
Styled Components	styled-components.vscode-styled-components	Si se decide usar styled-components (alternativa a Tailwind).	Resaltado de sintaxis y autocompletado
4. Extensiones para TypeScript
Optimizan el trabajo con TypeScript, que es el lenguaje principal del proyecto. 

Extensión	ID en Marketplace	Por qué es necesaria
TypeScript Hero	rbbit.typescript-hero	Mejora la navegación de imports, permite ordenarlos, eliminar no usados y añadir exports automáticos. 
Pretty TypeScript Errors	yoavbls.pretty-ts-errors	Hace que los errores de TypeScript sean más legibles, mostrándolos de forma formateada en lugar de muros de texto. 
Import Cost	wix.vscode-import-cost	Muestra el tamaño de los paquetes importados inline. Ayuda a mantener el bundle pequeño. 
Auto Barrel	imgildev.vscode-auto-barrel	Genera y mantiene automáticamente archivos index.ts (barrels) para exportar múltiples módulos. 	-
Move TS	stringham.move-ts	Permite mover archivos TypeScript y actualiza automáticamente los imports en todo el proyecto.	-
TypeScript Toolbox	DSKWRK.vscode-generate-getter-setter	Utilidades para generar getters/setters, constructores, etc.	-
5. Extensiones para Tailwind CSS
Necesarias para trabajar eficientemente con Tailwind, que es el sistema de estilos elegido. 

Extensión	ID en Marketplace	Por qué es necesaria
Tailwind CSS IntelliSense	bradlc.vscode-tailwindcss	IMPrescindible. Autocompletado, linting y previsualización de clases Tailwind. 
Headwind	heybourn.headwind	Ordena automáticamente las clases Tailwind según un orden consistente (mejora legibilidad). 
Piny (Visual Editor)	Pinegrow.piny	OPCIONAL PERO ÚTIL. Editor visual para Tailwind dentro de VS Code. Permite ajustar estilos sin escribir clases manualmente. 
Tailwind Fold	stivo.tailwind-fold	Pliega las largas listas de clases Tailwind para mantener el código limpio.	-
Tailwind Docs	austenc.tailwind-docs	Muestra la documentación de Tailwind al hacer hover sobre una clase.	-
6. Extensiones para Testing (Jest/Cypress)
Soportan las tareas de testing definidas en el roadmap (Fase 7). 

Extensión	ID en Marketplace	Por qué es necesaria	Uso específico
Jest	Orta.vscode-jest	IMPrescindible. Ejecuta tests Jest en segundo plano y muestra resultados inline (verde/rojo junto al código). 	Testing unitario del store, heurística, utilidades
Jest Runner	firsttris.vscode-jest-runner	Añade opción "Run Test" sobre cada test para ejecutarlos individualmente. 	Depuración rápida de tests específicos
Cypress Helper	shelex.vscode-cy-helper	Utilidades para Cypress: snippets, búsqueda de selectores, ejecución de tests. 	Testing E2E del flujo completo del juego
Cypress Snippets	andrew-codes.cypress-snippets	Snippets para comandos de Cypress. 	-
Playwright Test for VS Code	ms-playwright.playwright	Si se opta por Playwright en lugar de Cypress (alternativa moderna). 	-
Coverage Gutters	ryanluker.vscode-coverage-gutters	Muestra visualmente la cobertura de tests en el editor (líneas cubiertas en verde, no cubiertas en rojo). 	Seguimiento de cobertura (objetivo >80%)
7. Extensiones para UI/UX y Visualización
Ayudan a implementar las visualizaciones complejas del proyecto: árbol de decisiones, heatmaps, gráficos. 

Extensión	ID en Marketplace	Por qué es necesaria
SVG Viewer	cssho.vscode-svg-viewer	Previsualiza archivos SVG directamente en VS Code. Útil para crear iconos personalizados para recursos y decisiones.
Prettier - Code formatter	(ya listada en Core)	También formatea JSX/TSX.
Color Highlight	naumovs.color-highlight	Muestra una previsualización del color junto a códigos hex/rgb en CSS o Tailwind.
Image preview	kisstkondoros.vscode-gutter-preview	Muestra una miniatura de la imagen al lado de la ruta del archivo. 
Live Server	ritwickdey.LiveServer	Lanza un servidor de desarrollo rápido para previsualizar HTML estático (útil para prototipos). 
Markdown All in One	yzhang.markdown-all-in-one	Para documentar el proyecto (README, docs). 
8. Extensiones para Git y Colaboración
Esenciales para trabajar en equipo y mantener un historial limpio. 

Extensión	ID en Marketplace	Por qué es necesaria
GitLens — Git supercharged	eamodio.gitlens	ALTAMENTE RECOMENDADO. Potencia las capacidades de Git: blame inline, exploración de repositorios, búsqueda de commits. 
Git Graph	mhutchie.git-graph	Visualiza el historial de ramas y commits de forma gráfica. 
Conventional Commits	vivaxy.vscode-conventional-commits	Ayuda a escribir mensajes de commit siguiendo el estándar Conventional Commits. 
Git History	donjayamanne.githistory	Muestra el historial detallado de un archivo.
Live Share	MS-vsliveshare.vscode-liveshare	Colaboración en tiempo real (pair programming). 
CodeTour	vsls-contrib.codetour	Crea guías paso a paso del código. Útil para onboardings. 
9. Extensiones de Productividad
Mejoran el día a día, aunque no son estrictamente necesarias para el stack. 

Extensión	ID en Marketplace	Por qué es útil
Todo Tree	Gruntfuggly.todo-tree	Recopila todos los TODO:, FIXME: del proyecto en un panel lateral. 
Bookmarks	alefragnani.Bookmarks	Permite marcar líneas de código y navegar entre ellas. 
Bracket Pair Colorization	(nativo en VS Code desde 2022)	Colorea los pares de corchetes/paréntesis. Activar en settings: "editor.bracketPairColorization.enabled": true 
Indent Rainbow	oderwat.indent-rainbow	Colorea la indentación para mejorar legibilidad. 
Better Comments	aaron-bond.better-comments	Categoriza comentarios con colores (preguntas, TODOs, alertas). 
Auto Rename Tag	formulahendry.auto-rename-tag	Renombra automáticamente la etiqueta de cierre al modificar la de apertura en HTML/JSX. 
Auto Close Tag	formulahendry.auto-close-tag	Cierra automáticamente etiquetas HTML/JSX. 
Code Spell Checker	streetsidesoftware.code-spell-checker	Corrige errores ortográficos en código y comentarios. 
npm Scripts	traBpUkciP.vscode-npm-scripts	Muestra los scripts de package.json en un panel lateral para ejecutarlos con un clic. 
Thunder Client	rangav.vscode-thunder-client	Cliente REST/GraphQL ligero dentro de VS Code. Alternativa a Postman. 
10. Extensiones con IA (Opcional pero Recomendado)
Dado que el proyecto se desarrollará con "IA Guided", estas extensiones potencian la asistencia. 

Extensión	ID en Marketplace	Capacidades
GitHub Copilot	GitHub.copilot	El estándar de facto. Autocompletado avanzado, generación de código por comentarios, chat contextual. 
GitHub Copilot Chat	GitHub.copilot-chat	Añade chat integrado con Copilot para hacer preguntas sobre el código.
AWS CodeWhisperer	amazonwebservices.aws-toolkit-vscode	Alternativa gratuita a Copilot. Buen soporte para TypeScript y sugerencias de seguridad. 
TabNine	TabNine.tabnine-vscode	Otra alternativa de autocompletado IA.
Continue	Continue.continue	Extensión open-source que permite usar modelos locales (LLaMA, etc.). 
Piny	Pinegrow.piny	Además de editor visual Tailwind, tiene capacidades de IA para arrastrar/soltar componentes. 
Mintlify Doc Writer	mintlify.document	Genera documentación automática para funciones y componentes usando IA. 
11. Configuración Recomendada (settings.json)
Para que todas las extensiones funcionen de forma coordinada, añade esto a tu .vscode/settings.json (a nivel de proyecto). 

json
{
  // Editor general
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.linkedEditing": true,
  
  // Tailwind
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "tailwindCSS.emmetCompletions": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  
  // Prettier
  "prettier.requireConfig": true,
  "prettier.configPath": ".prettierrc",
  
  // ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.format.enable": false,
  "eslint.run": "onType",
  
  // TypeScript
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  
  // Jest
  "jest.autoRun": {
    "watch": false,
    "onSave": "test-file"
  },
  "jest.showCoverageOnLoad": true,
  "jest.coverageColors": {
    "uncovered": "rgba(255,99,71,0.2)",
    "partially-covered": "rgba(255,215,0,0.2)"
  },
  
  // Archivos
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true
  },
  "files.associations": {
    "*.env.*": "dotenv",
    "*.css": "tailwindcss"
  },
  
  // Path Intellisense
  "path-intellisense.autoSlashAfterDirectory": true,
  "path-intellisense.absolutePathToWorkspace": true,
  
  // Next.js generator
  "nextjs.files.alias": "@",
  "nextjs.files.extension": "tsx",
  "nextjs.files.showType": true
}
12. Extension Packs Recomendados
Si prefieres instalar un pack completo y luego desinstalar lo que sobre:

Pack	ID	Incluye
TypeScript Essential Extension Pack	imgildev.vscode-typescript-pack	ESLint, Prettier, GitLens, Auto Close Tag, Auto Rename Tag, Tailwind IntelliSense, Markdown All in One, Error Lens, Path Intellisense, Todo Tree, y más. 
JavaScript and TypeScript Nightly	ms-vscode.vscode-typescript-next	Versión nocturna del soporte TS (útlimas features). 
React Extension Pack	jawandarajbir.react-vscode-extension-pack	React snippets, ESLint, Prettier, etc.
Resumen de Instalación por Fases
Fase	Extensiones a instalar
Fase 0 (Fundación)	ESLint, Prettier, Path Intellisense, DotENV, EditorConfig, npm Intellisense, Version Lens
Fase 1 (Motor Decisiones)	ES7+ React snippets, Next.js snippets, T3 Stack Generator, Auto Import, TypeScript Hero, Pretty TS Errors
Fase 2 (Sistema Heurístico)	(Las mismas, más Debugging)
Fase 3 (Ciclo Estacional)	Tailwind IntelliSense, Headwind, Piny (opcional)
Fase 4 (Eventos)	(No específicas)
Fase 5 (UI/UX)	SVG Viewer, Color Highlight, Image Preview
Fase 6 (Análisis)	Markdown All in One
Fase 7 (Testing)	Jest, Jest Runner, Cypress Helper, Coverage Gutters
Siempre útiles	Error Lens, GitLens, Todo Tree, Bookmarks, Code Spell Checker
IA (opcional)	GitHub Copilot + Copilot Chat, o CodeWhisperer
Nota final: VS Code permite instalar extensiones por proyecto (recomendado). Crea una carpeta .vscode en la raíz y dentro un archivo extensions.json para recomendar extensiones a otros desarrolladores:

json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "orta.vscode-jest",
    "eamodio.gitlens",
    "usernamehw.errorlens"
  ]
}
Total de extensiones listadas: ~50 (incluyendo opcionales).
Mínimo recomendado para empezar: 12 (Core + React + Tailwind + Jest).