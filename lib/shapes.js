// Shape class utilizes constructor to give definitions to the shapes
class Shape {
  constructor() {
    this.color = "";
  }
  setColor(colorVar) {
    this.color = colorVar;
  }
}

// Triangle class inherits properties defined in Shape class
class Triangle extends Shape {
  render() {
    // Returns shape dimensions with chosen color 
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }
}

// Square class inherits properties defined in Shape class
class Square extends Shape {
  render() {
    // Returns shape dimensions with chosen color 
    return `<rect x="73" y="40" width="160" height="160" fill="${this.color}" />`;
  }
}

// Circle class inherits properties defined in Shape class
class Circle extends Shape {
  render() {
    // Returns shape dimensions with chosen color 
    return `<circle cx="150" cy="115" r="80" fill="${this.color}" />`;
  }
}

// Exports classes (Square, Triangle, Circle)
module.exports = { Triangle, Square, Circle };