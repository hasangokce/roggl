const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const BoardsDAO = require('../dao/boards.dao.js') // DAO
const BoardsController = require('../controller/boards.controller.js') // controller
const boardsController = new BoardsController()

/** m
 * Test
 * @param {number} id
 * @returns {Array}
 */
// router.get('/about', boards_controller.board_read_test)
// router.route("/about").get(() => "Hello")
// router.route("/about").get(boards_controller.foo)
router.get('/about', boardsController.foo)
// router.route("/about").get(boardsController.foo)

/**
 * Given an article returns only targets
 * @returns {Array}
 */
router.get('/', async function (req, res) {
  const result = await BoardsDAO.index()
  res.send(result)
})

/**
 * Test
 * @param {number} id
 * @returns {Array}
 */
router.get('/test', async function (req, res) {
  const userInfo = {
    name: 'Hasan',
    surname: 'Gökçe'
  }
  const fetchResult = await BoardsDAO.getOneBoard(userInfo)
  if (!fetchResult) {
    console.log('fetchResult.error')
    res.send({ message: 'not found' })
  } else {
    console.log(fetchResult)
    res.send(fetchResult)
  }
})

/**
 * Update one
 * @param {number} id
 * @returns {Array}
 */
router.post('/', boardsController.boardCreatePost)
router.put('/', boardsController.boardUpdatePut)

// router.post('/', async function (req, res) {
//   const updateResult = await BoardsDAO.changeSingle()
//   console.log(updateResult)
//   res.send()
// })

/**
 * Single board route
 * @param {number} id
 * @returns {Array}
 */
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  try {
    const boardId = new ObjectId(req.params.id)
  } catch (error) {
    console.log(error.message)
    return res.send(404)
  }

  // req.app.db.collection("my_posts").findOne({"_id":{$in: [boardId]} }, function(err, result) {
  req.app.db.collection('my_boards').findOne({ _id: boardId }, function (err, result) {
    if (err) throw err
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(204).send({ message: 'Not found' })
    }
  })
})

/**
 * Create the board
 * @param {number} id
 * @returns {Array}
 */
router.post('/', [check('content').escape()], (req, res, next) => {
  const { name, content } = req.body
  console.log('name: ' + name)
  console.log(content)
  if (typeof req.body.name !== 'string' || typeof req.body.content !== 'string') {
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

/**
 * Update a board
 * @param {number} id
 * @returns {Object}
 */
router.put('/', function (req, res) {
  res.send('Got a PUT request at /user')
})

/**
 * Delete
 * @param {number} id
 * @returns {Object}
 */
router.delete('/:id', function (req, res) {
  res.send('Got a DELETE request at /user')
})

module.exports = router
