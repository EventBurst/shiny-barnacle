import express from "express";
import cors from "cors";
const app = express();
// for body parser
app.use(express.json());
//for url params
app.use(express.urlencoded({ extended: true }));
//for image,files
app.use(express.static("public"));
app.use(cors());
//Server Working
app.get("/", (req, res) => {
  res.send("HLO");
});


export default app;
