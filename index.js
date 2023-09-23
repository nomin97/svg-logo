// require packages needed
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require("./lib/shapes");

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Choose up to three characters.',
    },
    {
        type: 'input',
        name: 'text-color',
        message: 'Choose a color for the text.',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape (select one)',
        choices: [
            'circle',
            'triangle',
            'square']
    },
    {
        type: 'input',
        name: 'shape-color',
        message: 'Choose a color for the shape.',
    },
];

//  
function writeToFile(fileName, answers) {
    // File starts as an empty string
    let svgString = "";
    // Sets width and height of logo container
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> tag so that user font input layers on top of polygon -> not behind
    svgString += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;

    // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";

    // Using file system module to generate svg file, takes in file name given in the promptUser function, the svg string, and a ternary operator which handles logging any errors, or a "Generated logo.svg" message to the console  
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });
}

// function init will take the responses from the inquirer and then generate the logo 
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
            if (answers.text.length > 3) {
                console.log("Enter 3 characters or less.");
                promptUser();
            } else {
                // Calling write file function to generate SVG file
                writeToFile("logo.svg", answers);
            }         
        });
}


// Function call to initialize app
init();