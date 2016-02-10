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
  Authors().select().first().then(function(results){
    Books().select().then(function(books){
      res.render('books/index', {authors: results, books:books})
    })
  })
})

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

router.get('/:id', function(req, res, next){
  Books().where('id', req.params.id).first().then(function(books){
    res.render('books/show', {books: books})
 })
})

router.get('/:id/edit', function(req, res, next){
  Books().where('id', req.params.id).first().then(function(result){
    Authors().select().then(function(authors){
      res.render('books/edit', {books: result, authors: authors})
    })
 })
})

router.post('/:id', function(req, res, next){
  Books().where('id', req.params.id).update(req.body).then(function(result){
      res.redirect('/books/' + req.params.id)
 })
})


router.post('/:id/delete', function(req, res, next){
  Books().where('id', req.params.id).del().then(function(results){
    res.redirect('/books')
  })
})



module.exports = router;
