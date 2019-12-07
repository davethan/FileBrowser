const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");

module.exports = function delete1(req, res) {
  var form = new IncomingForm();

  form.parse(req, (err, fields, file) => {
    let path;
    if (fields.name==="undefined"){
      path = fields.path;
    }
    else {
      path = fields.path + "/" +fields.name;
    }
    fs.readdir( path, function(err, items) {
        itemsAndPath = {
          items: items,
          path: path
        }
        res.json(itemsAndPath);
    });
  });
};
