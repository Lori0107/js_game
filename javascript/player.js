class Player {
  constructor(name, life, weapon) {
    this.name = name,
    this.life = life,
    this.position = {
      positionY: null,
      positionX: null
    },
    this.weapon = weapon,
    this.hasDefence = false
  }

  assignPositionToWeapon() {
    this.weapon.position = this.position;
  }

  chooseAttackOrDefence(e) {
    e.target.value === "defence" ? 
      this.hasDefence = true : 
      this.hasDefence = false;
    console.log("---- PLAYER " + this.name + " CHOOSE ---- ");
    console.log(e.target.value);
    console.log("----------------------------------------- ");
  }

  isAttacked(damagePoints) {
    this.hasDefence ? 
      this.life -= (damagePoints/2) : 
      this.life -= damagePoints;
    if(this.life < 0) this.life = 0;
    console.log("---- PLAYER " + this.name + " IS ATTACKED ---- ");
    console.log("Life left : " + this.life + "point");
    console.log("----------------------------------------- ");
  }

  checkIfLifeOver() {
    return this.life === 0
  }
}