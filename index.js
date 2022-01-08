const express = require('express'); // import de express
const app = express(); // instanciation de express
var cors = require('cors');
app.use(cors());
// back
//const equipes = require('./equipes.json');
/**
 * Importation du client MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let dbName = 'sesame4A';
let db;
var ObjectID = require('mongodb').ObjectID;
MongoClient.connect(url, function (err, client) {
   console.log("Connexion réussi avec Mongo");
   db = client.db(dbName);
});

/// un comment

app.use(express.json());
app.listen(83, () => {
   console.log("BACK EXPRESS JS")
});


app.get('/equipes', (req, res) => {
   db.collection('equipe').find({}).toArray(function (err, docs) {
      if (err) {
         console.log(err)
         throw err
      }
      res.status(200).json(docs)
   })
})

app.get('/equipes/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const equipe = await db.collection('equipe').findOne({ _id: new ObjectID(id) })
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})


app.post('/equipes', async (req, res) => {
   try {
      const equipeData = req.body
      const equipe = await db.collection('equipe').insertOne(equipeData)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})


app.put('/equipes/:id', async (req, res) => {
   try {
      const id = req.params.id
      const replacementEquipe = req.body
      console.log(replacementEquipe);
      const equipe = await db.collection('equipe').updateOne({"_id" : new ObjectID(id)}, replacementEquipe)
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})

app.delete('/equipes/:id', async (req, res) => {
   try {
      const id = req.params.id;
      //const equipe = await db.collection('equipe').deleteOne({id})
      const equipe = await db.collection('equipe').deleteOne({ _id: new ObjectID(id) });
      res.status(200).json(equipe)
   } catch (err) {
      console.log(err)
      throw err
   }
})


/* TD joueur */

// question1

app.get('/joueurs', (req, res) => {
   db.collection('joueur').find({}).toArray(function (err, docs
   ) {
      if (err) {
         console.log(err)
         throw err
      }
      res.status(200).json(docs)
   })
})

app.get('/joueurs/:id', (req, res) => {
   const id = parseInt(req.params.id)
   db.collection('joueur').find({ id }).toArray(function (err, docs
   ) {
      if (err) {
         console.log(err)
         throw err
      }
      res.status(200).json(docs)
   })
})

app.post('/joueurs', async (req, res) => {
   try {
      const joueurData = req.body
      const joueur = await db.collection('joueur').insertOne(joueurData)
      res.status(200).json(joueur)
   } catch (err) {
      console.log(err)
      throw err
   }
})

app.put('/joueurs/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const newjoueur = req.body
      const oldjoueur = (await db.collection('joueur').find({ id }).toArray())[0]
      oldjoueur.nom = newjoueur.nom;
      oldjoueur.numero = newjoueur.numero;
      await db.collection('joueur').replaceOne({ id }, oldjoueur)

      res.status(200).json(oldjoueur)
   } catch (err) {
      console.log(err)
      throw err
   }
})


app.delete('/joueurs/:id', async (req, res) => {
   try {
      const id = (req.params.id)
      const joueur = await db.collection('joueur').deleteOne({ id })
      res.status(200).json(joueur)
   } catch (err) {
      console.log(err)
      throw err
   }
})

// question2
app.get('/equipes/:id/joueurs', (req, res) => {
   const idEquipe = parseInt(req.params.id)
   db.collection('joueur').find({ idEquipe }).toArray(function (err, docs
   ) {
      if (err) {
         console.log(err)
         throw err
      }
      res.status(200).json(docs)
   })
})
// question3

app.get('/joueurs/:id/equipes', async (req, res) => {
   const id = parseInt(req.params.id)
   const joueur = await db.collection('joueur').findOne({ id });

   const equipe = await db.collection('equipe').findOne({ id: joueur.idEquipe });
   res.status(200).json(equipe)

})
//question4
app.get('/joueurbyName/:nom', (req, res) => {
   const nom = req.params.nom
   db.collection('joueur').find({ nom }).toArray(function (err, docs
   ) {
      if (err) {
         console.log(err)
         throw err
      }
      res.status(200).json(docs)
   })
})

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