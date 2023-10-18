const Creature = require('../models/Creature.js');

//CREATE a creature(post) to mongodb
exports.create = (creatureData) => Creature.create(creatureData);

//Get ALL creatures(posts) from mongodb
exports.getAll = () => Creature.find();

//Get SINGLE creature(post)
exports.singleCreature = (creatureId) => Creature.findById(creatureId);

//EDIT creature(post)
exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

//Delete creature(post)
exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

//Get Owner creatures (myCreatures)
exports.getMyCreatures = (ownerId) =>
  Creature.find({ owner: ownerId }).populate('owner');
