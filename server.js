const express = require("express");
const app = express();
const path = require("path");

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", async (req, res) => {
    res.json(await DB.readNotes())
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", async function (req, res) {
    const newNote = req.body
    const currentNotes = await DB.readNotes();
    await DB.writeNotes(newNote, currentNotes)
    return res.json("Success");
});

app.delete('/api/notes/:id', async (req,res) => {
    const requestedID = req.params.id;
    const currentNotes = await DB.readNotes();
    await DB.deleteJSON(currentNotes, requestedID)
    res.json("Success");
})

app.listen(PORT, function () {
    console.log("listening on Port: " + PORT)
})