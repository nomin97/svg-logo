// WHEN I have entered input for all the prompts
// THEN an SVG file is created named `logo.svg`
// AND the output text "Generated logo.svg" is printed in the command line
// WHEN I open the `logo.svg` file in a browser
// THEN I am shown a 300x200 pixel image that matches the criteria I entered

// require inquirer
const inquirer = require('inquirer')
const fs = require('fs');
const logo.svg= require('./utils/generateMarkdown')

// TODO: Create an array of questions for user input
const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Choose up to three characters.',
    },
    {
        type: 'input',
        name: 'text-color',
        message: 'Choose a color.',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape (select one)',
        choices: [
            'circle',
            'triangle' ,
            'square']
    },
    {
        type: 'input',
        name: 'shape-color',
        message: 'Choose a color.',
    },
];

// function init will take the responses from the inquirer and then generates a readme. 
function init() {
    inquirer.prompt(questions)
    .then((data) => {
        const readmeContent = generateMarkdown(data);

        fs.writeFile('README.md', readmeContent, (err) => 
        err ? console.log(err) : console.log('Generated logo.svg!')
        )
    }) 
}

// Function call to initialize app
init();


// create const for questions
// if else/ statement to use the user input
// use classes to create 