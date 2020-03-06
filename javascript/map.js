class Map {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.mapArray = []
    this.forbiddenCases = []
  }

  generateMap() {
    // this.mapArray = Array(this.height).fill().map(o => Array(this.width).fill(new Case()));
    for(let x = 0; x < this.height; x++) {
      let lines = []
      this.mapArray.push(lines);
      for(let y = 0; y < this.width; y++) {
        lines.push(new Case());
      };
    };
  }

  generateRocks(numberOfRocks) {
    for(let i = 0; i < numberOfRocks; i++) {
      let positionY = Math.floor(Math.random() * this.mapArray.length);
      let positionX = Math.floor(Math.random() * this.mapArray.length);

      let val = {position: [positionY, positionX]};
      if (this.forbiddenCases.some(arrVal => val === arrVal)) {
        console.log("true")
      } else {
        console.log("Positions are availables")
        this.mapArray[positionY][positionX].state = "disabled";
        this.forbiddenCases.push({position: [positionY, positionX]});
      }
    };
    console.log(this.forbiddenCases);
  }

  generateCases() {
    this.mapArray.map(x => {
      return x.map(y => {
        if(y.state == "disabled")
          $('#game-map').append('<div class="rock"></div>')
        else
          $('#game-map').append('<div class="case"></div>')
      })
    })
  }
};

let myMap = new Map(10, 10);
myMap.generateMap();
myMap.generateRocks(7)
myMap.generateCases();