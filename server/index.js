
'use strict'
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var cors = require('cors')

const { v4: uuidv4 } = require('uuid');

var flatfile = require('flat-file-db');
var db = flatfile('./tmp/mydatabase.db');
app.use( bodyParser.json() );
app.use(cors())

var testID = '0ae34a35-d281-4867-89c2-1e2d77d747b6';
db.put(testID, {form: {
    title: "Form title",
    date: "Date Fri May 15 2020 15:32:33 GMT+0300 (Eastern European Summer Time)",
    questions: [
         {
            controlType: "textbox",
            controlTypeLabel: "Short",
            id: 0,
            key: "shortquestion",
            label: "Short question",
            required: true,
            textboxtype: "string",
        },
         {
            controlType: "textarea",
            controlTypeLabel: "Long",
            id: 1,
            key: "longquestion",
            label: "Long question",
            required: true,
            rows: 3,
        }
    ],
}});

var keys = db.keys();
var data = [];

for(var i=0; i<keys.length; i++) {
    data[i] = db.get(keys[i]);
}
console.log(keys)

app.get('/forms', function (req, res) {
    var keys = db.keys();
    var data = [];
    for(var i=0; i<keys.length; i++) {
        data[i] = db.get(keys[i]);
    }
  res.json(data)
})

app.get("/forms/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})", function(req, res) {
    var paramID = req.params.id
    res.send(db.get(paramID));
});

app.post('/forms/', function(req, res) {
    var UUID = uuidv4();
    console.log(`PUT with UUID: ${UUID}`);
    db.put(UUID, {form: req.body.form});

    res.status(201);
    res.location("http://localhost:3000/forms/" + req.body.id);
    res.send();
});

app.delete("/forms/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})", function(req, res) {
    var paramID = Number(req.params.id)
    res.send(db.del(paramID));
});



var server = app.listen(3000, function () {
  console.log('Server listening in http://localhost:3000/forms')
})