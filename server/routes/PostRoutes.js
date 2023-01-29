const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Post = require("../models/post");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POST
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-App-Version, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE A POST
router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-App-Version, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
