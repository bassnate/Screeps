/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var Repairer = {
  run: function(creeper){
    //console.log('Hello?');
    if (creeper.memory.sourceID == 'something')
    {
      //console.log('Hi');
      var sourceset = creeper.room.find(FIND_SOURCES)[1];
      creeper.memory.sourceID = sourceset.id;
    }
    if (creeper.memory.repairID == 'none') {
      var repairSites = creeper.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax });
      var repairSite = repairSites.sort((a,b) => a.hits - b.hits)[0];
      if (repairSite != undefined)
      { creeper.memory.repairID = repairSite.id; }
      else {creeper.memory.repairID = 'none'}

    }
    if(creeper.memory.repairID != 'none')
    {
      //console.log(creeper.memory.sourceID);
      var source = Game.getObjectById(creeper.memory.sourceID);
      var repair = Game.getObjectById(creeper.memory.repairID);
      const pathTo = creeper.room.findPath(creeper.pos,source.pos);
      const pathFrom = creeper.room.findPath(creeper.pos,repair.pos);

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
          creeper.memory.goal = 'repair';
          creeper.memory.repairID = 'none';
        }
      }
      else if (creeper.memory.goal == 'repair')
      {
        if (creeper.repair(repair) == 0)
        {
          creeper.repair(repair);
          if (repair.hits == repair.hitsMax)
          {
            creeper.memory.repairID = 'none';
          }
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
}
module.exports = Repairer;
