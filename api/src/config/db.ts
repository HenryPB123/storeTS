import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.PORT) || 3306,
    logging: false,
  }
);

// Probar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos MySQL establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

export default sequelize;
