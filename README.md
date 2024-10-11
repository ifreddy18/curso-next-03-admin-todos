# Development

## Getting Started

### Note: Add Prettier: https://dev.to/jsdevspace/setup-nextjs-14-project-with-eslint-prettier-tailwind-css-226j

1. Levantar base de datos
```
docker compose up -d
```

2. Crear copia y renombrar a .env el archivo .env.template
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar el comando de prisma para crear migración ``` npx prisma migrate dev ```
7. Ejecutar el comando de prisma para generar cliente ``` npx prisma generate ```
8. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Primsma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Nota: Usuario por defecto
email: admin@google.com
password: 123456

# Prod

# Stage

