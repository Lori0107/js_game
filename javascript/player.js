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

  displayInfo() {
    $("#" + this.name +"-name")[0].textContent = this.name;
    //$("#" + this.name +"-life")[0].dataset.percent = this.life;
    $("#" + this.name +"-life-label")[0].textContent = this.life + " pts";
    $("#" + this.name +"-weapon")[0].textContent = this.weapon.name;
    $("#" + this.name +"-weapon-damages")[0].textContent = this.weapon.damages + "pts";
    $("#" + this.name +"-defense")[0].textContent = this.hasDefense == true ?
      "Yes" : "No";
    //$("#" + this.name +"-life").progress();
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