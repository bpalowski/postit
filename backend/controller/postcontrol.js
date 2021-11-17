const express = require('express');
const router = express.Router();
const Post = require('../model/postSchema');
const User = require('../model/userSchema');

const jwt = require('jsonwebtoken')
const { verifyToken } = require('../methods/tools')
// Get a posts

router.get('/myPosts', verifyToken, function (req, res) {
  try {
    const user = req.session['user']
    Post.find({ userId: user._id }).then((data) => {
      return res.json(data)
    }).catch((err) => {
      return res.json({ err })
    })
  } catch (err) {
    console.log(err)
  }
})

// // Get a posts
router.get('/getPost/:id', function (req, res) {
  try {

    let post = req.params.id
    Post.findById(post).then((data) => {
      return res.json(data)
    }).catch((err) => {
      return res.json({ err })
    })
  } catch (err) {
    console.log(err)
  }
})


router.post('/createPost', verifyToken, function (req, res) {
  try {
    const user = req.session['user']
    Post.watch().on('change', change => console.log("42", change));

    if (req.body.post === '' || req.body.post.length < 9) {
      return res.status(400).json({ error: "Must me 10 characters long" })
    }

    let postObj = {
      userId: user._id,
      post: req.body.post
    }

    const newPost = new Post(postObj);
    newPost.save()
      .then(data => {
        res.json({ post: data })
      }).catch(err => {
        res.json(err)
      });
  } catch (err) {
    throw new Error(err.message)
  }
})



// Edit Post
router.put('/editPost/:id', verifyToken, function (req, res) {
  try {
    let user = req.session['user']

    let idPost = req.params.id;
    if (!idPost) {
      return res.json({ error: "No id provided" })
    }
    let editPost = {
      post: req.body.editPost
    };
    console.log(editPost)

    Post.findByIdAndUpdate(idPost, editPost)
      .then((data) => {
        return res.json({ updated: data })
      }).catch((err) => {
        res.json({ error: err })
      })
  } catch (err) {
    throw new Error(err.message)

  }
})

// Delete Post
router.delete('/deletPost/:id', verifyToken, function (req, res) {
  try {
    if (req.body.post === '') {
      return res.status(404).json({ error: "Not found" })
    } else {
      Post.findByIdAndDelete(req.params.id)
        .then((info) => {
          res.status(200).json({ deleted: "this post has been deleted" })
        }).catch((err) => {
          res.json({ error: err })
        })
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

module.exports = router;