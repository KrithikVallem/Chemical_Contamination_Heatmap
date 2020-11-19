// This script takes in an array of objects representing each team member, and spits out html that should go in about.html
// run script like so:
// node [this file's name/path, without the brackets] > [output file name, without the brackets]
// make sure you've npm installed the needed libraries (fs and csv-parse/lib/sync)
// basically this now takes in the csv downloaded from a google form responses and converts it into copy/pasteable html

const inputFilePath = `${__dirname}/Chemical Heatmap About Page Submissions .csv`; // use the correct path here relative to your terminal location
function renameProperties(json) {
    // rename the properties to match what the html template uses, the original property names are from the google form questions
    return json.map(person => (
        {
            name: person["Name "],
            gradYearOrClassStanding: person['Graduating Year and/or Standing (ex. Class of 2023 or Soph.)'],
            majorAndMinor: person['Major and/or Minors (if applicable)'],
            image: person["Headshot "],
            workedOn: person['Short Description of what you worked on in the project '],
            interests: person["Short description of what you're involved in/interested in (ex. Neural Networks, Machines learning, sustainability practices, renewable energy, etc.) "],
        }
    ));
}

const contributorsWhoDidntFillOutGoogleForm = ["Jiyang Zhou", "Lily Zhai", "Adam Mentzer", "Madeline Richards", "Dhanuj Gandikota", "Karl Goddard", "Daniel Schenider", "Keerthi Sajja", "Michael Yufa-Zimilevich"];

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { dirname } = require('path');

main();

function generateHTML(peopleJSON) {
    // boilerplate stuff at the top
    let template = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <title> About Us </title>
                <link rel="stylesheet" type="text/css" href="chem_test_style.css">
                <meta name="viewport" content="width=device-width,initial-scale=1.0"> <!-- This fixes the bug that made the cards not wrap into a single column on small screens -->
            </head>
            <body>
            <!--Add nav_bar or just back button?-->

            <header class="nav">
                <a class="logo"> CHEMICAL HEAT MAP </a>
                <a href="https://umecodata.github.io/website/" id="button"> ECODATA </a>
                <a id="button" href="../index.html"> MAP </a>
            </header>

            <div class="about_hdr">
                <h1> About The Members </h1>
                <p> Short summary about our work </p>
        <!---This page should be responsive--->
            </div>
    `;

    template += `<div class="row">`

    // Lilly Wu is hardcoded in because she originally made the about page and never submitted the google form, so isn't in the csv data
    template += `
        <div class="column">
			<div class="card">
				<img src="LillyWu.png" alt="Lilly Wu" style="width: 100%">
				<div class="container_about">
					<h2>Lilly Wu</h2>
					<p class="title">Sophomore in LSA–Residential College</p>
					<p>descriptive text</p>
				</div>
			</div>
		</div>
    `

    // generate card for each person who filled out google form
    for (const person of peopleJSON) {
        template += `
            <div class="column">
                <div class="card">
                    <img src="${person.image}" alt="${person.name}" style="width: 100%">
                    <div class="container_about">
                        <h2>${person.name}</h2>
                        <p class="title">${person.gradYearOrClassStanding}<br>${person.majorAndMinor}</p>
                        <u>What I worked on:</u>
                            <p>${person.workedOn}</p>
                        <u>What I'm interested in:</u>
                            <p>${person.interests}</p>
                    </div>
                </div>
            </div>
            `;
    }

    template += `</div>

    `;


    // generate basic list for people who didn't fill out google form
    template += `
        <div>
            <strong>Other Contributors:</strong>
            <ul>
                ${
                contributorsWhoDidntFillOutGoogleForm
                    .map(name => `<li>${name}</li>`)
                    .join(`\n`)
                }
            </ul>
        </div>`;


    template += `
      </body>
    </html>
    `;

    return template;
}

function main() {
    let fileContent = fs.readFileSync(inputFilePath, "utf-8");
    
    fileContent = parse(fileContent, { columns: true });
    
    fileContent = renameProperties(fileContent);

    const html = generateHTML(fileContent);
    
    console.log(html);
}
