// Weapons's instanciations
const broom = new Weapon("Broom", 10);
const poison = new Weapon("Poison", 10);
const voodoo = new Weapon("Voodoo", 20);
const sword = new Weapon("Sword", 20);
const wand = new Weapon("Wand", 30);

// Weapons available on the Map
const weaponsArray = [voodoo, sword, wand];

// Players's instanciations
const player1 = new Player("Player1", 100);
const player2 = new Player("Player2", 100);

// Assign a weapon for each player
player1.weapon = broom;
player2.weapon = poison;