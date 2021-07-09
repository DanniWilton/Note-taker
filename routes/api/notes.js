const router = require("express").Router();
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const dbPath = __dirname + "/../../Develop/db/db.json";

const db = require(dbPath);



router.get('/api/notes', (req, res) => {
    // get a list of notes from db

    return res.json(db);
    
});

router.post('/api/notes', (req, res) => {
    // add a note to db

    // get the title and body payload from user
    const title = req.body.title;
    const text = req.body.text;
    console.log(title, text);

    // save it to the array
    db.push({
        text,
        title,
        id: uuid.v4(), 
    });

    // save it to the db.json file
    fs.writeFileSync(dbPath, JSON.stringify(db));

    // send a res back
    res.json({
        data: "success"
    })


});




module.exports = router;