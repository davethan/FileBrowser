const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");

module.exports = function upload(req, res) {
  var form = new IncomingForm()
  .parse(req, (err, fields, files)=>{
    if (err){
      console.log(err);
      throw err;
    }
    // path = fields.path;
    // files.file.path = path +"/"+ files.file.name;
    // files.file.path = __dirname + "/../public/" + files.file.name;
    // console.log(path);
    // console.log(files.file.path);
  })
  .on("fileBegin", function(name, file) {
      type = file.type.substring(file.type.indexOf("/") + 1);
      file.name = Date.now() +"."+ type;
      file.path = __dirname + "/../public/" + file.name;
  });

  // let path;
  //
  // form.parse(req, (err, fields, file) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   path = fields.path;
  //   console.log(path);
  // });
  //
  // form.on("fileBegin", function(name, file) {
  //     console.log(file);
  //     type = file.type.substring(file.type.indexOf("/") + 1);
  //     file.name = Date.now() +"."+ type;
  //     file.path = __dirname + "/../public/" + file.name;
  //     console.log(file.path);
  // });
  //
  // form.on("end", () => {
  //   res.json();
  // });

};
