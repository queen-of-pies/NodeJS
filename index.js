const yargs = require("yargs")
const pkg = require("./package.json")
const {addNote,printNotes, removeNoteById} = require("./notes.controller")

yargs.version(pkg.version)

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        type: "string",
        describe: "Note title",
        demandOption: true
    },
    async handler({title}) {
         await addNote(title)
    }
})

yargs.command({
    command: "remove",
    describe: "Remove note from list",
    builder: {
        type: "number",
        describe: "Note id",
        demandOption: true
    },
    async handler({id}) {
         await removeNoteById(id)
    }
})

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        await printNotes()
    }
})

yargs.parse()