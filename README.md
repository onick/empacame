# Tienda Online

Este proyecto es una tienda online desarrollada con Next.js 15.2.5, React 19 y Tailwind CSS. Incluye tanto la tienda en línea como un panel de administración.

## Características

### Tienda Online (Frontend)
- Página de inicio con secciones destacadas
- Catálogo de productos
- Productos personalizables
- Carrito de compras
- Proceso de pago con Stripe

### Panel de Administración (Backend)
- Dashboard con estadísticas
- Gestión de productos
- Gestión de pedidos
- Gestión de clientes
- Análisis de ventas

## Tecnologías

- Next.js 15.2.5
- React 19
- Tailwind CSS
- TypeScript
- NextAuth.js para autenticación
- Stripe para pagos

## Estado Actual del Desarrollo

Se ha completado:
- Estructura base del proyecto
- Diseño de la página principal
- Panel de administración (parcial)
  - Dashboard principal
  - Listado de productos
  - Formulario de nuevo producto
  - Listado de pedidos

## Próximos Pasos de Desarrollo

1. **Panel de Administración**
   - Completar la vista de detalle de pedidos
   - Implementar la edición de productos
   - Crear el panel de clientes
   - Implementar análisis y estadísticas
   - Añadir gestión de categorías
   - Configuración de la tienda

2. **Autenticación**
   - Resolver problemas con NextAuth.js
   - Implementar roles y permisos
   - Proteger rutas del panel de administración

3. **Tienda Online**
   - Implementar páginas de categorías
   - Detalles de producto
   - Funcionalidad del carrito
   - Proceso de checkout
   - Integración con Stripe

4. **Funcionalidades Avanzadas**
   - Sistema de búsqueda
   - Filtrado de productos
   - Gestión de inventario
   - Sistema de notificaciones
   - Seguimiento de pedidos

5. **Despliegue**
   - Configuración de entornos
   - Despliegue en producción
   - Optimización de rendimiento

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar en modo producción
npm start
```

## Estructura del Proyecto

- `/src/app`: Aplicación principal (rutas, páginas)
  - `/dashboard`: Panel de administración
  - `/routes`: Rutas principales de la tienda
- `/src/components`: Componentes reutilizables
  - `/layout`: Componentes de estructura
  - `/ui`: Componentes de interfaz
  - `/product`: Componentes relacionados con productos
  - `/cart`: Componentes del carrito
  - `/user`: Componentes relacionados con usuarios
- `/public`: Archivos estáticos

## Configuración

El proyecto requiere algunas variables de entorno para funcionar correctamente:

```
NEXT_PUBLIC_API_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
