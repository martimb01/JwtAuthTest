const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

dotenv.config()
app.use(express.json())
const posts = [
    {
        username: "Martim",
        title: "Post1"
    },
    {
        username: "Rui",
        title: "Post2"
    }
]

app.get('/posts', (req,res) => {
    res.json(posts)
})

app.post('/login', (req,res) => {
    //Authenticate user
    const username = req.body.username
    const user = {name: username}

    const acessToken = jwt.sign(user, process.env.SECRET_TOKEN)
    res.json({acessToken : acessToken})
})

function authenticateToken()

app.listen(3000, () => {
    console.log("Server listening on PORT 3000")
})