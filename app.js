import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import organizerRoutes from "./routes/organizer.routes.js";
const app = express();
// for body parser
app.use(express.json());
//for url params
app.use(express.urlencoded({ extended: true }));
//for image,files
app.use(express.static("public"));
// for cookies parsing and setting
app.use(cookieParser());
app.use(cors());
//Server Working
app.get("/", (req, res) => {
  res.send("HLO");
});

//Routes
app.use("/api/shiny-barnacle/organizer", organizerRoutes);
export default app;
