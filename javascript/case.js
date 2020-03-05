class Case {
  constructor() {
    this.state,
    this.generateState()
  };

  generateState() {
    let statesArray = ["empty", "disabled"];
    let stateIndex = Math.floor(Math.random() * statesArray.length);
    this.state = statesArray[stateIndex]
  }
};