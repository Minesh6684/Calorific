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
app.use("/weight/", require("./routes/Weight"));

// React Router routes
// if (process.env.NODE_ENV === "production") {
//   app.use(
//     express.static(path.resolve(__dirname, "../", "frontend", "dist"), {
//       setHeaders: (res, path, stat) => {
//         if (path.endsWith(".js")) {
//           res.type("application/javascript");
//         }
//       },
//     })
//   );

// Handle React Router routes
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "dist", "index.html")
//     );
//   });
// } else {
//   app.get("/", (req, res) => res.send("Please Activate Production"));
// }

app.use(errorHandler);
app.listen(port, console.log(`Server running on port: ${port}`));

server.timeout = 30000;
