const mapArray = [];
const forbiddenCasesArray = [];

//mettre dans function
// Weapons's instanciations
const knife = new Weapon("Knife", 10);
const shuriken = new Weapon("Shuriken", 10);
const kunai = new Weapon("Kunai", 20);
const nunchaku = new Weapon("Nunchaku", 20);
const sword = new Weapon("Sword", 30);

const weapons = [ sword, nunchaku, kunai ];

// Players's instanciations
const p1 = new Player("p1", "Tanoshiki", 100, shuriken);
const p2 = new Player("p2", "Rinkachiku", 100, knife);
const players = [ p1, p2 ];

// Map's instanciations
const map = new Map(10, 10, p1, p2, weapons);
//map. init game en callback

initGame = () => {
  //lancer la function
  map.generateMap();
  map.generateDisableCases(7);
  map.generateWeaponsPosition();
  map.generatePlayersPosition();
  players.map(player => {
    player.assignPositionToWeapon();
    player.displayInfo()
  });
  map.playerTurn();
}

$(document).ready(() => initGame());