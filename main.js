
var Spawn0 = Game.spawns['Spawn0'];
var ProtoRules = require('role.proto');
var UpgraderRules = require('role.upgrader');
var HarvesterRules = require('role.harvester');
var BuilderRules = require('role.builder');
var RepairerRules = require('role.repairer');
//console.log(Game.creeps);

var protoPopulation = 0;
var upgraderPopulation = 0;
var harvesterPopulation = 0;
var builderPopulation = 0;
var repairerPopulation = 0;

for (const i in Game.creeps)
{
  var creeper = Game.creeps[i];
  //console.log(creeper);
  if (creeper.memory.role == 'upgrader') {
    UpgraderRules.run(creeper);
    upgraderPopulation++;
  }
  else if (creeper.memory.role == 'harvester') {
    HarvesterRules.run(creeper);
    harvesterPopulation++;
  }
  else if (creeper.memory.role == 'builder') {
    BuilderRules.run(creeper);
    builderPopulation++;
  }
  else if (creeper.memory.role == 'repairer') {
    RepairerRules.run(creeper);
    repairerPopulation++;
  }
  else {
    ProtoRules.run(creeper);
    protoPopulation++;
  }

}
const extensions = creeper.room.find(FIND_MY_STRUCTURES, {
    filter: {structureType: STRUCTURE_EXTENSION,}});

var energyAvailable = Spawn0.energy;
for(const i in extensions) {
  energyAvailable = energyAvailable + extensions[i].energy;
}

if ((protoPopulation < 1) && (energyAvailable >= 200))
{
  console.log("Making a Proto");
  Spawn0.spawnCreep([WORK,MOVE,CARRY],'Proto'+Math.random());
}

else if ((harvesterPopulation < 2) && (energyAvailable >= 400))
{
  var harvesterName = 'Harvester'+Math.random();
  Spawn0.spawnCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY],harvesterName);
  Game.creeps[harvesterName].memory.role = 'harvester';
  Game.creeps[harvesterName].memory.goal = 'harvest';
  Game.creeps[harvesterName].memory.sourceID = 'something';
  console.log('Making a Harvester');
  //console.log(Game.creeps[upgraderName].memory.sourceID);
}
else if ((upgraderPopulation < 2) && (energyAvailable >= 300))
{
  var upgraderName = 'Upgrader'+Math.random();
  Spawn0.spawnCreep([WORK,WORK,MOVE,CARRY],upgraderName);
  Game.creeps[upgraderName].memory.role = 'upgrader';
  Game.creeps[upgraderName].memory.goal = 'harvest';
  Game.creeps[upgraderName].memory.sourceID = 'something';
  console.log('Making an Upgrader');
  //console.log(Game.creeps[upgraderName].memory.sourceID);
}
else if ((builderPopulation < 2) && (energyAvailable >= 300))
{
  var builderName = 'Builder'+Math.random();
  Spawn0.spawnCreep([WORK,MOVE,MOVE,CARRY,CARRY],builderName);
  Game.creeps[builderName].memory.role = 'builder';
  Game.creeps[builderName].memory.goal = 'harvest';
  Game.creeps[builderName].memory.sourceID = 'something';
  console.log('Making a Builder');
  //console.log(Game.creeps[upgraderName].memory.sourceID);
}
else if ((repairerPopulation < 1) && (energyAvailable >= 300))
{
  var repairerName = 'Repairer'+Math.random();
  Spawn0.spawnCreep([WORK,MOVE,MOVE,CARRY,CARRY],repairerName);
  Game.creeps[repairerName].memory.role = 'repairer';
  Game.creeps[repairerName].memory.goal = 'harvest';
  Game.creeps[repairerName].memory.sourceID = 'something';
  Game.creeps[repairerName].memory.repairID = 'none';
  console.log('Making a Repairer');
  //console.log(Game.creeps[upgraderName].memory.sourceID);
}