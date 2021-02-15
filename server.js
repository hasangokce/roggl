const express = require('express')
const app = express()
const port = process.env.PORT || 4001

// Require for Routing
const home = require('./routes/home.js')
const boards = require('./routes/boards.route.js')
const users = require('./routes/users.route.js')
const posts = require('./routes/posts.js')

// Express Parser
app.use(express.json()) // Used to parse JSON bodies
app.use(function (error, req, res, next) {
  // sendError (res, myCustomErrorMessage);
  res.status(404).send({ message: error.message })
})

// DAOs
const BoardsDAO = require('./dao/boards.dao.js') 
const ColumnsDAO = require('./dao/columns.dao.js') 
const UsersDAO = require('./dao/users.dao.js') 

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", true );
  next()
})

// function setupCORS(req, res, next) {
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
//   res.header('Access-Control-Allow-Origin', '*');
//   if (req.method === 'OPTIONS') {
//       res.status(200).end();
//   } else {
//       next();
//   }
// }
// app.all('/*', setupCORS);

/**
 * Static
 */
app.use(express.static('public'))

/**
 * Connect database and keep the connection
 * @param {string} mongo_uri
 * @returns {Object} a connection object
 */
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
  'mongodb+srv://new_user_736:p5xh6YCpx6vwLmCX@cluster0.wa4pi.mongodb.net/roggl?retryWrites=true&w=majority',
  { poolSize: 50, wtimeout: 2500, connectTimeoutMS: 2500, useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) throw err
    // const db = client.db('roggl')
    // app.db = db

    // const boards = new boardsDAO(db)
    BoardsDAO.injectDB(client)
    ColumnsDAO.injectDB(client)
    UsersDAO.injectDB(client)
    // boards.test()
  })

/**
 * Use Routes
 */
app.use('/', home)
app.use('/boards', boards)
app.use('/posts', posts)
app.use('/users', users)

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`)
})
