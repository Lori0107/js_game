const Map = class {
  constructor(height, width) {
    this.height = height,
    this.width = width,
    this.map = [],
    this.lines = []
  }

  generateMap() {
    for(let x = 0; x < this.height; x++) {
      this.map.push(this.lines);
      for(let y = 0; y < this.width; y++) {
        this.lines.push("o");
      };
      this.lines = []
    };
    return this.map
  }
}

console.log(new Map(5, 5).generateMap())