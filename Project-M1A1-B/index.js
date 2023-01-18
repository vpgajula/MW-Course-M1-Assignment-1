const httpServer = require('http');
/////////////////////////////
//create server
const server = httpServer.createServer(function(req, res) {
    res.end(req);
    console.log('Request from client: ${req}');
});

/////////////////////////////
//start listening to requests
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
});