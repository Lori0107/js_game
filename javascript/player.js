class Player {
  constructor(name, life, weapon) {
    this.name = name,
    this.life = life,
    this.position = {
      positionY: null,
      positionX: null
    },
    this.weapon = weapon,
    this.hasDefense = false
  }

  assignPositionToWeapon() {
    this.weapon.position = this.position;
  }

  chooseAttackOrDefense(e) {
    e.target.value === "defense" ? 
      this.hasDefense = true :
      this.hasDefense = false;
    console.log("---- PLAYER " + this.name + " CHOOSE ---- ");
    console.log(e.target.value);
    console.log("----------------------------------------- ");
  }

  isAttacked(damagePoints) {
    this.hasDefense ? 
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