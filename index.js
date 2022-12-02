const express = require("express")
const chalk = require("chalk")
const path = require("path")
const {addNote, getNotes, removeNoteById, update} = require("./notes.controller")

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.set("views", "pages")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express app",
        notes: await getNotes(),
        created: false
    })
})

app.post("/", async (req, res) => {
    await addNote(req.body.title)
    res.render("index", {
        title: "Express app",
        notes: await getNotes(),
        created: true
    })
})

app.delete("/:id", async (req, res) => {
    await removeNoteById(req.params.id)
    res.render("index", {
        title: "Express app",
        notes: await getNotes(),
        created: false
    })

})

app.put("/:id", async (req, res) => {
    const {id} = req.params
    const {title} = req.body
    await update(id,title)
    res.render("index", {
        title: "Express app",
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, () => console.log(chalk.green(`Server has been started on port ${port}...`)))