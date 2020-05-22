class Player {
  constructor(name, pseudo, life, weapon) {
    this.name = name,
    this.pseudo = pseudo,
    this.life = life,
    this.position = {
      positionY: null,
      positionX: null
    },
    this.weapon = weapon,
    this.hasDefense = false
  }

  displayInfo() {
    $("#" + this.name +"-name")[0].textContent = this.pseudo;
    $("#" + this.name +"-life-points")[0].textContent = this.life + " PV";
    $("#" + this.name +"-life").progress({ percent: this.life });
    $("#" + this.name +"-weapon")[0].textContent = this.weapon.name;
    $("#" + this.name +"-weapon-points")[0].textContent = "Attack " + this.weapon.damages;
    $("#" + this.name + "-weapon-rating").rating({
      icon: "circle",
      interactive: false,
      initialRating: this.weapon.damages / 10,
    });
    $("#" + this.name +"-defense")[0].textContent = this.hasDefense == true ?
      "ACTIVE" : "DISABLED";
  }

  assignPositionToWeapon() {
    this.weapon.position = this.position;
  }

  chooseAttackOrDefense(e) {
    e.target.value === "defense" ? 
      this.hasDefense = true :
      this.hasDefense = false;
  }

  isAttacked(damagePoints) {
    this.hasDefense ? 
      this.life -= (damagePoints/2) : 
      this.life -= damagePoints;
    if(this.life < 0) this.life = 0;
  }

  checkIfLifeOver() {
    return this.life === 0
  }
}