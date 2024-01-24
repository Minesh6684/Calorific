const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");
const colors = require("colors");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const methodOverride = require("method-override");
const { connectDB } = require("./config"); // Corrected import

const app = express();
const port = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use("/authentication/", require("./routes/Authenticaiton"));
app.use("/item-suggestions/", require("./routes/ItemSuggestions"));
app.use("/nutritional-facts/", require("./routes/NutritionalFacts"));
app.use("/history/", require("./routes/History"));
app.use("/calorie-goal/", require("./routes/CalorieGoal"))
app.use("/weight/", require("./routes/Weight"));

//Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

app.use(errorHandler);
app.listen(port, console.log(`Server running on port: ${port}`));
