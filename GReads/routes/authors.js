var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Authors(){
return knex('authors');
};

router.get('/', function(req, res, next) {
  Authors().select().then(function(results){
    res.render('authors/index', {authors: results});
  })
});
router.get('/new', function(req, res, next) {
    res.render('authors/new');
});
router.post('/', function(req, res, next) {
  Authors().insert(req.body).then(function(results){
    res.redirect('/authors');
  })
});

router.get('/:id', function(req, res, next){
  Authors().where('id', req.params.id).first().then(function(author){
    res.render('authors/show', {author: author})
 })
})
router.get('/:id/edit', function(req, res, next){
  Authors().where('id', req.params.id).first().then(function(result){
    res.render('authors/edit', {authors: result})
 })
})

router.post('/:id', function(req, res, next){
  Authors().where('id', req.params.id).update(req.body).then(function(results){
    res.redirect('/authors/'+ req.params.id)
  })
})


router.post('/:id/delete', function(req, res, next){
  Authors().where('id', req.params.id).del().then(function(results){
    res.redirect('/authors')
  })
})




module.exports = router;
