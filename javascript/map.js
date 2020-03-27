class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = [],
    this.forbiddenCases = [],
    this.weaponsArray = [],
    this.turn = 0
  }

  // Generate the two-dimensional array which represent the game's Map
  generateMap = () => {
    for(let x = 0; x < this.height; x++) {
      const lines = [];
      this.mapArray.push(lines);
      for(let y = 0; y < this.width; y++) {
        lines.push(new Case());
      };
    };
  }

  // Return random position coordinates
  getRandomPosition = (arrayPassed) => {
    const positionY = Math.floor(Math.random() * arrayPassed.length);
    const positionX = Math.floor(Math.random() * arrayPassed.length);
    return {positionY, positionX};
  }

  // Generate the disabled cases of the Map
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

  // Generate random position for a given item, take into account positions already taken
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

  // Generate weapons's positions
  generateWeapons = () => {
    this.weaponsArray.push(voodoo, sword, wand);
    this.weaponsArray.forEach(weapon => this.generateItemPosition(weapon, true));
  }

  // Generate players's positions
  generatePlayers = () => {
    player1.weapon = broom;
    broom.position = player1.position;
    this.generateItemPosition(player1, true);

    player2.weapon = poison;
    poison.position = player2.position;
    this.generatePlayer2Position(player2);
  }

  // Check if 2 items are side by side
  compareItemsPosition = (itemOne, itemTwo) => {
    if (itemOne.positionX === itemTwo.positionX && itemOne.positionY === itemTwo.positionY || 
        itemOne.positionX === itemTwo.positionX + 1 && itemOne.positionY === itemTwo.positionY ||
        itemOne.positionX === itemTwo.positionX - 1  && itemOne.positionY === itemTwo.positionY ||
        itemOne.positionX === itemTwo.positionX && itemOne.positionY === itemTwo.positionY + 1 ||
        itemOne.positionX === itemTwo.positionX && itemOne.positionY === itemTwo.positionY - 1 ||
        itemOne.positionX === itemTwo.positionX + 1 && itemOne.positionY === itemTwo.positionY + 1 ||
        itemOne.positionX === itemTwo.positionX - 1 && itemOne.positionY === itemTwo.positionY - 1 ||
        itemOne.positionX === itemTwo.positionX + 1 && itemOne.positionY === itemTwo.positionY - 1 ||
        itemOne.positionX === itemTwo.positionX - 1 && itemOne.positionY === itemTwo.positionY + 1) {
      return true;
    } else return false;
  }

  // Generate Player 2's position, check if is not near Player 1
  generatePlayer2Position = (playerItem) => {
    let itemPosition = this.generateItemPosition(playerItem, false);
    if (this.compareItemsPosition(player1.position, itemPosition)) {
      return this.generatePlayer2Position(playerItem);
    } else {
      playerItem.position = {positionY: itemPosition.positionY, positionX: itemPosition.positionX};
      this.mapArray[itemPosition.positionY][itemPosition.positionX] = playerItem;
      this.mapArray[itemPosition.positionY][itemPosition.positionX].state = playerItem.name;
      this.forbiddenCases.push(itemPosition);
    }
  }

  // Generate a div for each item of the game's Map
  displayItems = (map, customClass) => {
    $(map).append('<div class="'+ customClass +'"></div>');
  }

  // Generate each Map's cases
  generateCases = () => {
    this.mapArray.map(y => {
      return y.map(x => {
          this.displayItems('#game-map', x.state.toLowerCase());
      });
    });
  }

  // Check if a value is even
  isEven = (value) => {
    if (value%2 === 0)
      return true;
    else
      return false;
  };

  // Determine which player can play
  playerTurn = () => {
    if(this.isEven(this.turn)) {
      player1.canPlay = true;
      player2.canPlay = false;
      this.playerMove(player1);
    } else {
      player1.canPlay = false;
      player2.canPlay = true;
      this.playerMove(player2);
    }
  }

  playerMove = (player) => {
    let playerPosition = player.position;
    this.showMoves(playerPosition)
    
    //this.turn += 1;
    //this.playerTurn();
  }

  showMoves = (position) => {
    let up = [
      [position.positionY - 1, position.positionX],
      [position.positionY - 2, position.positionX],
      [position.positionY - 3, position.positionX]
    ];
    let down = [
      [position.positionY + 1, position.positionX],
      [position.positionY + 2, position.positionX],
      [position.positionY + 3, position.positionX]
    ];
    let right = [
      [position.positionY, position.positionX + 1],
      [position.positionY, position.positionX + 2],
      [position.positionY, position.positionX + 3]
    ];
    let left = [
      [position.positionY, position.positionX - 1],
      [position.positionY, position.positionX - 2],
      [position.positionY, position.positionX - 3]
    ];

    this.checkMoves(up);
    this.checkMoves(down);
    this.checkMoves(right);
    this.checkMoves(left);
    this.generateCases();
  }
  
  checkMoves = (moves) => {
    moves.some(move => {
      if(move[0] < 0 || move[1] < 0 || move[0] > 9 || move[1] > 9) {
        return true;
      } else if (this.mapArray[move[0]][move[1]].state == "disabled") {
        return true;
      } else {
        this.mapArray[move[0]][move[1]].state = "move-available";
      };
    });
  }
};

const myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateDisabledCases(7);
myMap.generateWeapons();
myMap.generatePlayers();
myMap.generateCases();
myMap.playerTurn();