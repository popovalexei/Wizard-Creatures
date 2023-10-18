const Creature = require('../models/Creature.js');

//Create a creature to mongodb
exports.create = (creatureData) => Creature.create(creatureData);

//Get all creatures from mongodb
exports.getAll = () => Creature.find();
