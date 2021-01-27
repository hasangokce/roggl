var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;
/**
 * /posts
 */

// Home page route.
router.get('/', function (req, res) {
    req.app.db.collection('my_posts').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

// Single board route
/**
 * GET http://localhost:4001/boards/6006f7a257638c51a36a59c0
 */

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    console.log("a")
    try {
        var board_id = new ObjectId(req.params.id)
    } catch (error) {
        console.log(error.message)
        return res.send(404)
    }

    // if(typeof board_id === "undefined") {
    //   return res.send(404)
    // }


    req.app.db.collection("my_posts").findOne({ "_id": board_id }, function (err, result) {
        // req.app.db.collection("my_posts").findOne({"_id":{$in: [board_id]} }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(204).send({ 'message': "Not found" })
        }
    });
})

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.put('/', function (req, res) {
    res.send('Got a PUT request at /user')
})

app.delete('/:id', function (req, res) {
    res.send('Got a DELETE request at /user')
})

// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
})

module.exports = router;