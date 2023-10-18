const Creature = require('../models/Creature.js');

//CREATE a creature(post) to mongodb
exports.create = (creatureData) => Creature.create(creatureData);

//Get ALL creatures(posts) from mongodb
exports.getAll = () => Creature.find();

//Get SINGLE creature(post)
exports.getSingleCreature = (creatureId) =>
  Creature.findById(creatureId).populate('votes');

//EDIT creature(post)
exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

//Delete creature(post)
exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

//Get Owner creatures (myCreatures)
exports.getMyCreatures = (ownerId) =>
  Creature.find({ owner: ownerId }).populate('owner');

//VOTE
exports.addVotesToCreature = async (creatureId, userId) => {
  const creature = await this.getSingleCreature(creatureId);
  const isExistingInVotes = creature.votes.some(
    (v) => v?.toString() === userId
  );

  if (isExistingInVotes) {
    return;
  }

  creature.votes.push(userId);
  return creature.save();
};
