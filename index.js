const express = require('express'); // import de express
const app = express(); // instanciation de express
const equipes = require('./equipes.json');
app.use(express.json());
app.listen(83,()=>{
    console.log("BACK EXPRESS JS")
});

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