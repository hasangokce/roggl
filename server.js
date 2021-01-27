//    setup
const express = require('express')
const app = express()
const port = process.env.PORT || 4001;

const home = require('./routes/home.js');
const boards = require('./routes/boards.js');
const posts = require('./routes/posts.js');

//    database
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://new_user_736:p5xh6YCpx6vwLmCX@cluster0.wa4pi.mongodb.net/roggl?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err
    const db = client.db('roggl')
    app.db = db
})

//    use
app.use(express.static('public'));
app.use('/', home);
app.use('/boards', boards);
app.use('/posts', posts);

app.listen(port, () => {
    console.log(`This app listening at http://localhost:${port}`)
})