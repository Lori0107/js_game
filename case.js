class Case {
  constructor() {
    this.state,
    this.generateState()
  };

  generateState() {
    let statesArray = ["empty", "disabled", "occupied"];
    let stateIndex = Math.floor(Math.random() * statesArray.length);
    this.state = statesArray[stateIndex]
  }
};