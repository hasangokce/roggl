const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId
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
  console.log('a')
  try {
    const boardId = new ObjectId(req.params.id)
  } catch (error) {
    console.log(error.message)
    return res.send(404)
  }

  // if(typeof board_id === "undefined") {
  //   return res.send(404)
  // }

  req.app.db.collection('my_posts').findOne({ _id: board_id }, function (err, result) {
    // req.app.db.collection("my_posts").findOne({"_id":{$in: [board_id]} }, function(err, result) {
    if (err) throw err
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(204).send({ message: 'Not found' })
    }
  })
})

// Create single board
router.post('/', (req, res, next) => {
  console.log(typeof req.body.name)
  console.log(typeof req.body.time)
  const { name, time } = req.body
  console.log('name: ' + name)
  console.log(time)
  if (typeof req.body.name !== 'string' || typeof req.body.time !== 'string') {
    res.status(404).send()
  } else {
    console.log(req.body)
    req.app.db.collection('my_boards').insertOne({ name, time }, function (err, res) {
      if (err) throw err
      console.log(req.body)
      console.log('1 document inserted')
    })
    res.status(201).send({ message: 'success', _id: req.body._id })
  }
})

router.put('/', function (req, res) {
  res.send('Got a PUT request at /user')
})

router.delete('/:id', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki')
})

module.exports = router
