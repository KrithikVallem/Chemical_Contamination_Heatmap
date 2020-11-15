// This script takes in an array of objects representing each team member, and spits out html that should go in about.html
// run script like so:
// node [this file's name/path, without the brackets] > [output file name, without the brackets]
// make sure you've npm installed the needed libraries

const inputFileFormat = "csv"; // change to "json" if you have json
const inputFilePath = ""; // use the correct path here relative to this file
function renameProperties(json) {
    // rename the properties to match what the html template uses
    json.forEach(person => {
        return {
            // these below are examples, don't actually use these below:
            image: person.headshot,
            name,
            description: person.shortDescription + person.interests,
        }
    })
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


const fs = require('fs');
const parse = require('csv-parse/lib/sync');

main();

function generateHTML(peopleJSON) {
    
    let template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title> About Us </title>
        <link rel="stylesheet" type="text/css" href="chem_test_style.css">
    </head>
    <body>
    <!--Add nav_bar or just back button?-->
        <div class="about_hdr">
            <h1> About The Members </h1>
            <p> Short summary about our work </p>
    <!---This page should be responsive--->
        </div>
    `;

    template += `<div class="row">`

    for (const person of peopleJSON) {
        template += `
            <div class="column">
                <div class="card">
                    <img src="${person.image}" alt="${person.name}" style="width: 100%">
                    <div class="container_about">
                        <h2>${person.name}</h2>
                        <p class="title">${person.gradYearOrClassStanding} in ${person.majorAndMinor}</p>
                        <p>${person.description}</p>
                    </div>
                </div>
            </div>
            `;
    }

    template += `
        </div>
    </body>
    `;

    return template;
}

function main() {
    let fileContent = fs.readFileSync(inputFilePath, "utf-8");

    // convert csv to json
    if (inputFileFormat === "csv") {
        fileContent = parse(fileContent, { columns: true });
    }
    else if (inputFileFormat === "json") {
        fileContent = JSON.parse(fileContent);
    }
    else {
        console.log(`Unknown File Format Used: ${inputFileFormat}`);
    }

    fileContent = renameProperties(fileContent);
    const html = generateHTML(fileContent);
    console.log(html);
}
