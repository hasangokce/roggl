const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const BoardsDAO = require('../dao/boards.dao.js') // DAO
const BoardsController = require('../controller/boards.controller.js') // controller
const ColumnsController = require('../controller/columns.controller.js') // controller
const boardsController = new BoardsController()
const columnsController = new ColumnsController()

/**
 * Test
 * @param {number} id
 * @returns {Array}
 */
// router.get('/about', boards_controller.board_read_test)
// router.route("/about").get(() => "Hello")
// router.route("/about").get(boards_controller.foo)
router.get('/about', boardsController.foo)
// router.route("/about").get(boardsController.foo)


router.get('/:board_id', boardsController.boardAll)
router.post('/', boardsController.boardCreate)
router.put('/', boardsController.boardUpdate)
router.delete('/:id', boardsController.boardDelete)
// Columns
router.post('/columns', columnsController.createItem)
router.get('/columns/:board_id', columnsController.getItems)
router.put('/columns', columnsController.columnUpdate)
router.put('/columns/edit/title', columnsController.columnUpdateTitle)
router.delete('/columns/:id', columnsController.columnDelete)


/**
 * Single board route
 * @param {number} id
 * @throws Will throw an error if there is an error
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
 * @throws Will throw an error if there is an error
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

module.exports = router
