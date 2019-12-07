const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");

module.exports = function download(req, res) {
  var form = new IncomingForm()
  .parse(req, (err, fields, files)=>{
    if (err){
      console.log(err);
      throw err;
    }
    let path = fields.path;
    let stringToRecognise = "../public";
    path = path.substring(path.indexOf(stringToRecognise)+stringToRecognise.length);
    path = "http://localhost:3001"+path+"/"+fields.name;
    res.json(path);
  })
};
