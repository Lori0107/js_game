// ------- THE GAME -------
let turn = 0;

// Check if a value is even
isEven = (value) => value%2 === 0;

// Determine which player can play
playerTurn = () => {
  $("#game-map").off("click");
  playerMove(isEven(turn) ? player1 : player2);
}

// Handle the player's move
playerMove = (player) => {
  checkMoves(player.position);
  generateCases();
  handlePlayerClick(player);
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
  showMoves(up);
  showMoves(down);
  showMoves(right);
  showMoves(left);
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

prepareNewTurn = () => {
  removeMoves();
  $("#game-map").empty();
  turn += 1;
  playerTurn();
}

// On click, check Player's initial position & if he pick a new position || a new weapon
handlePlayerClick = (player) => {
  $("#game-map").on("click", (el) => {
    const elClass = el.target.className;
    if(elClass == "move-available" || elClass.includes("weapon-available")) {
      checkTypeOfPlayerPosition(player.position);
      elClass == "move-available" ? playerPickNewPosition(player, el.target) : elClass.includes("weapon-available") ? playerPickNewWeapon(player, el.target) : false;
      prepareNewTurn();
    }
  });
}