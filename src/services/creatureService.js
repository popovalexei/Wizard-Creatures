const Creature = require('../models/Creature.js');

//CREATE a creature to mongodb
exports.create = (creatureData) => Creature.create(creatureData);

//Get ALL creatures from mongodb
exports.getAll = () => Creature.find();

//Get SINGLE creature
exports.singleCreature = (creatureId) => Creature.findById(creatureId);

//EDIT creature
exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);
