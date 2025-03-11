const express = require('express');

const app = express();

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

app.get('/login', (req,res) => {
    
})


app.listen(3000, () => {
    console.log("Server listening on PORT 3000")
})