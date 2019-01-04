/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var Harvester = {
  run: function(creeper){
    if (creeper.memory.sourceID == 'something')
    {
      var sourceset = creeper.room.find(FIND_SOURCES)[0];
      creeper.memory.sourceID = sourceset.id;
    }

  var source = Game.getObjectById(creeper.memory.sourceID);
  var Spawn0 = Game.spawns['Spawn0']
  const extensions = creeper.room.find(FIND_MY_STRUCTURES, {
    filter: {structureType: STRUCTURE_EXTENSION,} });
  var extention = extensions.sort((a,b) => a.energy - b.energy)[0]; 
  const pathTo = creeper.room.findPath(creeper.pos,source.pos);


  if(creeper.memory.goal == 'harvest')
  {
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
      creeper.memory.goal = 'transfer';
    }
  }
  else if (creeper.memory.goal == 'transfer')
  {
    if(Spawn0.energy < Spawn0.energyCapacity)
    {
      const pathSpawn = creeper.room.findPath(creeper.pos,Spawn0.pos,{ignoreCreeps:true});
      if (creeper.transfer(Spawn0,RESOURCE_ENERGY,25) == 0)
      {
        creeper.transfer(Spawn0,RESOURCE_ENERGY,25);
      }
      else
      {
        creeper.moveByPath(pathSpawn);
      }
    }
    else {
      const pathExtention = creeper.room.findPath(creeper.pos,extention.pos,{ignoreCreeps:true});
      if (creeper.transfer(extention,RESOURCE_ENERGY,25) == 0)
      {
        creeper.transfer(extention,RESOURCE_ENERGY,25);
      }
      else
      {
        creeper.moveByPath(pathExtention);
      }
    }
    if (_.sum(creeper.carry) == 0)
    {
      creeper.memory.sourceID = 'something';
      creeper.memory.goal = 'harvest';
    }
  }
}
}
module.exports = Harvester;