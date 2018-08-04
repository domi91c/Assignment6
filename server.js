var express = require("express");
var app = express();

var path = require("path");

var HTTP_PORT = process.env.PORT || 8085;

app.use(express.static(path.resolve(__dirname + '/public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(HTTP_PORT, function(){
  console.log("Server listening on port: " + HTTP_PORT);
});
