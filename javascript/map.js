class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = []
  }

  generateMap() {
    // this.mapArray = Array(this.height).fill().map(o => Array(this.width).fill(new Case()));
    for(let x = 0; x < this.height; x++) {
      let lines = []
      this.mapArray.push(lines);
      for(let y = 0; y < this.width; y++) {
        lines.push(new Case());
      };
      lines = []
    };
  }

  generateCases() {
    this.mapArray.map(x => {
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