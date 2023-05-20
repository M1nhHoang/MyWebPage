const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const fs = require('fs');

const app = express();

// create http server using express
const server = http.createServer(app);

// create soket.io using server
const io = require('socket.io')(server)

// Register middleware
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true)

// listen soket.io
_chatSocket = require('./sockets/chat');
_chatSocket(io.of('/chat'));

// API Endpoint
_pageRouter = require('./routes/page');
_pageRouter(app)

_imagesRouter = require('./routes/images')
_imagesRouter(app)

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});