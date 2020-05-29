class Map {
  constructor(height, width, firstPlayer, secondPlayer, weaponsArray) {
    this.height = height,
    this.width = width,
    this.mapArray = [];
    this.forbiddenCasesArray = [];
    this.firstPlayer = firstPlayer,
    this.secondPlayer = secondPlayer,
    this.weaponsArray = weaponsArray,
    this.turn = 0,
    this.isBattle = false
  }

  // Generate the two-dimensional array which represent the game's Map
  generateMap = () => {
    for(let y = 0; y < this.height; y++) {
      const lines = [];
      this.mapArray.push(lines);
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

  generateDisableCases = (disableCases) => {
    for(let i = 0; i < disableCases; i++) {
      const val = this.getRandomPosition(this.mapArray);
      if (this.forbiddenCasesArray.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
        i--;
      } else {
        this.mapArray[val.positionY][val.positionX][0].state = "disable";
        this.forbiddenCasesArray.push(val);
      }
    }
  }

  // Generate random position for a given item, take into account positions already taken
  generateItemPosition = (item, isRegistered) => {
    const val = this.getRandomPosition(this.mapArray);
    if (this.forbiddenCasesArray.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      return this.generateItemPosition(item, isRegistered);
    } else if (isRegistered === true) {
      item.position = {positionY: val.positionY, positionX: val.positionX};
      this.mapArray[val.positionY][val.positionX][0] = item;
      this.mapArray[val.positionY][val.positionX][0].state = item.name;
      this.forbiddenCasesArray.push(val);
      return val;
    } else {
      return val;
    }
  }

  generateWeaponsPosition = () => {
    this.weaponsArray.map(weapon => this.generateItemPosition(weapon, true));
  }

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
        itemOne.positionX === itemTwo.positionX - 1 && itemOne.positionY === itemTwo.positionY + 1)
      return true;
  }

  // Generate the second Player's position, check if is not near the first Player
  generatesecondPlayerPosition = (playerItem) => {
    let itemPosition = this.generateItemPosition(playerItem, false);
    if (this.compareItemsPosition(this.firstPlayer.position, itemPosition)) {
      return this.generatesecondPlayerPosition(playerItem);
    } else {
      playerItem.position = {positionY: itemPosition.positionY, positionX: itemPosition.positionX};
      this.mapArray[itemPosition.positionY][itemPosition.positionX][0] = playerItem;
      this.mapArray[itemPosition.positionY][itemPosition.positionX][0].state = playerItem.name;
      this.forbiddenCasesArray.push(itemPosition);
    }
  }

  // Handle each Map's item
  generateCases = () => {
    this.mapArray.map(y => y.map(x => this.displayItems('#game-map', x[0].state.toLowerCase(), x[0].position.positionX, x[0].position.positionY)))
  }

  // Generate each Map's item on DOM
  displayItems = (map, customClass, customPositionX, customPositionY) => {
    $(map).append('<div class="'+ customClass +'" data-x="' + customPositionX + '" data-y="' + customPositionY + '"></div>');
  }

  // Check if a value is even, useful for playerTurn()
  isEven = (value) => value%2 === 0;

  // Determine which player can play
  playerTurn = () => {
    const player = this.isEven(this.turn) ? this.firstPlayer : this.secondPlayer;
    const defender = player === this.firstPlayer ? this.secondPlayer : this.firstPlayer;
    this.isBattle ?
      this.playerAttack(player, defender) :
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
        this.mapArray[move[0]][move[1]][0].state === "disable" || 
        this.mapArray[move[0]][move[1]][0] instanceof Player) {
        return true;
      } else if (this.mapArray[move[0]][move[1]][0] instanceof Weapon) {
        this.mapArray[move[0]][move[1]][0].state += " weapon-available";
        this.mapArray[move[0]][move[1]][0].position = { positionY: move[0], positionX: move[1] };
      } else {
        this.mapArray[move[0]][move[1]][0].state = "move-available";
        this.mapArray[move[0]][move[1]][0].position = { positionY: move[0], positionX: move[1] };
      };
    });
  }

  // Remove the player's available moves
  removeMoves = () => {
    this.mapArray.map(y => {
      y.map(x => {
        x[0].state === "move-available" ? 
          x[0].state = "empty" :
          x[0].constructor.name === "Weapon" ? 
            x[0].state = x[0].name :
            false;
      })
    })
  }

  // Check cases until target position
  checkXWay(player, playerPosition, targetPosition) {
    if(targetPosition.x > playerPosition.positionX) {
      do {
        playerPosition.positionX++;
        if(this.mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.x > playerPosition.positionX);
    } else {
      do {
        playerPosition.positionX--;
        if(this.mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.x < playerPosition.positionX);
    }
  }

  checkYWay(player, playerPosition, targetPosition) {
    if(targetPosition.y > playerPosition.positionY) {
      do {
        playerPosition.positionY++;
        if(this.mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.y > playerPosition.positionY);
    } else {
      do {
        playerPosition.positionY--;
        if(this.mapArray[playerPosition.positionY][playerPosition.positionX][0] instanceof Weapon) this.playerPickNewWeapon(player);
      } while (targetPosition.y < playerPosition.positionY);
    }
  }

  checkWay(player, playerPosition, targetPosition) {
    playerPosition.positionY == targetPosition.y ? 
      this.checkXWay(player, playerPosition, targetPosition) : 
      this.checkYWay(player, playerPosition, targetPosition);
  }

  // Useful in case there's a weapon on the player's position
  checkTypeOfPlayerPosition = (position) => {
    this.mapArray[position.positionY][position.positionX].length > 1 ? 
      this.mapArray[position.positionY][position.positionX].splice(0, 1) : 
      this.mapArray[position.positionY][position.positionX][0] = new Case();
  }

  playerPickWeaponWay = (player, newWeapon) => {
    const weaponPicked = this.mapArray[newWeapon.y][newWeapon.x][0];
    this.mapArray[newWeapon.y][newWeapon.x][0] = player.weapon;
    player.weapon = weaponPicked;
  }

  playerPickNewPosition = (player) => {
    this.mapArray[player.position.positionY][player.position.positionX].unshift(player);
  }

  playerPickNewWeapon = (player) => {
    const y = player.position.positionY;
    const x = player.position.positionX;
    const weaponPicked = this.mapArray[y][x][0];
    this.mapArray[y][x][0] = player.weapon;
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

  checkPlayerAround = (playerPosition) => {
    return  this.isEnemyPosition(playerPosition.positionY + 1, playerPosition.positionX) ||
            this.isEnemyPosition(playerPosition.positionY - 1, playerPosition.positionX) ||
            this.isEnemyPosition(playerPosition.positionY, playerPosition.positionX + 1) ||
            this.isEnemyPosition(playerPosition.positionY, playerPosition.positionX - 1)
  }

  isEnemyPosition = (positionY, positionX) => {
    if(positionY < 0 || positionY > this.height-1 || positionX < 0 || positionX > this.height-1) {
      console.log('not on map');
    } else {
      if(this.mapArray[positionY][positionX][0] instanceof Player) return true;
    }
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
        player.displayInfo();
        this.checkPlayerAround(player.position) ? this.initBattle() : this.initNewTurn();
      }
    });
  }

  initBattle = () => {
    this.removeMoves();
    this.clearMap();
    this.isBattle = true;
    this.generateCases();
    this.playerTurn();
  }

  displayStartMessage = () =>{
    $(".ui.start.dimmer").dimmer('show');
    $("#start-message")[0].textContent = this.firstPlayer.pseudo + " you play first !";
  }

  displayChoiceModal = (player) => {
    $("#choice-modal").transition('fly right');
    $("#choice-modal").css("display", "block");
    $("#choice-header")[0].textContent = player.pseudo + " !";
    $("#choice-img")[0].src = "/img/" + player.name + ".png";
  }

  hideChoiceModal = () => {
    $("#choice-modal").transition('fade');
    $("#choice-modal").css("display", "none");
  }

  displayGameOverMessage = (winner) => {
    $(".ui.over.dimmer").dimmer({
      closable : false
    }).dimmer('show');
    $("#winner")[0].textContent = winner.pseudo + " you win !";
  }

  manageRestartClick = () => {
    $("#restart-btn").on("click", () => {
      $("#restart-btn").off("click");
      this.restartGame();
    });
  }

  playerAttack = (attacker, defender) => {
    this.displayChoiceModal(attacker);
    $(".choice-btn").on("click", (e) => {
      $(".choice-btn").off("click");
      this.manageAttackerChoice(attacker, defender, e);
    })
  }

  manageAttackerChoice = (attacker, defender, choice) => {
    attacker.chooseAttackOrDefense(choice)
    this.hideChoiceModal();
    if(!attacker.hasDefense) defender.isAttacked(attacker.weapon.damages);
    attacker.displayInfo();
    defender.displayInfo();
    this.checkIfGameOver(attacker, defender);
  }

  checkIfGameOver = (attacker, defender) => {
    if(defender.checkIfLifeOver()) {
      this.gameOver(attacker, defender);
    } else {
      this.turn += 1; 
      this.playerTurn();
    }
  }

  gameOver = (winner, loser) => {
    this.hideChoiceModal();
    this.displayGameOverMessage(winner, loser);
    this.manageRestartClick();
  }

  restartGame = () => {
    //redefinir l'app a l'état initial
    //instance d'init game
    location.reload();
  }
}