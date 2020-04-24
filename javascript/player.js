class Player {
  constructor(name, life, weapon) {
    this.name = name,
    this.life = life,
    this.position = {
      positionY: null,
      positionX: null
    },
    this.weapon = weapon
  }

  assignPositionToWeapon() {
    this.weapon.position = this.position;
  }
}