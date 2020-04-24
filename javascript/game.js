const mapArray = [];
const forbiddenCasesArray = [];

initGame = () => {
  // Weapons's instanciations
  const broom = new Weapon("Broom", 10);
  const poison = new Weapon("Poison", 10);
  const voodoo = new Weapon("Voodoo", 20);
  const sword = new Weapon("Sword", 20);
  const wand = new Weapon("Wand", 30);

  const weapons = [ voodoo, sword, wand ];

  // Players's instanciations
  const player1 = new Player("Player1", 100, broom);
  const player2 = new Player("Player2", 100, poison);
  const players = [ player1, player2 ];

  // Map's instanciations
  const map = new Map(10, 10, player1, player2, weapons);
  
  map.generateMap();
  map.generateDisabledCases(7);
  map.generateWeaponsPosition();
  map.generatePlayersPosition();
  players.map(player => {
    player.assignPositionToWeapon();
  });
  map.playerTurn();
}

$(document).ready(function() {
  initGame();
});