const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

http.createServer(function (req, res) {
  if(req.url == '/fileupload'){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Cameron/' + files.filetoupload.name;

      console.log(oldpath);
      console.log(newpath);

      fs.rename(oldpath, newpath, function () {
        if(err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
  }

}).listen(8080);
