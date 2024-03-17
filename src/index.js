import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

/** IMPORT: CUSTOM MODULES */
import connectToDatabase from "./config/database.js";
import routes from "./routes/index.js";

/** IMPORT: MIDDLEWARES */
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

/** APP CONFIG */
dotenv.config();
connectToDatabase();
const app = express();
app.use(express.json());

/** ROUTES */
app.get("/", (_, res) => res.send("<h1>Store Inventory API</h1>"));
app.use("/api/v1", routes);

/** MIDDLEWARE AFTER ROUTES */
app.use(notFound);
app.use(errorHandler);

/** RUNNING THE SERVER */
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server is already running on port: ${port}`)
);
