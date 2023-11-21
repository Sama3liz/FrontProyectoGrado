# FrontProyectoGrado

## Estructura de Carpetas

- **/assets:** Contiene recursos estáticos como imágenes, fuentes, archivos de audio, etc.

- **/components:** Componentes reutilizables en toda la aplicación.

- **/screens:** Pantallas de la aplicación organizadas por funcionalidad.

- **/navigation:** Configuración y componentes de navegación.

- **/utils:** Funciones y utilidades genéricas utilizadas en toda la aplicación.

- **/hooks:** Hooks personalizados para compartir lógica entre componentes.

- **/src:** Archivos de configuración específicos de la aplicación, como configuraciones de entorno, claves de API, etc.

- **/styles:** Contiene estilos globales y específicos de pantalla.
  - `colors.js`: Definición de colores utilizados en la aplicación.
  - `fonts.js`: Definición de fuentes utilizadas en la aplicación.
  - `globalStyles.js`: Estilos globales como estilos de texto, botones genéricos, etc.
  - **/screenStyles/**
    - `HomeScreenStyles.js`: Estilos específicos de la pantalla de inicio.
    - `ProfileScreenStyles.js`: Estilos específicos de la pantalla de perfil.

- **/amplify:** Archivos y configuraciones relacionados con AWS Amplify.
  - **/auth:** Configuración de autenticación, como Amazon Cognito.
  - **/api:** Configuración de la API, por ejemplo, API Gateway, funciones Lambda, etc.
  - **/storage:** Configuración de almacenamiento, como Amazon S3.
  - **/analytics:** Configuración de análisis o seguimiento, por ejemplo, Amplify Analytics.
  - **/function:** Configuración relacionada con funciones Lambda (si aplica).
  - **/graphql:** Configuración de API GraphQL (si utilizas AppSync).

- **/docs:** Documentación del proyecto, como guías de estilo, guías de uso, etc.

