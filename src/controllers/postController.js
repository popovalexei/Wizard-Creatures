const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware.js');
const creatureService = require('../services/creatureService.js');

//GET ALL POSTS view
router.get('/all', async (req, res) => {
  //getting all the creatures from the mongodb
  const creatures = await creatureService.getAll().lean();

  // passing all the creatures to the all-posts view
  res.render('post/all-posts', { creatures });
});

//CREATE A POST view
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
router.get('/profile', isAuth, async (req, res) => {
  const { user } = req;
  const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

  res.render('post/profile', { myCreatures });
});

//POST DETAILS view
router.get('/:creatureId/details', async (req, res) => {
  const { creatureId } = req.params;

  //getting the single creature by creatureId
  const creature = await creatureService.getSingleCreature(creatureId).lean();

  const { user } = req;
  const { owner } = creature;
  //checking if there is a user and if the user and owner is the same user
  const isOwner = user?._id === owner.toString();
  //checking if the user has voted
  const hasVoted = creature.votes.some((v) => v?._id.toString() === user?._id);
  const joinedEmailsOfOwners = creature.votes.map((v) => v.email).join(', ');

  //rendering the details view and passing the creature, and boolean isOwner
  res.render('post/details', {
    creature,
    isOwner,
    hasVoted,
    joinedEmailsOfOwners,
  });
});

//EDIT post
router.get('/:creatureId/edit', async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureService.getSingleCreature(creatureId).lean();

  res.render('post/edit', { creature });
});

router.post('/:creatureId/edit', async (req, res) => {
  const { creatureId } = req.params;
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

  await creatureService.update(creatureId, payload);
  res.redirect(`/posts/${creatureId}/details`);
});

//DELETE post
router.get('/:creatureId/delete', async (req, res) => {
  const { creatureId } = req.params;

  await creatureService.delete(creatureId);

  res.redirect('/posts/all');
});

//VOTE
router.get('/:creatureId/vote', async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;

  await creatureService.addVotesToCreature(creatureId, _id);

  res.redirect(`/posts/${creatureId}/details`);
});

module.exports = router;
