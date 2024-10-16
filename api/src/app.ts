import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";
import getProductsFromApi from "./utils/data";
import router from "./routes/routes";

// Cargar variables de entorno
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, async () => {
      await getProductsFromApi();
      console.log(`Server runnig oooooooooon port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
