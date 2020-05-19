
'use strict'
var express = require('express')
const path = require('path');
var app = express()

var bodyParser = require('body-parser');
var cors = require('cors')

const { v4: uuidv4 } = require('uuid');

var flatfile = require('flat-file-db');
var db = flatfile('./tmp/mydatabase.db');

app.use(express.static(__dirname + '/dist/fiid'));
app.use( bodyParser.json() );
app.use(cors())

var testID = '0ae34a35-d281-4867-89c2-1e2d77d747b6';
db.put(testID, {
    form: {
        title: "Asiakaspalaute",
        date: "15.5.2020",
        questions: [
            {
                controlType: "textbox",
                controlTypeLabel: "Short",
                id: 0,
                key: "nimi",
                label: "Nimi",
                required: true,
                textboxtype: "string",
                results: [
                    "Jaska",
                    "Erkki",
                    "Pekka",
                ]
            },
            {
                controlType: "textarea",
                controlTypeLabel: "Long",
                id: 1,
                key: "vapaasana",
                label: "Vapaa sana",
                required: true,
                rows: 3,
                results: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
                ]
            },
            {
                controlType: "radio",
                controlTypeLabel: "Radio",
                id: 2,
                key: "valitseparas",
                label: "Valitse paras",
                required: true,
                results: [
                    "A",
                    "A",
                    "B",
                ],
                choiceAmount: 3,
                choices: [
                    "A",
                    "B",
                    "C"
                ]
            },
            {
                controlType: "emoji",
                controlTypeLabel: "Emoji",
                id: 3,
                key: "tyytyväisyys",
                label: "Tyytyväisyys",
                required: true,
                results: [
                    "2",
                    "3",
                    "1",
                ]
            },
        ],
    },
});


var keys = db.keys();
var data = [];

for(var i=0; i<keys.length; i++) {
    data[i] = db.get(keys[i]);
}
console.log(keys)

app.get('*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/fiid/index.html'));
    });

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



var server = app.listen(process.env.PORT || 8080);