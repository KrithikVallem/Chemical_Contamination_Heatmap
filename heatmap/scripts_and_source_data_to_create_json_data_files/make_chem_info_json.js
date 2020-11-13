// How to use:
// 1. Make sure the Chem_Info is in the heatmap folder, or else change the code to get the right path to it
// 2: run this script on the folder of csv's (this file should be on the same level as the folder of csv's, not in the folder itself) 
//    Make sure to direct the output into the file that you want (node merge_...._object.js > heatmap/output.json)
// 2.5: make sure you npm installed the libraries needed (fs)
// 3: enjoy!
// folder with the csv's - change this if the folder name changes
const folder_name = `${__dirname}/Chem_Info`;

const fs = require('fs');

main()

function main() {
    const chem_info_json = make_chem_info();

    console.log(
        JSON.stringify(
            chem_info_json
        )
    )
}

function make_chem_info() {
    const chem_info = {};

    // csv's are stored in the chem_files folder
    const chem_info_files = fs.readdirSync(folder_name);

    for (const file of chem_info_files) {
        const chemical_name = file.split(".")[0]; // filenames are <chemical_name>.txt
        
        const file_content = fs.readFileSync(`${folder_name}/${file}`, "utf-8");
        
        chem_info[chemical_name] = file_content;
    }

    return chem_info;
}
