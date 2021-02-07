// setup
const express = require('express')
const app = express()
const port = process.env.PORT || 4001;


// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// DAO
const BoardsDAO = require('./dao/boardsDAO.js')

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// static
app.use(express.static('public'));

// route modules
const home = require('./routes/home.js');
const boards = require('./routes/boards.js');
const posts = require('./routes/posts.js');

// database
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
    'mongodb+srv://new_user_736:p5xh6YCpx6vwLmCX@cluster0.wa4pi.mongodb.net/roggl?retryWrites=true&w=majority',
    function (err, client) {
    if (err) throw err
    const db = client.db('roggl')
    app.db = db
    
    // const boards = new boardsDAO(db)
    BoardsDAO.injectDB(db)
    // boards.test()
})

// use routes
app.use('/', home);
app.use('/boards', boards);
app.use('/posts', posts);

app.listen(port, () => {
    console.log(`This app listening at http://localhost:${port}`)
})



