# How to edit chemical info files:
* Website uses `chem_info.js` as the source, but don't edit `chem_info.js` directly, it'll get overwritten later
* Instead, go into the `Chem_Info` folder, and edit the .txt file for the chemical(s) in question
* Then, run `make_chem_info_json.js`, which takes the `Chem_Info` folder and makes it into a valid js export json file
* You can run it like so from the terminal: `node infobox/make_chem_info_json.js > infobox/chem_info.js`
* Make sure you use the correct file paths relative to your current location in the terminal
* Also make sure you have node.js, and have installed the `fs` library
