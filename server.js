const express = require('express')
const app = express()// is actually just a variable for the express function
const bodyParser = require('body-parser')// looks inside any request we send to the server but this is now deprecated 
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://21sav:savage@cluster0.zq7jy.mongodb.net/?retryWrites=true&w=majority";
const dbName = "personal";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);//setting db variable to the database
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))// using ejs as templating language

app.get('/', (req, res) => {
  db.collection('express').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {topics: result})
  })
})

app.post('/create', (req, res) => {
  db.collection('express').insertOne({content: req.body.content, responses:[], postedOn: Date.now() }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/text', (req, res) => {
  db.collection('express')
  .findOneAndUpdate({ content: req.body.content}, {
    $push: {
      responses: req.body.comment
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/delete', (req, res) => {
  db.collection('express').findOneAndDelete({content: req.body.content}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
