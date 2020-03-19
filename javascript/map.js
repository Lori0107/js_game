class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = [],
    this.forbiddenCases = []
    this.forbiddenPlayerCases = []
  }

  generateMap = () => {
    for(let x = 0; x < this.height; x++) {
      const lines = [];
      this.mapArray.push(lines);
      for(let y = 0; y < this.width; y++) {
        lines.push(new Case());
      };
    };
  }

  getRandomPosition = (arrayPassed) => {
    const positionY = Math.floor(Math.random() * arrayPassed.length);
    const positionX = Math.floor(Math.random() * arrayPassed.length);
    return {positionY, positionX}
  }

  generateItemPosition = (itemPassed) => {
    let val = this.getRandomPosition(this.mapArray);
    if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      console.log("----------- Have to regenerate position -----------")
      console.log(itemPassed)
      console.log(val.positionY)
      console.log(val.positionX)
      this.generateItemPosition(itemPassed);
    } else {
      this.mapArray[val.positionY][val.positionX] = itemPassed;
      this.mapArray[val.positionY][val.positionX].state = itemPassed.name;
      this.forbiddenCases.push(val);
      console.log(itemPassed)
      console.log(val.positionY)
      console.log(val.positionX)
      return val
    }
  }

  generateDisabledCases = (numberOfDisabledCases) => {
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

  generateWeapons = () => {
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

    weaponsArray.forEach(weapon => this.generateItemPosition(weapon));
  }

  generatePlayer2Position = (playerItem, forbiddenCasesItem) => {
    console.log("--------------- Player 1 Position ---------------");
    console.log(forbiddenCasesItem[0]);

    console.log("--------------- Player 2 RETURN ---------------");
    const test = this.generateItemPosition(playerItem);
    console.log("--------------- Player 2 Position ---------------");
    console.log(test);
    console.log("Player1", forbiddenCasesItem[0].positionY)
    console.log("Player1", forbiddenCasesItem[0].positionX)
    console.log("Player2", test.positionY)
    console.log("Player2", test.positionX)
    if (test.positionX === forbiddenCasesItem[0].positionX && test.positionY === forbiddenCasesItem[0].positionY || 
      test.positionX === forbiddenCasesItem[0].positionX + 1 && test.positionY === forbiddenCasesItem[0].positionY ||
      test.positionX === forbiddenCasesItem[0].positionX - 1  && test.positionY === forbiddenCasesItem[0].positionY ||
      test.positionX === forbiddenCasesItem[0].positionX  && test.positionY === forbiddenCasesItem[0].positionY + 1 ||
      test.positionX === forbiddenCasesItem[0].positionX  && test.positionY === forbiddenCasesItem[0].positionY - 1 ||
      test.positionX === forbiddenCasesItem[0].positionX + 1 && test.positionY === forbiddenCasesItem[0].positionY + 1 ||
      test.positionX === forbiddenCasesItem[0].positionX - 1 && test.positionY === forbiddenCasesItem[0].positionY - 1 ||
      test.positionX === forbiddenCasesItem[0].positionX + 1 && test.positionY === forbiddenCasesItem[0].positionY - 1 ||
      test.positionX === forbiddenCasesItem[0].positionX - 1 && test.positionY === forbiddenCasesItem[0].positionY + 1 
    ) {
      console.log("--------------- Player position Bad Position ---------------");
      console.log("Player 1", forbiddenCasesItem);
      console.log("Player 2", test);
    }
    // do {
    //   test
    // } while (test.positionX === forbiddenCasesItem.positionX && test.positionY === forbiddenCasesItem.positionY || 
    //     test.positionX === forbiddenCasesItem.positionX + 1 && test.positionY === forbiddenCasesItem.positionY ||
    //     test.positionX === forbiddenCasesItem.positionX - 1  && test.positionY === forbiddenCasesItem.positionY ||
    //     test.positionX === forbiddenCasesItem.positionX  && test.positionY === forbiddenCasesItem.positionY + 1 ||
    //     test.positionX === forbiddenCasesItem.positionX  && test.positionY === forbiddenCasesItem.positionY - 1 ||
    //     test.positionX === forbiddenCasesItem.positionX + 1 && test.positionY === forbiddenCasesItem.positionY + 1 ||
    //     test.positionX === forbiddenCasesItem.positionX - 1 && test.positionY === forbiddenCasesItem.positionY - 1 ||
    //     test.positionX === forbiddenCasesItem.positionX + 1 && test.positionY === forbiddenCasesItem.positionY - 1 ||
    //     test.positionX === forbiddenCasesItem.positionX - 1 && test.positionY === forbiddenCasesItem.positionY + 1 
    //   );
    //   console.log("2", test)
  }

  generatePlayers = () => {
    const player1 = new Player("Player1", 100);
    const player2 = new Player("Player2", 100);
    let positionPlayer1 = this.generateItemPosition(player1);
    console.log("----- Position Player 1 -----");
    console.log(positionPlayer1);
    this.forbiddenPlayerCases.push(positionPlayer1);
    console.log("----- Position Player 1 in Array -----");
    console.log(this.forbiddenPlayerCases);
    //this.generatePlayer2Position(player2, this.forbiddenPlayerCases)
  }

  displayItems = (map, customClass) => {
    $(map).append('<div class="'+ customClass +'"></div>');
  }

  generateCases = () => {
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
