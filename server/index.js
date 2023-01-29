const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const postRoute = require("./routes/PostRoutes");
const dalleRoute = require("./routes/dalleRoutes");
const pexelsRoute = require("./routes/Pexels");

//連結資料庫
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connection Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

//中間件
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//跨域
app.use(cors());

//api
app.use("/post", postRoute);
app.use("/api/v1/dalle", dalleRoute);
app.use("/api/pexels", pexelsRoute);

//伺服器 設定
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is ruinning on port ${port}`);
});
