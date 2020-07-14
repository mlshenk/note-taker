var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3040;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendfile(path.join(__dirname, "Develop/public/notes.html"));
  });

  app.get("*", function(req, res) {
    // res.send("Welcome to the home page!")
    // res.sendFile("./note-taker/Develop/public/index.html");
    res.sendfile(path.join(__dirname, "Develop/public/index.html"));
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

  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });