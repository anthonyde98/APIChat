const express = require("express");
require("dotenv").config();
require("./connection/connection");
const path = require('path');
const cors = require('cors');
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());

app.use(express.static(__dirname + '/static'));

const welcome = express.Router().get("" || "/", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.use('/APIChat', [userRoutes, chatRoutes, messageRoutes, welcome])

app.get("", (req, res) => {
    res.redirect("/APIChat")
})

app.listen(port, () => console.log("server listening on port", port))