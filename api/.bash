/your-store-api
│
├── /config
│   └── database.ts   # Configuración de Sequelize y la base de datos
├── /controllers
│   └── authController.ts
│   └── productController.ts
│   └── cartController.ts
│   └── orderController.ts
├── /middlewares
│   └── authMiddleware.ts
│   └── roleMiddleware.ts
├── /models
│   └── user.ts
│   └── product.ts
│   └── cart.ts
│   └── order.ts
├── /routes
│   └── authRoutes.ts
│   └── productRoutes.ts
│   └── cartRoutes.ts
│   └── orderRoutes.ts
├── .env                # Variables de entorno (configuración de la base de datos)
├── app.ts              # Configuración principal del servidor
└── package.json
