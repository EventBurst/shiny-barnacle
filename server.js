import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connectDB from "./db/db.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8002, () => {
      console.log("App Listening On Port", process.env.PORT);
      console.log(
        "App Address: http://localhost:" + (process.env.PORT || 8002)
      );
    });
  })
  .catch((err) => {
    console.log("CONNECTION FAILED MONGO", err);
  });
