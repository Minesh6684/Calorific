const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

app.listen(port, console.log(`Server running on port: ${port}`));
