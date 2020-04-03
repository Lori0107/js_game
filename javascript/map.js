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
  displayItems = (map, customClass, customPositionX, customPositionY) => {
    $(map).append('<div class="'+ customClass +'" data-position-x="' + customPositionX + '" data-position-y="' + customPositionY + '"></div>');
  }

  // Generate each Map's cases
  generateCases = () => {
    this.mapArray.map(y => y.map(x => this.displayItems('#game-map', x.state.toLowerCase(), x.positionX, x.positionY)))
  }

  // Check if a value is even
  isEven = (value) => value%2 === 0;

  // Determine which player can play
  playerTurn = () => {
    // player1.canPlay = this.isEven(this.turn);
    // player2.canPlay = !this.isEven(this.turn);
    this.playerMove(this.isEven(this.turn) ? player1 : player2);
  }

  // Handle the player's move
  playerMove = (player) => {
    this.showMoves(player.position);
    this.generateCases();
    this.test(player);
  }

  // Show the moves availables
  showMoves = (position) => {
    const up = [
      [position.positionY - 1, position.positionX],
      [position.positionY - 2, position.positionX],
      [position.positionY - 3, position.positionX],
    ];
    const down = [
      [position.positionY + 1, position.positionX],
      [position.positionY + 2, position.positionX],
      [position.positionY + 3, position.positionX],
    ];
    const right = [
      [position.positionY, position.positionX + 1],
      [position.positionY, position.positionX + 2],
      [position.positionY, position.positionX + 3],
    ];
    const left = [
      [position.positionY, position.positionX - 1],
      [position.positionY, position.positionX - 2],
      [position.positionY, position.positionX - 3],
    ];

    this.checkMoves(up);
    this.checkMoves(down);
    this.checkMoves(right);
    this.checkMoves(left);
  }
  
  // Check which moves are availables
  checkMoves = (moves) => {
    moves.some(move => {
      if(move[0] < 0 || move[1] < 0 || move[0] > 9 || move[1] > 9 || this.mapArray[move[0]][move[1]].state == "disabled" || this.mapArray[move[0]][move[1]].name === player1.name ||this.mapArray[move[0]][move[1]].name === player2.name) {
        return true;
      } else {
        this.mapArray[move[0]][move[1]].state = "move-available";
        this.mapArray[move[0]][move[1]].positionY = move[0];
        this.mapArray[move[0]][move[1]].positionX = move[1];
      };
    });
  }

  // Remove the available moves for a player
  removeMoves = () => {
    this.mapArray.map(y => {
      y.map(x => {
        if (x.state === "move-available") {
          x.state = "empty";
        }
      })
    })
  }

  test = (player) => {
    $("#game-map").on("click", (el) => {
      if(el.target.className == "move-available") {
        this.mapArray[player.position.positionY][player.position.positionX] = new Case();
        this.mapArray[el.target.dataset.positionY][el.target.dataset.positionX] = player;
        this.removeMoves();
        $("#game-map").empty();
        this.turn += 1;
        this.playerMove(this.isEven(this.turn) ? player1 : player2);
      }
    });
  }
};

const myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateDisabledCases(7);
myMap.generateWeapons();
myMap.generatePlayers();
myMap.playerTurn();
//myMap.generateCases();