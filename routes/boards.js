var express = require('express');
var router = express.Router();

/**
 * /boards
 */

// Home page route.
router.get('/', function (req, res) {
  res.send('Boards route module home page');
})

// Single board route
router.get('/:id', (req, res) => {
  req.app.db.collection('my_posts').find().toArray(function (err, result) {
      if (err) throw err
      res.send(result)
  })
})


// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;