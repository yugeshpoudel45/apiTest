const express = require("express");
require("dotenv").config();
const urlRouter = require("./routes/url");
const connectMongoDb = require("./db/connection");
const URL = require("./models/url");

const app = express();

//Middlewares
app.use(express.json());

//DB Connection
connectMongoDb(process.env.MONGO_URL);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener");
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});
app.use("/url", urlRouter);

//Server running on port 3000
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
