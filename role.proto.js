/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('proto');
 * mod.thing == 'a thing'; // true
 */
var Proto = {
  run: function(creeper){
    var Spawn0 = Game.spawns['Spawn0'];
    var source = creeper.room.find(FIND_SOURCES_ACTIVE);
    const pathTo = creeper.room.findPath(creeper.pos,source[0].pos);
    const pathFrom = creeper.room.findPath(creeper.pos,Spawn0.pos);
    if (creeper.carryCapacity > _.sum(creeper.carry))
    {
        if (creeper.harvest(source[0]) == 0)
        {
            creeper.harvest(source[0]);
        }
        else
        {
            creeper.moveByPath(pathTo);
        }
    }

    else
    {
        if (creeper.transfer(Spawn0,RESOURCE_ENERGY,creeper.carryCapacity) == 0)
        {
           creeper.transfer(Spawn0,RESOURCE_ENERGY,creeper.carryCapacity);
           Spawn0.renewCreep(creeper);
        }
        else
        {
            creeper.moveByPath(pathFrom);

        }
    }
  }
};


module.exports = Proto;
