require("dotenv").config();
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");
const { response } = require("express");

// set up express
const port = process.env.PORT || 3000;
const app = express();

// static files
app.use(express.static("public"));
app.use(express.json());

// routes
app.get('/', (request,response) => {
    response.sendFile(path.join(__dirname, `./public/index.html`))
})

app.get('/notes', (request, res) => res.sendFile(path.join(__dirname, `./public/notes.html`)))


// show all notes
app.get('/api/notes', (request, response) => 
    fs.readFile("./db/db.json", "utf8", (error, jsonString) => {
        if (error) {
            console.log("fail", error);
            return;
        }
        response.json(JSON.parse(jsonString));
    }))

app.post('/api/notes', (req, res) => {
    const note = {
        id: shortid.generate(),
        title: req.body.title,
        text: req.body.text
    }
    db.push(note)
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        err ? console.log(err): console.log("it worked!")
        res.json(db)
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});