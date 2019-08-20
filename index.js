const express = require('express');
const app = express();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var path = require('path');
var Produto = require ('./modelo/produto')

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log('Concetado!')
});
app.get('/',function(req,res){
    res.render('index.ejs',{});
});
//resquisição para o site (chama a classe e moostra)
//res= resposta   render= renderiza (chama)
//get é o modo quando digita e da enter 
//req = requisição
app.get('/cadastro',function(req,res){
    res.render('cadastro.ejs',{});
});
//post é o metodo é executado quando preciso de um formulario 
app.post('/cadastro',function(req,res){
    var produto = new Produto({

            marca:req.body.marca,
            tipo:req.body.tipo,
            cor:req.body.cor,
            preco:req.body.preco
    })
        produto.save(function(err){
            if(err){
                res.render('indes.js', {"msg": err})
            }
            else {
                res.render('index.js', {"msg": "Adicionado com sucesso"})
            }


        })
    
});