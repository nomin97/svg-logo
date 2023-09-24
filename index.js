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
        name: 'textColor',
        message: 'Choose a color for the text.',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape (select one)',
        choices: [
            'triangle',
            'square',
            'circle']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Choose a color for the shape.',
    },
];

// function to write to the file using the inquirer  
function writeToFile(fileName, answers) {
    // empty string later to have user input
    let svgString = "";
    // Set width and height of logo container
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;
    // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === "triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    };

    // <text> tag aligns the inputted text with the color chosen
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`; svgString += "</g>"; svgString += "</svg>";

    // writing the file to the system, catching errors, if no error will show "generated logo.svg"
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });
}

// function init will take the responses from the inquirer and then generate the logo 
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            // insures text input will fit criteria or display error
            if (answers.text.length > 3) {
                console.log("Enter 3 characters or less.");
                promptUser();
            } else {
                writeToFile("logo.svg", answers);
            }         
        });
}

// Function call to initialize app
init();