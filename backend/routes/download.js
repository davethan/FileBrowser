const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");
const http = require('http');
//this file downloads the files in the server!
module.exports = function download(req, res) {
  var form = new IncomingForm()
  .parse(req, (err, fields, files)=>{
    if (err){
      console.log(err);
      throw err;
    }

    // send the file via download()
    let path = fields.path+"/"+fields.name;
    res.download(path);

    // generate the server path
    // let path = fields.path;
    // let stringToRecognise = "../public";
    // path = path.substring(path.indexOf(stringToRecognise)+stringToRecognise.length);
    // path = "http://localhost:3001"+path+"/"+fields.name;

    // save file to server
    // const file = fs.createWriteStream(fields.name);
    // const request = http.get(path, function(response) {
    //   response.pipe(file);
    // });

    //code to send the path of the file back to client
    // res.json(path);
  })
};
