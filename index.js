const express = require('express'); // import de express
const app = express(); // instanciation de express
//const equipes = require('./equipes.json');

/**
 * Importation du client MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'sesame4A';
let db ;
MongoClient.connect(url, function(err, client) {
 console.log("Connexion réussi avec Mongo");
 db = client.db(dbName);
});

/// un comment

app.use(express.json());
app.listen(83,()=>{
    console.log("BACK EXPRESS JS")
});
/*
app.get('/equipes',(req,res)=>{
   // res.send("<h1 align=center>Hello Backend Express JS</h1>");
   res.status(200).json(equipes);
});

app.get('/equipes/:id',(req,res)=>{
   const id = parseInt(req.params.id);
   const equipe = equipes.find(equipe => equipe.id === id);
   res.status(200).json(equipe);
});

app.post('/equipes/',(req,res)=>{
    equipes.push(req.body)
    res.status(200).json(equipes);
 });


 app.put('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipe.name = req.body.name;
    equipe.country = req.body.country;
    res.status(200).json(equipe);
 });

 app.delete('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipes.splice(equipes.indexOf(equipe),1)
    res.status(200).json(equipes);
 });*/