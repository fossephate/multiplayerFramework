function spellInfo(info) {
  this.name = info.name;
  this.hoverText = info.hoverText;
  this.coolDownTime = info.coolDownTime;
  this.castTime = info.castTime;
  this.effect = info.effect;
  return this;
}

module.exports.getSpellInfo = function(spellName) {
  
  var returnedInfo;

  switch (spellName) {
    case "fireball":
      returnedInfo = new spellInfo({
        name: "fireball",
        iconLocation: "assets/models/icons/spells/painterly-spell-icons-1/fireball-red-1.png",
        hoverText: "Cast a powerfull fireball.",
        coolDownTime: 1000,
        castTime: 0,
        effect: false,
      });
      break;
      
    case "melee":
      returnedInfo = new spellInfo({
        name: "melee",
        iconLocation: "assets/models/icons/spells/painterly-spell-icons-1/fireball-red-1.png",
        hoverText: "Hit your target.",
        coolDownTime: 1000,
        castTime: 0,
        effect: false,
      });
      break;
      
      
    default:
      returnedInfo = new spellInfo({
        name: "none",
        iconLocation: "assets/models/icons/spells/nospell/greycross.svg",
        hoverText: "There is no spell in this slot.",
        coolDownTime: 0,
        castTime: 0,
        effect: false,
      });
      break;
  }
  return returnedInfo;
};