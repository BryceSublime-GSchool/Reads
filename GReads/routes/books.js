var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Authors(){
return knex('authors');
};

router.get('/', function(req, res, next) {
  Authors().select().then(function(results){
    res.render('authors/index');
  })
});
router.get('/new', function(req, res, next) {
  Authors().select().then(function(results){
    res.render('authors/new');
  })
});
router.post('/', function(req, res, next) {
  Authors().insert(req.body).then(function(results){
    res.redirect('/authors', {authors: results});
  })
});


module.exports = router;
