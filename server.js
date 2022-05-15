const express = require("express")
const app = express()
const server = require('http').server(app)
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getResultHandle()
require('dotenv').config({ path: "./config.env" })
const connectDB = require('./utilsServer/connectDB')
const PORT = process.env.PORT || 3000
connectDB();
app.use(express.json())

app.preare().then(() => {
    app.use("/api/signup", require("./api/signup"))
    app.use("/api/auth", require("./auth"))
    app.use("/api/search", require("./api/search"))
    app.use("/api/profile", require("./api/profile"))
    app.use("")
    app.all('*', (req, res) => handle(req, res));
    server.listen(PORT, err => {
        if (err) throw err;
        console.log('Express server running on ${PORT}');
    });
});