class Map {
  constructor(height, width, firstPlayer, secondPlayer, weaponsArray) {
    this.height = height,
    this.width = width,
    this.firstPlayer = firstPlayer,
    this.secondPlayer = secondPlayer,
    //this.mapArray = [],
    //forbiddenCasesArray = [],
    this.weaponsArray = weaponsArray,
    this.turn = 0,
    this.isBattle = false
  }

  // Generate the two-dimensional array which represent the game's Map
  generateMap = () => {
    for(let y = 0; y < this.height; y++) {
      const lines = [];
      mapArray.push(lines);
      for(let x = 0; x < this.width; x++) {
        lines.push([new Case()]);
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
      mapArray[val.positionY][val.positionX][0].state = "disabled";
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
      mapArray[val.positionY][val.positionX][0] = item;
      mapArray[val.positionY][val.positionX][0].state = item.name;
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
  // return seulement la condition
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
      mapArray[itemPosition.positionY][itemPosition.positionX][0] = playerItem;
      mapArray[itemPosition.positionY][itemPosition.positionX][0].state = playerItem.name;
      forbiddenCasesArray.push(itemPosition);
    }
  }

  // Handle each Map's item
  generateCases = () => {
    mapArray.map(y => y.map(x => this.displayItems('#game-map', x[0].state.toLowerCase(), x[0].position.positionX, x[0].position.positionY)))
  }

  // Generate a div for each Map's item
  displayItems = (map, customClass, customPositionX, customPositionY) => {
    $(map).append('<div class="'+ customClass +'" data-x="' + customPositionX + '" data-y="' + customPositionY + '"></div>');
  }

  // Check if a value is even
  isEven = (value) => value%2 === 0;

  // Determine which player can play
  playerTurn = () => {
    let player = this.isEven(this.turn) ? this.firstPlayer : this.secondPlayer;
    this.isBattle ?
      this.playerAttack(player) :
      this.playerMove(player);
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
        move[0] > this.height-1 || 
        move[1] > this.height-1 || 
        mapArray[move[0]][move[1]][0].state == "disabled" || 
        mapArray[move[0]][move[1]][0] instanceof Player) {
        return true;
      } else if (mapArray[move[0]][move[1]][0] instanceof Weapon) {
        mapArray[move[0]][move[1]][0].state += " weapon-available";
        mapArray[move[0]][move[1]][0].position = { positionY: move[0], positionX: move[1] };
      } else {
        mapArray[move[0]][move[1]][0].state = "move-available";
        mapArray[move[0]][move[1]][0].position = { positionY: move[0], positionX: move[1] };
      };
    });
  }

  // Remove the player's available moves
  removeMoves = () => {
    mapArray.map(y => {
      y.map(x => {
        x[0].state == "move-available" ? 
          x[0].state = "empty" :
          x[0].constructor.name == "Weapon" ? 
            x[0].state = x[0].name :
            false;
      })
    })
  }

  //checker case par case juqu'à la target
  checkXWay(player, playerPosition, targetPosition) {
    if(targetPosition.x > playerPosition.positionX) {
      do {
        playerPosition.positionX++;
        if(mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.x > playerPosition.positionX);
    } else {
      do {
        playerPosition.positionX--;
        if(mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.x < playerPosition.positionX);
    }
  }

  checkYWay(player, playerPosition, targetPosition) {
    if(targetPosition.y > playerPosition.positionY) {
      do {
        playerPosition.positionY++;
        if(mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.y > playerPosition.positionY);
    } else {
      do {
        playerPosition.positionY--;
        if(mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.y < playerPosition.positionY);
    }
  }

  checkWay(player, playerPosition, targetPosition) {
    playerPosition.positionY == targetPosition.y ? 
      this.checkXWay(player, playerPosition, targetPosition) : 
      this.checkYWay(player, playerPosition, targetPosition);
  }

  // Useful in case there is a weapon on the player's position
  checkTypeOfPlayerPosition = (position) => {
    mapArray[position.positionY][position.positionX].length > 1 ? 
      mapArray[position.positionY][position.positionX].splice(0, 1) : 
      mapArray[position.positionY][position.positionX][0] = new Case();
  }

  playerPickWeaponWay = (player, newWeapon) => {
    let weaponPicked = mapArray[newWeapon.y][newWeapon.x][0];
    mapArray[newWeapon.y][newWeapon.x][0] = player.weapon;
    player.weapon = weaponPicked;
  }

  // Handle the new player's position
  playerPickNewPosition = (player) => {
    mapArray[player.position.positionY][player.position.positionX].unshift(player);
  }

  // Handle the player's weapon change
  playerPickNewWeapon = (player) => {
    const y = player.position.positionY;
    const x = player.position.positionX;
    const weaponPicked = mapArray[y][x][0];
    mapArray[y][x][0] = player.weapon;
    player.weapon = weaponPicked;
  }

  clearMap = () => {
    $("#game-map").empty();
  }

  initNewTurn = () => {
    this.removeMoves();
    this.clearMap();
    this.turn += 1;
    this.playerTurn();
  }

  initBattle() {
    this.removeMoves();
    this.clearMap();
    this.isBattle = true;
    this.generateCases();
    this.playerTurn();
  }

  checkPlayerAround(playerPosition) {
    return  this.test(playerPosition.positionY + 1, playerPosition.positionX) ||
            this.test(playerPosition.positionY - 1, playerPosition.positionX) ||
            this.test(playerPosition.positionY, playerPosition.positionX + 1) ||
            this.test(playerPosition.positionY, playerPosition.positionX - 1)
  }

  test(positionY, positionX) {
    if(positionY < 0 || positionY > this.height-1 || positionX < 0 || positionX > this.height-1) {
      console.log('not on map');
    } else {
      if(mapArray[positionY][positionX][0] instanceof Player) return true;
    }
  }

  displayModal(player) {
    $("#choiceModal").css("visibility", "visible");
    $("#choiceModal")[0].children[0].innerText = player.name + ", you have to make a choice :";
  }

  hideModal() {
    $("#choiceModal").css("visibility", "hidden");
  }

  playerAttack(attacker) {
    //refacto
    let defender = null;
    attacker === this.firstPlayer ? 
      defender = this.secondPlayer :
      defender = this.firstPlayer;
    //!!!!!!!
    
    this.displayModal(attacker);
    $(".choiceBtn").on("click", (e) => {
      attacker.chooseAttackOrDefence(e)
      $(".choiceBtn").off("click");
      this.hideModal();
      if(attacker.hasDefence === false) defender.isAttacked(attacker.weapon.damages);
      if(defender.checkIfLifeOver()) this.gameOver(attacker, defender);
      this.turn += 1;
      this.playerTurn();
    })
  }

  gameOver(winner, looser) {
    this.hideModal();
    console.log("- GAME OVER -");
    console.log(winner.name + " you win !")
    console.log(looser.name + " you loose !")
    $("#restartModal").css("visibility", "visible");
    $(".restartBtn").on("click", () => {
      $(".restartBtn").off("click");
      this.restartGame();
    });
  }

  restartGame() {
    location.reload();
  }

  // Handle the player click (new position, new weapon,...) and Check if we init a new turn or a battle
  handlePlayerClick = (player) => {
    $("#game-map").on("click", (el) => {
      const elClass = el.target.className;
      if(elClass === "move-available" || elClass.includes("weapon-available")) {
        $("#game-map").off("click");
        this.checkTypeOfPlayerPosition(player.position);
        this.checkWay(player, player.position, el.target.dataset);
        this.playerPickNewPosition(player);
        this.checkPlayerAround(player.position) ? this.initBattle() : this.initNewTurn();
      }
    });
  }
}