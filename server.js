const express = require('express')
const app = express()
const port = 4001
let db = null

app.get('/', async (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send('<html><body><h1>Welcome to the server</h1><body></html>')
})

// GET http://localhost:4001/posts 

app.get('/posts', (req, res) => {
    posts = [
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
        {'title': 'Hello World','content': 'Lorem ipsum dolor sit amet.'},
    ]
    res.json(posts)
})

app.get('/boards/:id', (req, res) => {
    db.collection('my_posts').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.get('/posts/:id', (req, res) => {
    db.collection('my_posts').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Database
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://new_user_736:p5xh6YCpx6vwLmCX@cluster0.wa4pi.mongodb.net/roggl?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err
    db = client.db('roggl')
    // db.collection('my_posts').find().toArray(function (err, result) {
    //     if (err) throw err
    //     console.log(result)
    // })
})

