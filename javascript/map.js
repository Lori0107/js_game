class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = [],
    this.forbiddenCases = []
  }

  generateMap() {
    for(let x = 0; x < this.height; x++) {
      const lines = [];
      this.mapArray.push(lines);
      for(let y = 0; y < this.width; y++) {
        lines.push(new Case());
      };
    };
  }

  getRandomPosition(arrayPassed) {
    const positionY = Math.floor(Math.random() * arrayPassed.length);
    const positionX = Math.floor(Math.random() * arrayPassed.length);
    return {positionY, positionX}
  }

  generatePosition(arrayPassed) {
    for(let i = 0; i < arrayPassed.length; i++) {
      const val = this.getRandomPosition(this.mapArray);
      if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
        i--;
      } else {
        this.mapArray[val.positionY][val.positionX] = arrayPassed[i];
        this.mapArray[val.positionY][val.positionX].state = arrayPassed[i].name;
        this.forbiddenCases.push(val);
      }
    }
  }

  generateItemPosition = (itemPassed) => {
    console.log("pass here")
    val = this.getRandomPosition(this.mapArray);
    if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      console.log("HERRRREEEEE")
      this.generateItemPosition(itemPassed);
      console.log("item passed if error: ", itemPassed)
      console.log("val after error", val)
      console.log("HOOOOOOO")
      this.mapArray[val.positionY][val.positionX] = itemPassed;
      this.mapArray[val.positionY][val.positionX].state = itemPassed.name;
      this.forbiddenCases.push(val);
      return val
    } else {
      this.mapArray[val.positionY][val.positionX] = itemPassed;
      this.mapArray[val.positionY][val.positionX].state = itemPassed.name;
      this.forbiddenCases.push(val);
      return val
    }
  }

  generateDisabledCases(numberOfDisabledCases) {
    for(let i = 0; i < numberOfDisabledCases; i++) {
      const val = this.getRandomPosition(this.mapArray);
      if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
        i--
      } else {
        this.mapArray[val.positionY][val.positionX].state = "disabled";
        this.forbiddenCases.push(val);
      }
    }
  }

  generateWeapons() {
    const broom = new Weapon("Broom", 10);
    const voodoo = new Weapon("Voodoo", 20);
    const sword = new Weapon("Sword", 30);
    const wand = new Weapon("Wand", 40);

    const weaponsArray = [
      broom,
      voodoo,
      sword,
      wand
    ];

    this.generatePosition(weaponsArray);
  }

  generatePlayers() {
    const player1 = new Player("Player1", 100);
    const player2 = new Player("Player2", 100);

    const forbiddenPlayerCases = [];

    let positionPlayer1 = this.generateItemPosition(player1);
    forbiddenPlayerCases.push(
              positionPlayer1, 
              {positionY: positionPlayer1.positionY, positionX: positionPlayer1.positionX + 1},
              {positionY: positionPlayer1.positionY, positionX: positionPlayer1.positionX - 1},
              {positionY: positionPlayer1.positionY + 1, positionX: positionPlayer1.positionX},
              {positionY: positionPlayer1.positionY - 1, positionX: positionPlayer1.positionX},
              {positionY: positionPlayer1.positionY + 1, positionX: positionPlayer1.positionX + 1},
              {positionY: positionPlayer1.positionY - 1, positionX: positionPlayer1.positionX - 1},
              {positionY: positionPlayer1.positionY + 1, positionX: positionPlayer1.positionX - 1},
              {positionY: positionPlayer1.positionY - 1, positionX: positionPlayer1.positionX + 1})
    console.log("position: ", positionPlayer1)
    console.log(forbiddenPlayerCases)

  }

  displayItems(map, customClass) {
    $(map).append('<div class="'+ customClass +'"></div>');
  }

  generateCases() {
    this.mapArray.map(y => {
      return y.map(x => {
          this.displayItems('#game-map', x.state.toLowerCase());
      })
    })
  }
};

let myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateDisabledCases(7);
myMap.generateWeapons();
myMap.generatePlayers();
myMap.generateCases();
