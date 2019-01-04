/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var Builder = {
  run: function(creeper){
    //console.log('Hello?');
    if (creeper.memory.sourceID == 'something')
    {
      //console.log('Hi');
      var sourceset = creeper.room.find(FIND_SOURCES)[1];
      creeper.memory.sourceID = sourceset.id;
    }

    var constructionSite = creeper.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    //console.log(creeper.memory.sourceID);
    var source = Game.getObjectById(creeper.memory.sourceID);
    const pathTo = creeper.room.findPath(creeper.pos,source.pos);
    const pathFrom = creeper.room.findPath(creeper.pos,constructionSite.pos);

    if(creeper.memory.goal == 'harvest')
    {
      //console.log("Harvesting...");

      if (creeper.harvest(source) == 0)
      {
          //console.log("I'm getting energy");
          creeper.harvest(source);
      }
      else
      {
          creeper.moveByPath(pathTo);
      }
      if(creeper.carryCapacity == _.sum(creeper.carry))
      {
        creeper.memory.goal = 'build';
      }
    }
    else if (creeper.memory.goal == 'build')
    {
      if (creeper.build(constructionSite) == 0)
      {
        creeper.build(constructionSite);
      }
      else
      {
        creeper.moveByPath(pathFrom);
      }
      if (_.sum(creeper.carry) == 0)
      {
        creeper.memory.sourceID = 'something';
        creeper.memory.goal = 'harvest';
      }
    }

  }
}
module.exports = Builder;
