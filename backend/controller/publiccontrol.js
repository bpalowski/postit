const express = require('express');
const router = express.Router();
const Post = require('../model/postSchema');


// Public page route.
router.get('/', function (req, res) {
  try {
    Post.find().then((data) => {
      return res.json(data)
    }).catch((err) => {
      return res.json({ err })
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;