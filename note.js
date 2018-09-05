#!/usr/bin/env node
const { addNote, removeNote, getNotes } = require("./notes");
const yargs = require("yargs");
const argv = yargs
  .command(
    "add",
    "Adds a new note",
    {
      title: {
        describe: "title of note ",
        demandOption: true,
        alias: "t"
      },
      body: {
        describe: "body of note ",
        demandOption: true,
        alias: "b"
      }
    },
    args => {
      const title = args.title;
      const body = args.body;
      if (title === undefined || title === true || title.length < 3)
        console.log("title must be longer than 2 caracters");
      else {
        addNote(title, body);
      }
      return;
    }
  )
  .demandCommand(1, "must provide a commande ( add , remove , list) ")
  .alias("add", "a")
  .command(
    "remove",
    "remove a note",
    {
      title: {
        describe: "remove a note ",
        demandOption: true,
        alias: "t"
      }
    },
    args => {
      const title = args.title;
      if (title === undefined || title === true || title.length < 3)
        console.log("title must be longer than 2 caracters");
      else {
        removeNote(title)
          .then(res => {
            if (res) console.log("removed!");
            else console.log("title not exsited!");
          })
          .catch(err => console.log("erreur : ", err.message));
      }
    }
  )
  .alias("remove", "r")
  .command("list", "get all notes", args => {
    getNotes();
  })
  .alias("list", "l")
  .help()
  .alias("help", "h").argv;

//console.log(argv);
