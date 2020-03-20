class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = [],
    this.forbiddenCases = [],
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
      item.position = {positionY: val.positionY, positionX: val.positionX};
      this.mapArray[val.positionY][val.positionX] = item;
      this.mapArray[val.positionY][val.positionX].state = item.name;
      this.forbiddenCases.push(val);
      return val;
    } else {
      return val;
    }
  }

  generateWeapons = () => {
    this.weaponsArray.push(broom, voodoo, sword, wand);
    this.weaponsArray.forEach(weapon => this.generateItemPosition(weapon, true));
  }

  generatePlayers = () => {
    this.generateItemPosition(player1, true);
    this.generatePlayer2Position(player2);
    
    player1.weapon = broom;
    player2.weapon = broom;
  }

  comparePlayersPosition = (playerOne, playerTwo) => {
    if (playerOne.positionX === playerTwo.positionX && playerOne.positionY === playerTwo.positionY || 
        playerOne.positionX === playerTwo.positionX + 1 && playerOne.positionY === playerTwo.positionY ||
        playerOne.positionX === playerTwo.positionX - 1  && playerOne.positionY === playerTwo.positionY ||
        playerOne.positionX === playerTwo.positionX  && playerOne.positionY === playerTwo.positionY + 1 ||
        playerOne.positionX === playerTwo.positionX  && playerOne.positionY === playerTwo.positionY - 1 ||
        playerOne.positionX === playerTwo.positionX + 1 && playerOne.positionY === playerTwo.positionY + 1 ||
        playerOne.positionX === playerTwo.positionX - 1 && playerOne.positionY === playerTwo.positionY - 1 ||
        playerOne.positionX === playerTwo.positionX + 1 && playerOne.positionY === playerTwo.positionY - 1 ||
        playerOne.positionX === playerTwo.positionX - 1 && playerOne.positionY === playerTwo.positionY + 1) {
      return true;
    } else return false;
  }

  generatePlayer2Position = (playerItem) => {
    let itemPosition = this.generateItemPosition(playerItem, false);
    if (this.comparePlayersPosition(player1.position, itemPosition)) {
      return this.generatePlayer2Position(playerItem);
    } else {
      playerItem.position = {positionY: itemPosition.positionY, positionX: itemPosition.positionX};
      this.mapArray[itemPosition.positionY][itemPosition.positionX] = playerItem;
      this.mapArray[itemPosition.positionY][itemPosition.positionX].state = playerItem.name;
      this.forbiddenCases.push(itemPosition);
    }
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

const myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateDisabledCases(7);
myMap.generateWeapons();
myMap.generatePlayers();
myMap.generateCases();