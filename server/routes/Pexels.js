const router = require("express").Router();
const axios = require("axios");

//獲得pexels的圖片
router.get("/", async (req, res) => {
  try {
    let page = 1;
    const data = await axios.get(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=50`,
      {
        headers: { Authorization: process.env.PEXELS_API_KEY },
      }
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-App-Version, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    res.json(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//搜尋圖片
router.post("/search", async (req, res) => {
  try {
    let input = req.query.input;
    const data = await axios.get(
      `https://api.pexels.com/v1/search?query=${input}&per_page=5&page=1`,
      {
        headers: { Authorization: process.env.PEXELS_API_KEY },
      }
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-App-Version, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    res.json(data.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
