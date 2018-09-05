const fs = require("fs");

addNote = (title, body) => {
  let notes = [];
  fs.readFile("notes.json", (err, data) => {
    if (data) {
      // there a data in notes.json
      try {
        //try catch if file is empty
        notes = JSON.parse(data);
      } catch (err) {}
    } else notes = [];

    const note = { title, body };
    const foundNote = notes.find(el => el.title === title);
    if (foundNote) {
      // title found
      console.log("title exist \n", foundNote);
      return;
    }
    notes = [...notes, note]; // add note to array

    fs.writeFile("./notes.json", JSON.stringify(notes), err => {
      if (err) throw err;
      console.log(note);
      console.log("note add succesufly");
    });
  });
};

const removeNote = (title, callback) => {
  let notes = [];
  fs.readFile("notes.json", (err, data) => {
    if (data) {
      // there a data in notes.json
      try {
        //try catch if file is empty
        notes = JSON.parse(data);
      } catch (err) {}
    } else notes = [];
    const foundNote = notes.find(el => el.title === title);
    if (foundNote) {
      //note exist
      callback(true);
      notes = notes.filter(el => el.title !== title); //delete
      fs.writeFile("./notes.json", JSON.stringify(notes), err => {
        if (err) throw err;
      });
    } else callback(false);
  });
};

const getNotes = () => {
  let notes = [];
  fs.readFile("notes.json", (err, data) => {
    if (data) {
      // there a data in notes.json
      try {
        //try catch if file is empty
        notes = JSON.parse(data);
      } catch (err) {}
    } else notes = [];

    console.log(notes);
  });
};

module.exports = {
  addNote,
  removeNote,
  getNotes
};
