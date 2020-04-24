class Map {
  constructor(height, width, firstPlayer, secondPlayer, weaponsArray) {
    this.height = height,
    this.width = width,
    this.firstPlayer = firstPlayer,
    this.secondPlayer = secondPlayer,
    //this.mapArray = [],
    //forbiddenCasesArray = [],
    this.weaponsArray = weaponsArray,
    this.turn = 0
  }

  // Generate the two-dimensional array which represent the game's Map
  generateMap = () => {
    for(let y = 0; y < this.height; y++) {
      const lines = [];
      mapArray.push(lines);
      for(let x = 0; x < this.width; x++) {
        lines.push(new Case());
      }
    }
  }

  // Return random coordinate's position
  getRandomPosition = (arrayPassed) => {
    const positionY = Math.floor(Math.random() * arrayPassed.length);
    const positionX = Math.floor(Math.random() * arrayPassed.length);
    return { positionY, positionX };
  }

  // Generate the disabled cases of the Map
  generateDisabledCases = (disabledCases) => {
    for(let i = 0; i < disabledCases; i++) {
      const val = this.getRandomPosition(mapArray);
      mapArray[val.positionY][val.positionX].state = "disabled";
      forbiddenCasesArray.push(val);
    }
  }

  // Generate random position for a given item, take into account positions already taken
  generateItemPosition = (item, isRegistered) => {
    let val = this.getRandomPosition(mapArray);
    if (forbiddenCasesArray.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      return this.generateItemPosition(item, isRegistered);
    } else if (isRegistered == true) {
      item.position = {positionY: val.positionY, positionX: val.positionX};
      mapArray[val.positionY][val.positionX] = item;
      mapArray[val.positionY][val.positionX].state = item.name;
      forbiddenCasesArray.push(val);
      return val;
    } else {
      return val;
    }
  }

  // Generate weapons's positions
  generateWeaponsPosition = () => {
    this.weaponsArray.forEach(weapon => this.generateItemPosition(weapon, true));
  }

  // Generate players's positions
  generatePlayersPosition = () => {
    this.generateItemPosition(this.firstPlayer, true);
    this.generatesecondPlayerPosition(this.secondPlayer);
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

  // Generate the second Player's position, check if is not near the first Player
  generatesecondPlayerPosition = (playerItem) => {
    let itemPosition = this.generateItemPosition(playerItem, false);
    if (this.compareItemsPosition(this.firstPlayer.position, itemPosition)) {
      return this.generatesecondPlayerPosition(playerItem);
    } else {
      playerItem.position = {positionY: itemPosition.positionY, positionX: itemPosition.positionX};
      mapArray[itemPosition.positionY][itemPosition.positionX] = playerItem;
      mapArray[itemPosition.positionY][itemPosition.positionX].state = playerItem.name;
      forbiddenCasesArray.push(itemPosition);
    }
  }

  // Handle each Map's item
  generateCases = () => {
    mapArray.map(y => y.map(x => this.displayItems('#game-map', x.state.toLowerCase(), x.position.positionX, x.position.positionY)))
  }

  // Generate a div for each Map's item
  displayItems = (map, customClass, customPositionX, customPositionY) => {
    $(map).append('<div class="'+ customClass +'" data-x="' + customPositionX + '" data-y="' + customPositionY + '"></div>');
  }

  // Check if a value is even
  isEven = (value) => value%2 === 0;

  // Determine which player can play
  playerTurn = () => {
    $("#game-map").off("click");
    this.playerMove(this.isEven(this.turn) ? this.firstPlayer : this.secondPlayer);
  }

  // Handle the player's move
  playerMove = (player) => {
    this.checkMoves(player.position);
    this.generateCases();
    this.handlePlayerClick(player);
  }

  // Check which moves are availables
  checkMoves = (position) => {
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
    this.showMoves(up);
    this.showMoves(down);
    this.showMoves(right);
    this.showMoves(left);
  }

  // Show the moves availables
  showMoves = (moves) => {
    moves.some(move => {
      if(move[0] < 0 || 
        move[1] < 0 || 
        move[0] > 9 || 
        move[1] > 9 || 
        mapArray[move[0]][move[1]].state == "disabled" || 
        mapArray[move[0]][move[1]] instanceof Player) {
        return true;
      } else if (mapArray[move[0]][move[1]] instanceof Weapon) {
        mapArray[move[0]][move[1]].state += " weapon-available";
        mapArray[move[0]][move[1]].position = { positionY: move[0], positionX: move[1] };
      } else {
        mapArray[move[0]][move[1]].state = "move-available";
        mapArray[move[0]][move[1]].position = { positionY: move[0], positionX: move[1] };
      };
    });
  }

  // Remove the player's available moves
  removeMoves = () => {
    mapArray.map(y => {
      y.map(x => {
        x.state == "move-available" ? x.state = "empty" : x.constructor.name == "Weapon" ? x.state = x.name : false;
      })
    })
  }

  checkWay(playerPosition, targetPosition) {
    console.log("player y: ", playerPosition.positionY, "player x: ", playerPosition.positionX);
    console.log("target y: ", targetPosition.y, "target x: ", targetPosition.x);
    if(playerPosition.positionY == targetPosition.y) {
      if(targetPosition.x > playerPosition.positionX) {
        console.log("target greater than player");
        do {
          targetPosition.x --;
          console.log(targetPosition.x);
          console.log(mapArray[targetPosition.y][targetPosition.x]);
        } while (targetPosition.x > playerPosition.positionX);
      } else {
        console.log("target lower than player");
        do {
          targetPosition.x ++;
          console.log(targetPosition.x);
          console.log(mapArray[targetPosition.y][targetPosition.x]);
        } while (targetPosition.x < playerPosition.positionX);
      }
    }
  }

  // Check if the player is on the case where he left his old weapon
  checkTypeOfPlayerPosition = (position) => {
    mapArray[position.positionY][position.positionX] instanceof Weapon ? true : mapArray[position.positionY][position.positionX] = new Case();
  }

  // Handle the new player's position
  playerPickNewPosition = (player, newPosition) => {
    mapArray[newPosition.dataset.y][newPosition.dataset.x] = player;
    player.position = { 
      positionY: +newPosition.dataset.y, 
      positionX: +newPosition.dataset.x 
    };
  }

  // Handle the player's weapon change
  playerPickNewWeapon = (player, newWeapon) => {
    let weaponPicked = mapArray[newWeapon.dataset.y][newWeapon.dataset.x];
    mapArray[newWeapon.dataset.y][newWeapon.dataset.x] = player.weapon;
    player.weapon = weaponPicked;
    player.position = {
      positionY: +newWeapon.dataset.y, 
      positionX: +newWeapon.dataset.x
    };
  }

  clearMap = () => {
    $("#game-map").empty();
  }

  prepareNewTurn = () => {
    this.removeMoves();
    this.clearMap();
    this.turn += 1;
    this.playerTurn();
  }

  // On click, check Player's initial position & if he pick a new position || a new weapon
  handlePlayerClick = (player) => {
    $("#game-map").on("click", (el) => {
      const elClass = el.target.className;
      if(elClass == "move-available" || elClass.includes("weapon-available")) {
        this.checkWay(player.position, el.target.dataset)
        // this.checkTypeOfPlayerPosition(player.position);
        // elClass == "move-available" ? this.playerPickNewPosition(player, el.target) : elClass.includes("weapon-available") ? this.playerPickNewWeapon(player, el.target) : false;
        // this.prepareNewTurn();
      }
    });
  }
}