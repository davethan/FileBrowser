const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");

module.exports = function upload(req, res) {
  var form = new IncomingForm()
  .parse(req, function (err, fields, files) {
    type = files.file.type.substring(files.file.type.indexOf("/") + 1);
    files.file.name = Date.now() +"."+ type;
    let newpath = fields.path + "/" + files.file.name;
    let oldpath = files.file.path;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
};
