const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 8080

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, `./public/index.html`))
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, `./public/notes.html`)))

app.get('/api/notes', (req, res) => res.json(db))

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