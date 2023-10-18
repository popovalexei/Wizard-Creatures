const router = require('express').Router();
const creatureService = require('../services/creatureService.js');

//ALL POSTS view
router.get('/all', async (req, res) => {
  //getting all the creatures from the mongodb
  const creatures = await creatureService.getAll().lean();

  // passing creatures to the all-posts view
  res.render('post/all-posts', { creatures });
});

//CREATE POST view
router.get('/create', (req, res) => {
  res.render('post/create');
});

router.post('/create', async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };

  await creatureService.create(payload);

  res.redirect('/posts/all');
});

//PROFILE
router.get('/profile', (req, res) => {
  res.render('post/profile');
});

module.exports = router;
