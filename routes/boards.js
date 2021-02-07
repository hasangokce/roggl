var express = require('express');
var router = express.Router();
const { check, oneOf, validationResult } = require('express-validator');

// MongoDB ObjecId()
const ObjectId = require('mongodb').ObjectId;

// DAO
const BoardsDAO = require('../dao/boardsDAO.js')
console.log("a")
// Home page route.
router.get('/', function (req, res) {
  req.app.db.collection('my_boards').find().toArray(function (err, result) {
    if (err) throw err
    res.send(result)
  })
})
console.log("a")
// Home page route.
router.get('/test', async function (req, res) {

  let userInfo = {
    name: "Hasan",
    surname: "Gökçe"
  }
  const fetchResult = await BoardsDAO.getOneBoard(userInfo)
  if (!fetchResult) {
    console.log("fetchResult.error")
    res.send({ "message": "not found" })
  } else {
    console.log(fetchResult)
    res.send(fetchResult)
  }

})
console.log("c")
// Update one
router.post('/', async function (req, res) {
  const updateResult = await BoardsDAO.changeSingle()
  console.log(updateResult)
  res.send()
})


// Single board route
/**
 * GET http://localhost:4001/boards/6006f7a257638c51a36a59c0
 */
console.log("c")
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  try {
    var board_id = new ObjectId(req.params.id)
  } catch (error) {
    console.log(error.message)
    return res.send(404)
  }

  // if(typeof board_id === "undefined") {
  //   return res.send(404)
  // }
  req.app.db.collection("my_boards").findOne({ "_id": board_id }, function (err, result) {
    // req.app.db.collection("my_posts").findOne({"_id":{$in: [board_id]} }, function(err, result) {
    if (err) throw err;
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(204).send({ 'message': "Not found" })
    }
  });
})
console.log("e")
// Create single board
router.post('/', [check('content').escape()], (req, res, next) => {
  const { name, content } = req.body
  console.log("name: " + name) 
  console.log(content)
  if (typeof req.body.name !== "string" || typeof req.body.content !== "string") {
    res.status(404).send()
  } else {
    console.log(req.body)
    req.app.db.collection("my_boards").insertOne({ name, time }, function (err, res) {
      if (err) throw err;
      console.log(req.body)
      console.log("1 document inserted");

    });
    res.status(201).send({ 'message': 'success', '_id': req.body._id })
  }
});
console.log("f")
// Update a board
router.put('/', function (req, res) {
  res.send('Got a PUT request at /user')
})

// Delete single board
router.delete('/:id', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// Test route
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;