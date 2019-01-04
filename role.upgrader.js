/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var Upgrader = {
  run: function(creeper){
    //console.log('Hello?');
    if (creeper.memory.sourceID == 'something')
    {
      //console.log('Hi');
      var sourceset = creeper.room.find(FIND_SOURCES)[1];
      creeper.memory.sourceID = sourceset.id;
    }

    var controller = creeper.room.controller
    //console.log(creeper.memory.sourceID);
    var source = Game.getObjectById(creeper.memory.sourceID);
    const pathTo = creeper.room.findPath(creeper.pos,source.pos);
    const pathFrom = creeper.room.findPath(creeper.pos,controller.pos);

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
        creeper.memory.goal = 'upgrade';
      }
    }
    else if (creeper.memory.goal == 'upgrade')
    {
      if (creeper.upgradeController(controller) == 0)
      {
        creeper.upgradeController(controller);
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
module.exports = Upgrader;
