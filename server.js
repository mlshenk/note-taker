var express = require("express");
var path = require("path");
var DB = require("./db");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3040;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", async function (req,res) {
  const currentNotes = await DB.readNotes();
  console.log(currentNotes)
  res.json(currentNotes);
});

  app.post("/api/notes", async function (req, res) {
    const newNote = req.body
    const currentNotes = await DB.readNotes();
    await DB.writeNotes(newNote, currentNotes)
    return res.json("This worked!");
});

app.delete('/api/notes/:id', async (req,res) => {
    const requestedID = req.params.id;
    const currentNotes = await DB.readNotes();
    await DB.deleteJSON(currentNotes, requestedID)
    res.json("This worked!");
});

app.get("/notes", function(req, res) {
  res.sendfile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  // res.send("Welcome to the home page!")
  // res.sendFile("./note-taker/Develop/public/index.html");
  res.sendfile(path.join(__dirname, "./public/index.html"));
});

  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });