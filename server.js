const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs/promises");

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

app.get('/api/notes', (req, res) =>{
  res.json(notes)
}) 



app.post('/api/notes', (req, res) => {
  console.log(req.body)
  notes.push(req.body)
  fs.writeFile(path.join(__dirname,"./db/db.json"),JSON.stringify(notes))
  res.send("hi there")
})

app.get('/notes',(req, res)=> {
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('*', (req, res) => {
  res.sendFile("hello2")
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}. Welcome!`);
  });