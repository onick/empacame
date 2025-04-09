# Proyecto Tienda - Guía de Desarrollo

## Estructura del Proyecto

Este proyecto está desarrollado con las siguientes tecnologías:
- Next.js 15.2.5 con App Router
- React 19
- TypeScript
- Tailwind CSS
- Zustand (manejo de estado)
- NextAuth.js (autenticación)
- Stripe (procesamiento de pagos)

## Entidades Principales

- **Producto**: Artículos vendidos en la tienda
- **Categoría**: Clasificación de productos
- **Usuario**: Datos de usuario y autenticación
- **Carrito**: Productos seleccionados para compra
- **Pedido**: Registro de compras realizadas

## Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   - Ya se ha creado un archivo `.env.local` con las configuraciones básicas
   - Para producción, asegúrate de generar nuevos secretos

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir navegador**:
   - Navegar a [http://localhost:3000](http://localhost:3000)

## Credenciales de Prueba

El sistema incluye dos usuarios pre-configurados para pruebas:

- **Administrador**:
  - Email: admin@example.com
  - Contraseña: admin123

- **Cliente**:
  - Email: customer@example.com  
  - Contraseña: customer123

## Estructura de Carpetas

- `/src/app`: Rutas de la aplicación (Next.js App Router)
- `/src/components`: Componentes reutilizables
- `/src/lib`: Código de utilidad y lógica de negocio
- `/src/types`: Tipos e interfaces TypeScript
- `/src/providers`: Providers de contexto para la aplicación
- `/public`: Activos públicos (imágenes, etc.)

## Funcionalidades Implementadas

- ✅ Tipos/Interfaces de entidades principales
- ✅ Autenticación básica con NextAuth.js
- ✅ Componente de ProductCard
- ✅ Manejo de carrito con Zustand
- ✅ Manejo de lista de deseos (wishlist)
- ✅ Formulario de inicio de sesión

## Próximos Pasos

1. **Frontend**:
   - Implementar páginas de catálogo de productos
   - Crear página de detalle de producto
   - Implementar checkout

2. **Backend**:
   - Configurar base de datos
   - Implementar API para productos, pedidos, etc.
   - Integrar procesamiento de pagos con Stripe

3. **Administración**:
   - Completar funcionalidades de gestión de productos
   - Finalizar sección de pedidos y clientes
   - Implementar estadísticas y reportes

## Comandos Útiles

- **Desarrollo**: `npm run dev`
- **Compilar**: `npm run build`
- **Iniciar producción**: `npm run start`
- **Linting**: `npm run lint`

## Notas Adicionales

- El middleware protege las rutas `/dashboard/*` para solo administradores
- Las rutas `/checkout/*` y `/mi-cuenta/*` requieren autenticación
- Se utiliza Zustand para el manejo de estado del carrito y wishlist con persistencia local