
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
db.put(testID, {
    form: {
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
                results: [
                    "Short answer 1",
                    "Short answer 2",
                    "Short answer 3",
                ]
            },
            {
                controlType: "textarea",
                controlTypeLabel: "Long",
                id: 1,
                key: "longquestion",
                label: "Long question",
                required: true,
                rows: 3,
                results: [
                    "Long answer 1",
                    "Long answer 2",
                    "Long answer 3",
                ]
            }
        ],
    },
});


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
  
});

// TODO setup regex
app.get("/forms/:id(*)", function(req, res) {
    var paramID = req.params.id
    console.log(`GET forms with UUID: ${paramID}`);
    res.send(db.get(paramID));
});

app.post('/forms/', function(req, res) {
    var paramID = req.body.id;
    console.log(`PUT with UUID: ${paramID}`);
    db.put(paramID, {form: req.body.form});
    console.log(req.body.form);
    res.status(201);
    res.location("http://localhost:3000/forms/" + req.body.id);
    res.send();
    console.log(db.keys());
});

// TODO setup regex
app.delete("/forms/:id(*)", function(req, res) {
    var paramID = req.params.id;
    console.log(`DEL with UUID: ${paramID}`);
    res.send(db.del(paramID));
});



var server = app.listen(3000, function () {
  console.log('Server listening in http://localhost:3000/forms')
})