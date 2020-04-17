// ------- MAP'S INITIALISATION -------

// Variables
const mapArray = [];
const forbiddenCases = [];

// Generate the two-dimensional array which represent the game's Map
generateMap = (height, width) => {
  for(let y = 0; y < height; y++) {
    const lines = [];
    mapArray.push(lines);
    for(let x = 0; x < width; x++) {
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
generateDisabledCases = (numberOfDisabledCases) => {
  for(let i = 0; i < numberOfDisabledCases; i++) {
    const val = getRandomPosition(mapArray);
    if (forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
      i--;
    } else {
      mapArray[val.positionY][val.positionX].state = "disabled";
      forbiddenCases.push(val);
    }
  }
}

// Generate random position for a given item, take into account positions already taken
generateItemPosition = (item, isRegistered) => {
  let val = getRandomPosition(mapArray);
  if (forbiddenCases.some(forbiddenItem => val.positionY === forbiddenItem.positionY && val.positionX === forbiddenItem.positionX)) {
    return generateItemPosition(item, isRegistered);
  } else if (isRegistered == true) {
    item.position = {positionY: val.positionY, positionX: val.positionX};
    mapArray[val.positionY][val.positionX] = item;
    mapArray[val.positionY][val.positionX].state = item.name;
    forbiddenCases.push(val);
    return val;
  } else {
    return val;
  }
}

// Generate weapons's positions
generateWeaponsPosition = () => {
  weaponsArray.forEach(weapon => generateItemPosition(weapon, true));
}

// Generate players's positions
generatePlayersPosition = () => {
  generateItemPosition(player1, true);
  broom.position = { positionY: player1.position.positionY, positionX: player1.position.positionX };
  generatePlayer2Position(player2);
  poison.position = { positionY: player2.position.positionY, positionX: player2.position.positionX };
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

// Generate Player2's position, check if is not near Player1
generatePlayer2Position = (playerItem) => {
  let itemPosition = generateItemPosition(playerItem, false);
  if (compareItemsPosition(player1.position, itemPosition)) {
    return generatePlayer2Position(playerItem);
  } else {
    playerItem.position = {positionY: itemPosition.positionY, positionX: itemPosition.positionX};
    mapArray[itemPosition.positionY][itemPosition.positionX] = playerItem;
    mapArray[itemPosition.positionY][itemPosition.positionX].state = playerItem.name;
    forbiddenCases.push(itemPosition);
  }
}

// Handle each Map's item
generateCases = () => {
  mapArray.map(y => y.map(x => displayItems('#game-map', x.state.toLowerCase(), x.position.positionX, x.position.positionY)))
}

// Generate a div for each Map's item
displayItems = (map, customClass, customPositionX, customPositionY) => {
  $(map).append('<div class="'+ customClass +'" data-x="' + customPositionX + '" data-y="' + customPositionY + '"></div>');
}

generateMap(10, 10);
generateDisabledCases(7);
generateWeaponsPosition();
generatePlayersPosition();
playerTurn();