const express = require('express');
const router = express.Router();


router.get('/register', function(req, res){
    res.render('register');
})

router.get('/login', function(req, res){
    res.render('login');
})
router.get('/profile', function(req, res){
    res.render('profile',{
        user:req.user
    });
})

router.get('/student', function(req, res){
    res.render('student');
})



module.exports = router;
