class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray
  }

  generateMap() {
    this.mapArray = Array(this.height).fill(new Case()).map(o => Array(this.width).fill(new Case()));
  }

  generateCases() {
    this.mapArray.map(x => {
      $('#game-map').append('<div class="case"></div>')
      return x.map(y => {
        $('#game-map').append('<div class="case"></div>')
        return y
      })
    })
  }
};

let myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateCases();