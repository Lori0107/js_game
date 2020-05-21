const mapArray = [];
const forbiddenCasesArray = [];
let turn = 0;

// Weapons's instanciations
const knife = new Weapon("Knife", 10);
const shuriken = new Weapon("Shuriken", 10);
const kunai = new Weapon("Kunai", 20);
const nunchaku = new Weapon("Nunchaku", 20);
const sword = new Weapon("Sword", 30);

const weapons = [ sword, nunchaku, kunai ];

// Players's instanciations
const player1 = new Player("Player1", 100, shuriken);
const player2 = new Player("Player2", 100, knife);
const players = [ player1, player2 ];

// Map's instanciations
const map = new Map(10, 10, player1, player2, weapons);

initGame = () => {
  map.generateMap();
  map.generateDisabledCases(7);
  map.generateWeaponsPosition();
  map.generatePlayersPosition();
  players.map(player => {
    player.assignPositionToWeapon();
    player.displayInfo()
  });
  map.playerTurn();
}

$(document).ready(() => initGame());