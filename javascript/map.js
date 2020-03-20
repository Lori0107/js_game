class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = [],
    this.forbiddenCases = [],
    this.forbiddenPlayerCases = [],
    this.weaponsArray = []
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
    return {positionY, positionX};
  }

  generateDisabledCases = (numberOfDisabledCases) => {
    for(let i = 0; i < numberOfDisabledCases; i++) {
      const val = this.getRandomPosition(this.mapArray);
      if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
        i--;
      } else {
        this.mapArray[val.positionY][val.positionX].state = "disabled";
        this.forbiddenCases.push(val);
      }
    }
  }

  generateItemPosition = (item, isRegistered) => {
    let val = this.getRandomPosition(this.mapArray);
    if (this.forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      return this.generateItemPosition(item, isRegistered);
    } else if (isRegistered == true) {
      item.position = [val.positionY, val.positionX];
      this.mapArray[val.positionY][val.positionX] = item;
      this.mapArray[val.positionY][val.positionX].state = item.name;
      this.forbiddenCases.push(val);
      return val;
    } else {
      return val;
    }
  }

  generateWeapons = () => {
    const broom = new Weapon("Broom", 10);
    const voodoo = new Weapon("Voodoo", 20);
    const sword = new Weapon("Sword", 30);
    const wand = new Weapon("Wand", 40);

    this.weaponsArray.push(broom, voodoo, sword, wand);
    this.weaponsArray.forEach(weapon => this.generateItemPosition(weapon, true));
  }

  generatePlayers = () => {
    const player1 = new Player("Player1", 100);
    const player2 = new Player("Player2", 100);
    let positionPlayer1 = this.generateItemPosition(player1, true);
    this.forbiddenPlayerCases.push(positionPlayer1);
    this.generatePlayer2Position(player2, this.forbiddenPlayerCases);
    player1.weapon = this.weaponsArray[0];
    player1.weapon.position = player1.position;
    player2.weapon = this.weaponsArray[0];
  }

  generatePlayer2Position = (playerItem, forbiddenCasesItem) => {
    let val = this.generateItemPosition(playerItem, false);
    if (val.positionX === forbiddenCasesItem[0].positionX && val.positionY === forbiddenCasesItem[0].positionY || 
      val.positionX === forbiddenCasesItem[0].positionX + 1 && val.positionY === forbiddenCasesItem[0].positionY ||
      val.positionX === forbiddenCasesItem[0].positionX - 1  && val.positionY === forbiddenCasesItem[0].positionY ||
      val.positionX === forbiddenCasesItem[0].positionX  && val.positionY === forbiddenCasesItem[0].positionY + 1 ||
      val.positionX === forbiddenCasesItem[0].positionX  && val.positionY === forbiddenCasesItem[0].positionY - 1 ||
      val.positionX === forbiddenCasesItem[0].positionX + 1 && val.positionY === forbiddenCasesItem[0].positionY + 1 ||
      val.positionX === forbiddenCasesItem[0].positionX - 1 && val.positionY === forbiddenCasesItem[0].positionY - 1 ||
      val.positionX === forbiddenCasesItem[0].positionX + 1 && val.positionY === forbiddenCasesItem[0].positionY - 1 ||
      val.positionX === forbiddenCasesItem[0].positionX - 1 && val.positionY === forbiddenCasesItem[0].positionY + 1 
    ) {
      return this.generatePlayer2Position(playerItem, forbiddenCasesItem);
    } else {
      playerItem.position = [val.positionY, val.positionX];
      this.mapArray[val.positionY][val.positionX] = playerItem;
      this.mapArray[val.positionY][val.positionX].state = playerItem.name;
      this.forbiddenCases.push(val);
  }

    // const test = this.generateItemPosition(playerItem, false);
    // do {
    //   return this.generatePlayer2Position(playerItem, forbiddenCasesItem)
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
    //   this.mapArray[test.positionY][test.positionX] = playerItem;
    //   this.mapArray[test.positionY][test.positionX].state = playerItem.name;
    //   console.log("--------------- Player 2 position pushed ---------------");
    //   console.log(test);
    //   this.forbiddenCases.push(test);
  }

  // assignWeaponToPlayer = (player, weapons) => {
  // };

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
