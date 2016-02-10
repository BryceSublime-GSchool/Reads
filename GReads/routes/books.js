var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Authors(){
return knex('authors');
};
function Books(){
return knex('books');
};

router.get('/', function(req, res, next) {
  Books().select().then(function(results){
    res.render('books/index', {books: results});
  })
});

router.get('/new', function(req, res, next) {
  Books().select().first().then(function(books){
    Authors().select().then(function(results){
      res.render('books/new', {books: books, authors: results});
    })
  })
});

router.post('/', function(req, res, next) {
  Books().insert(req.body).then(function(results){
    res.redirect('/books');
  })
});



module.exports = router;
