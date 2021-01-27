var express = require('express');
var router = express.Router();
/**
 * /pages
 */

// GET http://localhost:4001/posts 
router.get('/', (req, res) => {
    posts = [
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
    ]
    res.json(posts)
})

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