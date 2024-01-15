const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const secretKey='dhfjdkjsz';


router.post("/register", async function (req, res) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try{
      await User.create({ email, password: hashedPassword });
      res.render('register',{
        msg:"User created"
      })
  }catch(err){
      res.render("register",{
        msg:"User already exists"
      })
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render('login',{
      msg:"User does not exist"
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.render("login",{
      msg:"Password does not match"
    });
  }

  const token=jwt.sign({email:user.email},secretKey);

  res.cookie('token',token).redirect('/student');
  // .send({msg: "login successful",token});
});

module.exports = router;
