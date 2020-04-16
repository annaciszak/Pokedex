const express = require('express');
const request = require('request');
//przypisanie routera do stałej
const router = express.Router();
//konfiguracja ścieżki strony głównej
//po wejściu na str główną renderowany jest szablon 'home'

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

router.get('/', (req, res) => {
    res.redirect('/pokemon/list/1');
});

router.get('/pokemon/:nazwa', (req, res) => {
    P.getPokemonByName(`${req.params.nazwa}`) // with Promise
        .then(function (response) {
            let pok = {
                'name': response.name,
                'id': (response.id).toString(),
                'weight': parseFloat(response.weight)/10.0,
                'pic': response.sprites.front_default,
                'shiny': response.sprites.front_shiny,
                'base_exp': response.base_experience
            };
            let types = [], stats = [], abilities = [], moves = [];
            for (let i = 0; i < response.types.length; i++) {
                types.push(response.types[i].type.name);
            }

            for (let i = 0; i < response.stats.length; i++) {
                stats.push({ 'stat': response.stats[i].stat.name, 'base_stat': response.stats[i].base_stat, 'effort': response.stats[i].effort});
            }

            for (let i = 0; i < response.abilities.length; i++) {
                abilities.push(response.abilities[i].ability.name);
            }

            for (let i = 0; i < response.moves.length; i++) {
                moves.push(response.moves[i].move.name);
            }
            pok.types = types;
            pok.stats = stats;
            pok.abilities = abilities;
            pok.moves = moves;
            res.render('pokemon', { 'pokemon': pok, alphabeticalOrder });
        })
        .catch(function (error) {
            console.log('There was an ERROR: ', error);
        });
});

router.get('/pokemon/list/:page', (req, res) => {
    P.resource(`/api/v2/pokemon/?limit=10&offset=${(req.params.page - 1) * 10}`) // with Promise
        .then(function (response) {

            let pok = {}, pok1 = [], name = [], id =[];
            let idd, howManyPage, pokLastPage;
            howManyPage = response.count/10.0;
            howManyPage = Math.ceil(howManyPage);
            pokLastPage = response.count % 10;
            for (let i = 0; i < response.results.length; i++) {
                idd = response.results[i].url.slice(34,-1);
                pok1.push({ 'name': response.results[i].name,'id' : idd  });
            }
            pok = pok1;
                res.render('list', { 'list': pok, 'page' : req.params.page, 'howManyPage' : howManyPage, 'pokLastPage' : pokLastPage});
        })
        .catch(function (error) {
            console.log('There was an ERROR: ', error);
        });

});

router.get('/type/:type/:page',(req,res) =>{
    P.resource(`/api/v2/type/${req.params.type}`) // with Promise
        .then(function (response) {
            let pok = {}, pok1 = [], name = [], id =[];
            let idd, howManyPage, pokLastPage;
            howManyPage = response.pokemon.length/10.0;
            howManyPage = Math.ceil(howManyPage);
            pokLastPage = response.pokemon.length % 10;

            if(req.params.page != howManyPage){
                for (let i = (req.params.page-1)*10; i < req.params.page*10; i++) {
                idd = response.pokemon[i].pokemon.url.slice(34,-1);
                pok1.push({ 'name': response.pokemon[i].pokemon.name,'id' : idd  });
                }
            }else{
                for(let i = (req.params.page-1)*10; i<response.pokemon.length; i++){
                idd = response.pokemon[i].pokemon.url.slice(34,-1);
                pok1.push({ 'name': response.pokemon[i].pokemon.name,'id' : idd  });
                }
            }
            pok = pok1;
            res.render('type', { 'list': pok, 'page' : req.params.page, 'poktype': req.params.type, 'howManyPage' : howManyPage, 'pokLastPage' : pokLastPage});

        })
        .catch(function (error) {
            console.log('There was an ERROR: ', error);
        });
});


function alphabeticalOrder(moves){
    const sortmoves = moves.sort();
    return sortmoves;
}


//przypisanie routera do stałej
module.exports = router;