const express = require('express')
const router = express.Router()

// Home page route.
router.get('/', function (req, res) {
  res.send('Boards route module home page')
})

module.exports = router
