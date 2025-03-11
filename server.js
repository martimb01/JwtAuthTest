const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

dotenv.config();
app.use(express.json());

const posts = [
    {
        username: "Martim",
        title: "Post1"
    },
    {
        username: "Rui",
        title: "Post2"
    }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name)); //Get the posts of the username in the req.user set in the autenticateToken middleware
});

app.post('/login', (req, res) => {
    // Authenticate user
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
    res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Split by space to get the token
    if (token == null) return res.status(401).send();

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).send(); // Token is no longer valid (403)
        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log("Server listening on PORT 3000");
});