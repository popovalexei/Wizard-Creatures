const router = require('express').Router();

//ALL POSTS
router.get('/all', (req, res) => {
  res.render('post/all-posts');
});

//CREATE POST
router.get('/create', (req, res) => {
  res.render('post/create');
});

//PROFILE
router.get('/profile', (req, res) => {
  res.render('post/profile');
});

module.exports = router;
