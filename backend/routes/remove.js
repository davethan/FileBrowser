const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");

module.exports = function delete1(req, res) {
  var form = new IncomingForm();

  form.on("fileBegin", function(name, file) {
  });

  form.on("end", () => {
    res.json();
  });

  form.parse(req, (err, fields, file) => {
    let path = fields.path + "/" +fields.name;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
  });
};
