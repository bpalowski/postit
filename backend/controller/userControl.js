const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




router.post('/signup', async (req, res) => {
  try {

    const { email, name, password, checkPassword } = req.body
    console.log(email, name, password)
    const regexEmail = new RegExp('^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$');
    const regex = regexEmail.exec(req.body.email)

    if (!regex) {
      return res.status(406).send("You need a valid email")
    }
    if (password !== checkPassword) {
      return res.status(500).send("Password does not match")
    }
    if (!email || !name || !password || name.length < 1 || password.length < 6) {
      return res.status(406).send("Missing name and password must be 7 characters")
    }
    const SALT = bcrypt.genSaltSync(10);
    const passwordEncrypt = bcrypt.hashSync(password, SALT);

    User.findOne({ email: email }, (error, data) => {
      if (data === null) {
        const userObj = {
          name: name,
          email: email,
          password: passwordEncrypt
        }
        const newUser = new User(userObj)


        newUser.save().then((user) => {
          const token = jwt.sign({ uid: user._id }, process.env.SECRET, { expiresIn: '24h' })

          req.session.user = user
          req.session.loggedIn = true;
          req.session.save((err) => {
            if (!err) {
              res.cookie("access_token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
              }).status(200).send({ token: token })
            }
          })
        }).catch((err) => {
          return res.status(400).json({
            success: false, error: {
              message: err.message
            }
          })
        })
      } else {
        res.status(409).json({ error: "User email already exists" })
      }
    })
  } catch (err) {
    return res.status(400).json({
      success: false, error: {
        message: err.message
      }
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const regexEmail = new RegExp('^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$');
    const regex = regexEmail.exec(email)

    if (!regex) {
      return res.status(406).json({ error: "You need a valid email" })
    }

    const user = await User.findOne({ email: email });

    if (user) {
      const passvalidator = bcrypt.compareSync(password, user.password)
      const token = jwt.sign({ uid: user._id }, process.env.SECRET, { expiresIn: '24h' })

      if (passvalidator) {
        req.session.user = user
        req.session.loggedIn = true;

        req.session.save((err) => {
          if (!err) {
            res.cookie("access_token", token, {
              httpOnly: true
            }).status(200).send(token)
          }
        })


      } else {
        return res.status(401).json({ success: false, error: "Invalid password" })
      }

    } else {
      return res.status(401).json({ success: false, error: "User does not exist" })
    }

  } catch (err) {
    return res.status(400).json({
      success: false, error: {
        message: err.message
      }
    })
  }
})


router.get('/logout', async (req, res) => {
  req.session.destroy();
  return res.clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
})



module.exports = router;