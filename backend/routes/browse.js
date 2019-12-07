var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = __dirname + "/../public";

router.get("/", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  fs.readdir( path, function(err, items) {
      itemsAndPath = {
        items: items,
        path: path
      }
      res.json(itemsAndPath)
  });
});

module.exports = router;
