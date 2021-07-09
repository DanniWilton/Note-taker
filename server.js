const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const webRoutes = require("./routes/web/web");
const notesRoutes = require("./routes/api/notes");

let db = require('./Develop/db/db.json');


app.use(express.static(path.join(__dirname, 'Develop', "public")));
app.use(express.json());

app.use(webRoutes);
app.use(notesRoutes);

const PORT = 8080

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    db = db.filter(data => data.id !== noteId);
    writeToDb();
    res.send("Note deleted")
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});