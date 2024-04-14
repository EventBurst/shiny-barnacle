import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventRoutes from "./routes/event.routes.js";

// Routes
import organizerRoutes from "./routes/organizer.routes.js";
import speakerRoutes from "./routes/speaker.routes.js";
import agendaRoutes from "./routes/agenda.routes.js";
import sponsorRoutes from "./routes/sponsor.routes.js";
import sessionRoutes from "./routes/session.routes.js";

// Swagger UI
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";

// Path
import path from "path";
const swaggerDocument = YAML.load("./swagger.yaml");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// for body parser
app.use(express.json());
//for url params
app.use(express.urlencoded({ extended: true }));
//for image,files
app.use(express.static("public"));
// for cookies parsing and setting
app.use(cookieParser());
//Server Working
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Send the index.html file
});

app.use(
  cors({
    origin: "http://localhost:5265", // Change this to your actual client's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

//Routes
app.use("/api/shiny-barnacle/organizer", organizerRoutes);
app.use("/api/shiny-barnacle/speaker", speakerRoutes);
app.use("/api/shiny-barnacle/agenda", agendaRoutes);
app.use("/api/shiny-barnacle/sponsor", sponsorRoutes);
app.use("/api/shiny-barnacle/session", sessionRoutes);
app.use("/api/shiny-barnacle/event", eventRoutes);

// Swagger UI
app.use(
  "/api/shiny-barnacle/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
export default app;
