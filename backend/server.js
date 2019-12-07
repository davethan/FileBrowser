// Create express app
var express = require("express");
var app = express();
var cors = require("cors");
const serve = require("express-static");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// Root endpoint
app.get("/", (req, res, next) => {
    res.json("Ok in server")
});

// Insert here other API endpoints
app.use('/browse', require('./routes/browse'));
app.post('/updateDirectory', require('./routes/updateDirectory'));
app.post('/upload', require('./routes/upload'));
app.post('/remove', require('./routes/remove'));
app.post('/download', require('./routes/download'));
app.use(serve(__dirname+'/public'));

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

// Server port
var HTTP_PORT = 3001
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
