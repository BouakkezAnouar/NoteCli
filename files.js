const fs = require("fs");

//get all notes from notes.json
const readNotes = () => {
  return new Promise((resolve, reject) => {
    let notes = [];
    fs.readFile("notes.json", (err, data) => {
      if (data) {
        // there a data in notes.json
        try {
          //try catch if file is empty
          notes = JSON.parse(data);
        } catch (err) {
          // reject(err);
        }
      } else notes = [];
      resolve(notes);
    });
  });
};

//write notes in notes.json
const writeNotes = notes => {
  fs.writeFile("./notes.json", JSON.stringify(notes), err => {});
};

module.exports = {
  readNotes,
  writeNotes
};
