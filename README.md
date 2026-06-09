# 🌙 LunaTech — Servicios Tecnicos Informaticos

Aplicacion Web SPA construida con **React + Vite**. Cumple los criterios de la
Evaluacion Sumativa 3 (Programacion Front End, TI2031/3331).

## 🚀 Como ejecutar

```bash
npm install
npm run dev
```

Luego abre el navegador en la URL que indica la consola (por defecto `http://localhost:5173`).

Para construir la version de produccion:

```bash
npm run build
npm run preview
```

## 🧩 Caracteristicas implementadas

| Requerimiento | Donde se encuentra |
|---|---|
| **CRUD funcional** (crear, leer, editar, eliminar) | `src/utils/storage.js`, `src/pages/Solicitudes.jsx` |
| **LocalStorage** | `src/utils/storage.js` |
| **Encriptacion de datos sensibles** | `src/utils/crypto.js` (Cesar + Base64) |
| **Validacion de RUT** (formato + digito verificador) | `src/utils/rut.js` |
| **Validaciones de cajas de texto** | `src/components/FormularioSolicitud.jsx` |
| **Calculo de edad por fecha de nacimiento** | `src/utils/edad.js`, `src/components/CalculadoraEdad.jsx` |
| **API mindicador.cl + conversion de divisas** (UTM, UF, Euro, Dolar) | `src/context/MonedaContext.jsx`, `src/components/ConvertidorDivisas.jsx` |
| **Precios dinamicos segun moneda** (CLP por defecto) | `src/context/MonedaContext.jsx` |
| **Arreglos recorridos con `.map()`** | `src/data/servicios.js` + paginas |
| **Seleccion multiple de servicios** | `src/components/FormularioSolicitud.jsx` |
| **Mostrar/ocultar/manipular UI con estados de React** | `Navbar.jsx`, `Cotizar.jsx`, `Solicitudes.jsx` |
| **Imagenes y enlaces de navegacion** | `Inicio.jsx`, `Footer.jsx`, react-router |

## 📂 Estructura

```
src/
├── components/   Componentes reutilizables
├── context/      Contexto de moneda (API)
├── data/         Arreglo de servicios
├── pages/        Vistas de la SPA
└── utils/        RUT, edad, encriptacion y CRUD
```

## 🔐 Nota sobre la encriptacion

El metodo de cifrado (`crypto.js`) es **academico/demostrativo** (cifrado Cesar +
Base64). Demuestra el concepto de transformar datos a texto cifrado antes de
guardarlos, pero **no debe usarse para seguridad real** en produccion.

## 🌐 API utilizada

[https://mindicador.cl/api](https://mindicador.cl/api) — indicadores economicos de Chile.
Si no hay conexion a internet, el convertidor mostrara un mensaje de error.
