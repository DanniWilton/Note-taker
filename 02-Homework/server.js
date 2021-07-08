const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
let db = require('./Develop/db/db.json');
const { request } = require("http");
const { response } = require("express");

const PORT = process.env.PORT || 8080;

// set up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// static files
app.use(express.static("./public"));
// get notes.html
app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, './public/notes.html'));
});
// function that retrieves the db.json file
app.get('/api/notes', (request, response) => response.sendFile(path.join(__dirname, "./db/db.json")));


app.get('/api/notes', (request, response) => 
    fs.readFile("./db/db.json", (error, jsonString) => {
        if (error) {
            console.log("fail", error);
            return;
        }
        response.json(JSON.parse(jsonString));
    }))

app.post('/api/notes', (request, response) => {
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