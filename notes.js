const { readNotes, writeNotes } = require("./files");

addNote = (title, body) => {
  let notes = [];
  readNotes()
    .then(res => {
      notes = res;
      const foundNote = notes.find(el => el.title === title);
      // title found
      if (foundNote) console.log("title exist \n", foundNote);
      else {
        notes = [...notes, { title, body }]; // add note to array
        writeNotes(notes);
        console.log({ title, body }, "add successufly");
      }
    })
    .catch(err => console.log(err.message));
};

const removeNote = title => {
  let notes = [];
  return new Promise((resolve, reject) => {
    readNotes().then(res => {
      notes = res;
      const foundNote = notes.find(el => el.title === title);
      if (foundNote) {
        //note exist
        notes = notes.filter(el => el.title !== title); //delete
        writeNotes(notes);
        resolve(true); // delete succes
      } else resolve(false); // item not exist
    });
  });
};

const getNotes = () => {
  readNotes()
    .then(notes => {
      if (!notes || notes.length === 0) console.log("empty !!! ");
      else console.log(notes);
    })
    .catch(err => console.log(err.message));
};

module.exports = {
  addNote,
  removeNote,
  getNotes
};
