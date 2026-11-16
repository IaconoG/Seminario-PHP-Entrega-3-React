# Plataforma de juegos — Cliente web (React)

Trabajo académico desarrollado para la asignatura **Seminario de Lenguajes** (opción PHP, React y API REST).  
Este repositorio contiene el **cliente web** de una aplicación de gestión y consulta de videojuegos, que consume la API REST del proyecto complementario. Los repositorios son independientes.

El cliente permite visualizar y filtrar el catálogo de juegos, así como administrar géneros y plataformas.

## Funcionalidades principales

- Visualización del catálogo de juegos (portada, nombre, descripción, plataforma, género y enlace oficial).
- Filtrado de juegos por nombre, género y plataforma.
- Ordenamiento del listado de juegos de forma ascendente o descendente (A–Z / Z–A).
- Gestión de géneros: creación, edición y eliminación.
- Gestión de plataformas: creación, edición y eliminación.
- Carga de datos de prueba desde los archivos JSON de la API.
- Vaciado de las tablas de juegos, géneros y plataformas.
- Visualización de mensajes de estado y error mediante un modal.
- Página 404 para rutas no definidas.

## Tecnologías utilizadas

- JavaScript
- React 18.2.0
- React Router DOM 6.13.0
- Axios 1.4.0
- Create React App (react-scripts 5.0.1)
- Testing Library (Jest DOM, React Testing Library, User Event)

## Requisitos previos

- Node.js y npm instalados.
- La API REST del proyecto complementario en ejecución en `http://localhost:8000/public` (ver [Proyecto relacionado](#proyecto-relacionado)).

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/IaconoG/Seminario-PHP-Entrega-3-React.git
   cd Seminario-PHP-Entrega-3-React
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Ejecutar la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

La aplicación queda disponible en:

```
http://localhost:3000
```

Otros scripts disponibles:

```bash
npm run build   # genera la versión de producción en la carpeta build/
npm test        # ejecuta las pruebas
npm run eject   # expone la configuración de Create React App (irreversible)
```

## Configuración de conexión con la API

La URL base de la API está definida de forma fija (hardcoded) en los componentes que la consumen:

```js
const baseURL = 'http://localhost:8000/public';
```

Aparece en los siguientes archivos:

- `src/pages/dashboard/DashboardPage.js`
- `src/pages/EditPage.js`
- `src/pages/NewPage.js`
- `src/components/OpcionesComponent.js`

Si la API se ejecuta en otro host o puerto, es necesario modificar esa constante en cada uno de los archivos anteriores. No se utilizan variables de entorno.

## Endpoints consumidos

URL base: `http://localhost:8000/public`

| Recurso     | Método | Ruta                 | Uso en el cliente                          |
| ----------- | ------ | -------------------- | ------------------------------------------ |
| Géneros     | GET    | `/generos`           | Listado para filtros y administración       |
| Géneros     | POST   | `/generos`           | Crear género                               |
| Géneros     | PATCH  | `/generos/{id}`      | Editar género                              |
| Géneros     | DELETE | `/generos/{id}`      | Eliminar género                            |
| Géneros     | POST   | `/generos/todos`     | Cargar datos iniciales                     |
| Géneros     | DELETE | `/generos/todos`     | Vaciar tabla (`id = todos`)                |
| Plataformas | GET    | `/plataformas`       | Listado para filtros y administración       |
| Plataformas | POST   | `/plataformas`       | Crear plataforma                           |
| Plataformas | PATCH  | `/plataformas/{id}`  | Editar plataforma                          |
| Plataformas | DELETE | `/plataformas/{id}`  | Eliminar plataforma                        |
| Plataformas | POST   | `/plataformas/todos` | Cargar datos iniciales                     |
| Plataformas | DELETE | `/plataformas/todos` | Vaciar tabla (`id = todos`)                |
| Juegos      | GET    | `/juegos`            | Listado y filtrado (params de consulta)    |
| Juegos      | POST   | `/juegos/todos`      | Cargar datos iniciales                     |
| Juegos      | DELETE | `/juegos/todos`      | Vaciar tabla (`id = todos`)                |

`GET /juegos` acepta los parámetros de consulta `nombre`, `id_genero`, `id_plataforma` y `orden` (`ASC` o `DESC`).

## Estructura del proyecto

```
src/
├── App.js                 # Definición de rutas
├── index.js               # Punto de entrada
├── components/
│   ├── data/              # Funciones de acceso a la API (Axios)
│   ├── *Component.js      # Componentes reutilizables (header, footer, etc.)
├── pages/                 # Páginas (dashboard, géneros, plataformas, edición, creación, 404)
└── assets/                # Estilos CSS e imágenes
```

## Proyecto relacionado

API REST (backend): [Seminario-PHP-Entrega-2-APIRest-Slim](https://github.com/IaconoG/Seminario-PHP-Entrega-2-APIRest-Slim)

El backend debe estar en ejecución para que el cliente pueda funcionar. Consulte su README para la instalación, la configuración de la base de datos y los endpoints disponibles.

## Notas

- El cliente no gestiona juegos de forma individual (no hay creación/edición/eliminación de un juego desde la interfaz); el catálogo se visualiza y filtra, y la carga/vaciado de juegos se realiza mediante los endpoints `.../todos`.
- La prueba incluida (`src/App.test.js`) corresponde a la plantilla por defecto de Create React App y no cubre la funcionalidad de la aplicación.
